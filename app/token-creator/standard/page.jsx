"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import PageTitle from "@/common_component/PageTitle";
import { useFormik } from "formik";
import { LoaderCircle } from "lucide-react";
import * as yup from "yup";

const breadCrumb = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Token Creator",
    href: "/token-creator",
  },
  {
    text: "Standard Token",
    href: "/token-creator/standard",
  },
];
let StandardTokenSchema = yup.object({
  tokenName: yup.string().required("Token Name is required."),
  tokenSymbol: yup.number().required("Token Symbol is required."),
  totalSupply: yup.string().required("Total supply is required."),
  decimal: yup.string().required("Decimal is required."),
  termsCondition: yup
    .boolean()
    .oneOf([true], "Terms and conditions should be accepted"),
});

const StandardToken = () => {
  const formik = useFormik({
    initialValues: {
      tokenName: "",
      tokenSymbol: "",
      totalSupply: "",
      decimal: "",
      termsCondition: false,
    },
    validationSchema: StandardTokenSchema,
    validateOnChange: false,
    onSubmit: (values) => {
      console.log(values, "values");
    },
  });
  return (
    <div className="">
      <div className="w-full flex items-end justify-end">
        <BreadCrumb routes={breadCrumb} />
      </div>

      <div className="grid grid-cols-12">
        <div className="md:col-start-4 md:col-span-6 col-span-12 grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 mt-10">
            <PageTitle
              title={"Standard Token"}
              subtitle={
                "Easily Deploy Your Own Standard Token on the Blockchain"
              }
            />
          </div>
          <form
            className="col-span-12 grid grid-cols-12 border border-stroke md:gap-12 p-10 rounded-md"
            onSubmit={formik.handleSubmit}
          >
            {fields?.map((item, idx) => {
              return (
                <div
                  className="col-span-12 md:col-span-6 flex flex-col gap-2"
                  key={idx}
                >
                  <label htmlFor={item.field}>{item.label}</label>
                  <input
                    id={item.field}
                    name={item.field}
                    type="text"
                    className="border border-stroke w-full p-2 rounded-sm"
                    placeholder={item.placeholder}
                    onChange={formik.handleChange}
                    value={formik.values?.[item.field]}
                  />
                  <p className="text-error">{formik.errors?.[item.field]}</p>
                </div>
              );
            })}
            <div className="col-span-12 flex flex-col">
              <label className="label">
                <input
                  type="checkbox"
                  className="checkbox border text-tanborder"
                  checked={formik.values.termsCondition}
                  onChange={(e) => {
                    formik.setFieldValue("termsCondition", e.target.checked);
                  }}
                />
                By checking this I agree with{" "}
                <span className="text-white">Terms & Conditions</span>
              </label>
              <p className="text-error">{formik.errors?.termsCondition}</p>
            </div>
            <div className="col-span-12 flex items-center justify-center">
              <CustomButton className={"min-w-44 rounded-sm"}>
                Create Token
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StandardToken;

const fields = [
  {
    field: "tokenName",
    label: "Token Name*",
    placeholder: "e.g. Apha",
  },
  {
    field: "tokenSymbol",
    label: "Token Symbol*",
    placeholder: "e.g. APH",
  },
  {
    field: "totalSupply",
    label: "Token Supply*",
    placeholder: "e.g. 1000000",
  },
  {
    field: "decimal",
    label: "Decimal*",
    placeholder: "e.g. 18",
  },
];
