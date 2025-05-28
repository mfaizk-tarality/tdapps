"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import PageTitle from "@/common_component/PageTitle";
import { createToken, verifyDeployedToken } from "@/modules/token-creator";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as yup from "yup";
import { useAccount, useConfig } from "wagmi";
import { toast } from "sonner";
import { deployContract, waitForTransactionReceipt } from "@wagmi/core";
import tSourceCode from "@/abi/tSourceCode.json";
import { useState } from "react";
import StandardReflectionTokenABI from "@/abi/StandardReflectionTokenABI.json";
import { standardReflectionTokenByteCode } from "@/abi/bytecode";

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
    text: "Standard Reflection Token",
    href: "/token-creator/standard-reflection",
  },
];
let StandardReflectionTokenSchema = yup.object({
  tokenName: yup.string().required("Token Name is required."),
  tokenSymbol: yup
    .string()
    .required("Token Symbol is required.")
    .matches(/^\S*$/, "Token Symbol cannot contain any spaces")
    .matches(/^[A-Z]*$/, "Token Symbol must contain only uppercase letters"),
  totalSupply: yup
    .string()
    .required("Total supply is required.")
    .matches(/^[0-9]*$/, "Total supply must contain only digits"),
  fees: yup
    .string()
    .required("Tax fees is required.")
    .matches(/^[0-9]*$/, "Tax fees must contain only digits"),
  termsCondition: yup
    .boolean()
    .oneOf([true], "Terms and conditions should be accepted"),
});

const StandardReflectionToken = () => {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const config = useConfig();

  const { mutateAsync: createTokenMutate, isPending: createTokenPending } =
    useMutation({
      mutationFn: async ({ tokenaddress }) => {
        return createToken(
          formik.values,
          "standardReflection",
          address,
          tokenaddress
        );
      },
      onSuccess: (data) => {
        if (data?.responseCode == 200) {
          toast.success(data?.responseMessage);
        } else {
          toast.error(data?.responseMessage);
        }
        setIsLoading(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.responseMessage);
        setIsLoading(false);
      },
    });
  const { mutateAsync: verifyDeployedContract } = useMutation({
    mutationFn: ({ tokenAddress, sourceCode }) => {
      return verifyDeployedToken(tokenAddress, sourceCode);
    },
    onSuccess: (data) => {
      if (data?.responseCode == 200) {
        toast.success(data?.responseMessage);
        formik.resetForm();
      } else {
        toast.error(data?.responseMessage);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.responseMessage);
      setIsLoading(false);
    },
  });

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await deployContract(config, {
        abi: StandardReflectionTokenABI,
        bytecode: standardReflectionTokenByteCode,
        args: [
          formik?.values?.tokenName,
          formik?.values?.tokenSymbol,
          Number(formik?.values?.totalSupply),
          formik?.values?.fees,
        ],
      });
      const reciept = await waitForTransactionReceipt(config, {
        hash: result,
      });

      await createTokenMutate({ tokenaddress: reciept?.contractAddress });
      await verifyDeployedContract({
        tokenAddress: reciept?.contractAddress,
        sourceCode: tSourceCode.StandardReflection,
      });
    } catch (error) {
      toast.error(error?.shortMessage || "");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      tokenName: "",
      tokenSymbol: "",
      totalSupply: "",
      fees: "",
      termsCondition: false,
    },
    validationSchema: StandardReflectionTokenSchema,
    validateOnChange: false,
    onSubmit: handleSubmit,
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
              title={"Standard Reflection Token"}
              subtitle={
                "Easily Deploy Your Own Standard Reflection Token on the Blockchain"
              }
            />
          </div>
          <form
            className="col-span-12 grid grid-cols-12 border border-stroke md:gap-6 xl:gap-12 p-10 rounded-md"
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
                    className="border border-stroke p-2 rounded-sm"
                    placeholder={item.placeholder}
                    onChange={formik.handleChange}
                    value={formik.values?.[item.field]}
                  />
                  <p className="text-error">{formik.errors?.[item.field]}</p>
                </div>
              );
            })}
            <div className="col-span-12 flex flex-col mt-4 md:mt-0">
              <div className="flex gap-4 items-center">
                <input
                  type="checkbox"
                  className="checkbox border text-tanborder"
                  checked={formik.values.termsCondition}
                  onChange={(e) => {
                    formik.setFieldValue("termsCondition", e.target.checked);
                  }}
                />
                <p className="text-description">
                  By checking this I agree with{" "}
                  <span className="text-white">Terms & Conditions</span>
                </p>
              </div>
              <p className="text-error mt-2">{formik.errors?.termsCondition}</p>
            </div>
            <div className="col-span-12 flex items-center justify-center">
              <CustomButton
                className={"min-w-44 rounded-sm"}
                isLoading={createTokenPending || isLoading}
                isConnected={isConnected}
                type="submit"
              >
                Create Token
              </CustomButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StandardReflectionToken;

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
    field: "fees",
    label: "Tax Fee %",
    placeholder: "e.g. 18",
  },
];
