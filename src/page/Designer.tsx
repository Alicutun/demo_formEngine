import {
  ltrCssLoader,
  rsErrorMessage,
  RsLocalizationWrapper,
  rsTooltip,
  rSuiteComponents,
  rtlCssLoader,
} from "@react-form-builder/components-rsuite";
import { BiDi, IFormViewer, Validators } from "@react-form-builder/core";
import {
  BuilderView,
  FormBuilder,
  IFormStorage,
} from "@react-form-builder/designer";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "react-toastify";
import { BASE_URL, DEFAULT_INIT_FORM } from "../common/const";
import { muiLink } from "../components";
import { Navbar } from "../components/Navbar";
import { useApi } from "../hook/ApiProvider";
import { useGetValuesParam } from "../hook/useGetValuesParam";

const componentsMetadata = rSuiteComponents.map((definer) => definer.build());

const builderView = new BuilderView([...componentsMetadata, muiLink.build()])
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  .withTemplates([])
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader);

const formStorage: IFormStorage | undefined = undefined;

// You can define custom validators for form fields
const customValidators: Validators = {
  string: {
    isHex: {
      validate: (value) => /^[0-9A-F]*$/i.test(value),
    },
    isHappy: {
      params: [],
      validate: (value) => value === "Happy",
    },
    equals: {
      params: [
        { key: "value", type: "string", required: false, default: "Ring" },
        {
          key: "message",
          type: "string",
          required: false,
          default: "Value must be equals to ",
        },
      ],
      validate: (value, _, args) => {
        const errorMessage = args?.["message"] as string;
        const checkedValue = args?.["value"] as string;
        const errorResult = errorMessage ? errorMessage + checkedValue : false;
        return value !== args?.["value"] ? errorResult : true;
      },
    },
  },
  number: {},
  boolean: {
    onlyTrue: {
      validate: (value) => value === true,
    },
  },
};

// Example form, in JSON format
// const emptyForm = JSON.stringify(registerLoan);
const formName = "Example";

export const Designer = () => {
  const ref = useRef<IFormViewer>(null);
  const { formId } = useGetValuesParam();
  const { fetchData } = useApi();
  const handleButtonClick = (formData: any) => {};

  const { data = "" } = useQuery({
    queryKey: ["getFormEngineById", formId],
    queryFn: async () => {
      if (!formId) return;
      const data: any = await fetchData(
        `${BASE_URL}/feg-svc/api/v1/FormEngine/${formId}`
      );
      if (data.isSuccess) {
        console.log("data.steps:", data.steps);
        return data.data;
      } else {
        toast.error(data.message);
      }
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Navbar />
      <FormBuilder
        view={builderView}
        getForm={() => data?.steps || ""}
        formName={formName}
        initialData={DEFAULT_INIT_FORM}
        formStorage={formStorage}
        viewerRef={ref}
        validators={customValidators}
        actions={{
          onSubmit: (e) => {
            console.log("form data:", e.store.formData.data);
            const hasError = e.store.formData.hasErrors;
            const formData = e.store.formData.data;
            const payload = {
              name: "submit_form",
              steps: JSON.stringify(formData),
            };
            if (!hasError) {
              handleButtonClick(payload);
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
              handleButtonClick(payload);
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
              handleButtonClick(payload);
            }
          },
        }}
      />
    </>
  );
};
