import { Button, Grid } from "@mui/material";
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
import { saveAs } from "file-saver";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BASE_URL } from "../common/const";
import { muiLink } from "../components";
import FormPage from "../components/FormPage";
import { useApi } from "../hook/ApiProvider";
// import registerLoan from "../form/registerLoan.json";

const componentsMetadata = rSuiteComponents.map((definer) => definer.build());
const builderView = new BuilderView([...componentsMetadata, muiLink.build()])
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates([])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader);

// const formDefault = JSON.stringify(registerLoan);
const FormBuilder = () => {
  const { id } = useParams();
  const { fetchData, postData } = useApi();
  const navigate = useNavigate();

  const { refetch, data = "" } = useQuery({
    queryKey: ["getFormEngineById"],
    queryFn: async () => {
      const data: any = await fetchData(
        `${BASE_URL}/feg-svc/api/v1/FormEngine/${id}`
      );
      if (data.isSuccess) {
        console.log("data.steps:", data.steps);
        return data.data;
      } else {
        toast.error(data.message);
      }
    },
  });

  const { mutate } = useMutation({
    mutationFn: (payload: any) => {
      return postData(`${BASE_URL}/feg-svc/api/v1/FormEngine/submit`, payload)
        .then((data: any) => {
          if (data.isSuccess) {
            // refetch();
          }
        })
        .catch((error) => {});
    },
  });

  const exportToJson = (objectData: any) => {
    const blob = new Blob([objectData], {
      type: "application/json",
    });
    saveAs(blob, data.name);
  };

  return (
    <>
      <Grid container mt={4} justifyContent="center">
        <Grid item xs={6} container justifyContent="flex-end" columnGap={2}>
          <Grid item>
            <Button
              onClick={() => {
                navigate(`/formBuilder/create?formId=${id}`);
              }}
              variant="contained"
            >
              Edit Form
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={() => {
                exportToJson(data.steps || []);
              }}
              variant="contained"
            >
              Export form
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <FormPage
        children={
          <FormViewer
            view={builderView}
            getForm={(_) => data.steps || []}
            actions={{
              onSubmit: (e) => {
                const hasError = e.store.formData.hasErrors;
                if (!hasError) {
                  console.log("form data:", e.store.formData.data);
                }
              },
              onApprove: (e) => {
                console.log("form data:", e.store.formData.data);
                const hasError = e.store.formData.hasErrors;
                const formData = e.store.formData.data;
                const payload = {
                  name: "submit_form",
                  steps: JSON.stringify(formData),
                };
                if (!hasError) {
                  // handleButtonClick(payload);
                }
              },
              onReject: (e) => {
                console.log("form data:", e.store.formData.data);
                const hasError = e.store.formData.hasErrors;
                const formData = e.store.formData.data;
                const payload = {
                  name: "submit_form",
                  steps: JSON.stringify(formData),
                };
                if (!hasError) {
                  // handleButtonClick(payload);
                }
              },
            }}
          />
        }
      />
      <ToastContainer />
    </>
  );
};

export default FormBuilder;
