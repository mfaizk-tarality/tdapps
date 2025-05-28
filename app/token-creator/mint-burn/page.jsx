"use client";
import { BurnOwnableByteCode, BurnRoleBaseByteCode } from "@/abi/bytecode";
import ownableAbi from "@/abi/BurnOwnable.json";
import roleBaseAbi from "@/abi/BurnRoleBase.json";

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
    text: "Minting & Burning Token",
    href: "/token-creator/mint-burn",
  },
];
let MintBurnScehem = yup.object({
  tokenName: yup.string().required("Token Name is required."),
  tokenSymbol: yup.string().required("Token Symbol is required."),
  totalSupply: yup.string().required("Total supply is required."),
  decimals: yup.string().required("Decimals is required."),
  supplyType: yup.string().required("SupplyType is required."),
  accessType: yup.string().required("AccessType is required."),
  mintable: yup.boolean(),
  burnable: yup.boolean(),
  termsCondition: yup
    .boolean()
    .oneOf([true], "Terms and conditions should be accepted"),
});

const MintBurn = () => {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const config = useConfig();

  const { mutateAsync: createTokenMutate, isPending: createTokenPending } =
    useMutation({
      mutationFn: async ({ tokenaddress }) => {
        return createToken(formik.values, "mintBurn", address, tokenaddress);
      },
      onSuccess: (data) => {
        if (data?.responseCode == 200) {
          toast.success(data?.responseMessage);
        } else {
          toast.error(data?.responseMessage);
        }
      },
      onError: (error) => {
        toast.error(error?.response?.data?.responseMessage);
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
    },
    onError: (error) => {
      toast.error(error?.response?.data?.responseMessage);
    },
  });
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const abiToPass =
        formik?.values?.accessType == "Ownable" ? ownableAbi : roleBaseAbi;
      const byteCodeToPass =
        formik?.values?.accessType == "Ownable"
          ? BurnOwnableByteCode
          : BurnRoleBaseByteCode;

      const result = await deployContract(config, {
        abi: abiToPass,
        bytecode: byteCodeToPass,
        args: [
          formik?.values?.tokenName,
          formik?.values?.tokenSymbol,
          formik?.values?.decimals,
          Number(formik?.values?.totalSupply),
          formik?.values?.mintable,
          formik?.values?.burnable,
          formik?.values?.accessType == "Ownable" ? 0 : 1,
        ],
      });
      const reciept = await waitForTransactionReceipt(config, {
        hash: result,
      });

      await createTokenMutate({ tokenaddress: reciept?.contractAddress });
      await verifyDeployedContract({
        tokenAddress: reciept?.contractAddress,
        sourceCode:
          formik.values?.accessType == "Ownable"
            ? tSourceCode.Ownable
            : tSourceCode.RoleBased,
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
      decimals: "",
      supplyType: "Fixed",
      accessType: "Ownable",
      mintable: false,
      burnable: false,
      termsCondition: false,
    },
    validationSchema: MintBurnScehem,
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
              title={"Minting & Burning Token"}
              subtitle={
                "Control Circulating Supply by Minting Additional Tokens or Burning Unused Ones"
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
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label htmlFor={"supplyType"}>Supply Type</label>
              <select
                name="supplyType"
                className="outline-0 border border-stroke p-2 rounded-sm w-full bg-background"
                value={formik.values?.supplyType}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (e?.target?.value == "Fixed") {
                    formik.setFieldValue("mintable", false);
                  }
                }}
              >
                <option value="Fixed">Fixed</option>
                <option value="Unlimited">Unlimited</option>
              </select>
              <p className="text-error">{formik.errors.supplyType}</p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-2">
              <label htmlFor={"accessType"}>Access Type</label>
              <select
                name="accessType"
                className="outline-0 border border-stroke p-2 rounded-sm w-full bg-background"
                value={formik.values?.accessType}
                onChange={formik.handleChange}
              >
                <option value="Ownable">Ownable</option>
                <option value="Rolebased">Role based</option>
              </select>
              <p className="text-error">{formik.errors.accessType}</p>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-row gap-2 mt-4 md:mt-0">
              <input
                type="checkbox"
                checked={formik.values?.mintable}
                name="mintable"
                className="toggle  bg-background checked:border-tanborder checked:bg-tancolor checked:text-title h-6 w-10 rounded-2xl border"
                onChange={formik.handleChange}
                disabled={formik.values.supplyType == "Fixed"}
              />
              <label htmlFor={"mintable"} className="text-description">
                Minting
              </label>
            </div>
            <div className="col-span-12 md:col-span-6 flex flex-row gap-2 mt-4 md:mt-0">
              <input
                type="checkbox"
                checked={formik.values?.burnable}
                name="burnable"
                className="toggle  bg-background checked:border-tanborder checked:bg-tancolor checked:text-title h-6 w-10 rounded-2xl border"
                onChange={formik.handleChange}
              />
              <label htmlFor={"burnable"} className="text-description">
                Burnable
              </label>
            </div>

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
            <div className="col-span-12 flex items-center justify-center mt-8 md:mt-0">
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

export default MintBurn;

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
    field: "decimals",
    label: "Decimals*",
    placeholder: "e.g. 18",
  },
];
