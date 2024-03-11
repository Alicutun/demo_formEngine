import { Grid } from "@mui/material";
import {
  RsLocalizationWrapper,
  ltrCssLoader,
  rSuiteComponents,
  rsErrorMessage,
  rsTooltip,
  rtlCssLoader,
} from "@react-form-builder/components-rsuite";
import { BiDi, FormViewer } from "@react-form-builder/core";
import { BuilderView } from "@react-form-builder/designer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../../common/const";
import { muiLink } from "../../components";
import LeaveCheck from "../../form/LeaveCheck.json";
import LeaveChecked from "../../form/LeaveChecked.json";
import LeaveCreate from "../../form/LeaveCreate.json";
import { useGetValuesParam } from "../../hook";
import { useApi } from "../../hook/ApiProvider";

const leaveCheck = JSON.stringify(LeaveCheck);
const leaveChecked = JSON.stringify(LeaveChecked);
const leaveCreate = JSON.stringify(LeaveCreate);

const componentsMetadata = rSuiteComponents.map((definer) => definer.build());
const builderView = new BuilderView([...componentsMetadata, muiLink.build()])
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates([])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader);

export const FormBuilderLeave = (props: any) => {
  const { type = "" } = props;
  const { fetchData, postData } = useApi();
  const { transactionId = "" } = useGetValuesParam();
  const navigate = useNavigate();

  const { data = {} } = useQuery({
    queryKey: ["getDataForm"],
    queryFn: async (payload?: any) => {
      if (!transactionId) return;
      const data: any = await fetchData(
        `${BASE_URL}/LeaveRequest/${transactionId}`
      );
      if (data?.success) {
        return data.data;
      } else {
        toast.error(data?.errors[0]);
      }
    },
  });

  const { mutate: onSubmit } = useMutation({
    mutationFn: (payload: any) => {
      return postData(`${BASE_URL}/LeaveRequest/Submit`, payload)
        .then((data: any) => {
          if (data.success) {
            toast.success("Submit success!");
            navigate(-1);
          }
        })
        .catch((error) => {
          toast.error("Action failed!");
        });
    },
  });

  const { mutate: onApprove } = useMutation({
    mutationFn: (payload: any) => {
      const transFormPayload = {
        transactionId: transactionId,
        isApproved: true,
        comment: payload?.comment,
      };
      return postData(`${BASE_URL}/Tasks/approval`, transFormPayload)
        .then((data: any) => {
          if (data.success) {
            toast.success("Approve success!");
            navigate(-1);
          }
        })
        .catch((error) => {
          toast.error("Action failed!");
        });
    },
  });

  const { mutate: onReject } = useMutation({
    mutationFn: (payload: any) => {
      const transFormPayload = {
        transactionId: transactionId,
        isApproved: false,
        comment: payload?.comment,
      };
      return postData(`${BASE_URL}/Tasks/approval`, transFormPayload)
        .then((data: any) => {
          if (data.success) {
            toast.success("Reject success!");
            navigate(-1);
          }
        })
        .catch((error) => {
          toast.error("Action failed!");
        });
    },
  });

  return (
    <Grid container justifyContent="center">
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          borderRadius: "10px",
          border: "1px #3498ff solid",
        }}
      >
        <Grid m={2}>
          <FormViewer
            view={builderView}
            initialData={
              // { dateOff: new Date("2024-03-10T06:01:08.099Z") }
              type
                ? {
                    ...data,
                    dateOffFrom: data?.dateOffFrom
                      ? new Date(data?.dateOffFrom)
                      : undefined,
                    dateOffTo: data?.dateOffTo
                      ? new Date(data?.dateOffTo)
                      : undefined,
                    dateOff: data?.dateOff
                      ? new Date(data?.dateOff)
                      : undefined,
                  }
                : {}
            }
            getForm={(_) => {
              if (!type) return leaveCreate;
              return type === "check" ? leaveCheck : leaveChecked;
            }}
            actions={{
              onSubmit: (e) => {
                const hasError = e.store.formData.hasErrors;
                const dataForm = e.store.formData.data;
                console.log("dataForm:", dataForm);
                if (!hasError) {
                  onSubmit(dataForm);
                }
              },
              onApprove: (e) => {
                const hasError = e.store.formData.hasErrors;
                const dataForm = e.store.formData.data;
                if (!hasError) {
                  onApprove(dataForm);
                }
              },
              onReject: (e) => {
                const hasError = e.store.formData.hasErrors;
                const dataForm = e.store.formData.data;
                if (!hasError) {
                  onReject(dataForm);
                }
              },
            }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
