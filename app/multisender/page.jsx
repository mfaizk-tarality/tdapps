"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import React, { useMemo, useRef, useState } from "react";
import {
  useAccount,
  useConfig,
  useReadContract,
  useWriteContract,
} from "wagmi";
import Papa from "papaparse";
import { toast } from "sonner";
import multisenderAbi from "@/abi/Multisender.json";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { MULTI_SENDER_ADDRESS } from "@/modules/multisender/config";
import { IconPrism, IconUpload, IconX } from "@tabler/icons-react";
import CustomButton from "@/common_component/CustomButton";
import { isAddress, parseUnits } from "ethers";
import { erc20Abi } from "viem";
import PageTitle from "@/common_component/PageTitle";
const breadCrumb = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Multisender",
    href: "/multisender",
  },
];

const MultiSender = () => {
  const config = useConfig();
  const csvBtnRef = useRef();
  const [formValues, setFormValues] = useState({
    tokenAddress: "",
    addressList: "",
    tokenType: "native",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useAccount();
  const { data: feePerTransferData, isLoading: feeLoading } = useReadContract({
    abi: multisenderAbi,
    address: MULTI_SENDER_ADDRESS,
    functionName: "FEE_PER_TRANSFER",
  });
  const feePerTransfer = useMemo(() => {
    return feePerTransferData ? Number(feePerTransferData) / 1e18 : 0;
  });
  const {
    writeContractAsync,
    status,
    isPending: writeContractPending,
  } = useWriteContract({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (event) => {
    try {
      const file = event.target.files[0];
      if (!file) return;
      Papa.parse(file, {
        complete: (result) => {
          const parsedAddresses = result.data
            .map((row) => {
              const [address, amount] = row.map((item) => item.trim());

              if (!address || !amount) return null;

              const parsedAmount = parseFloat(amount);
              if (isNaN(parsedAmount) || parsedAmount <= 0) {
                return null;
              }

              return `${address}, ${parsedAmount}`;
            })
            .filter(Boolean);

          setFormValues((prev) => ({
            ...prev,
            addressList: parsedAddresses.join("\n"),
          }));
        },
        header: false,
        skipEmptyLines: true,
      });
      csvBtnRef.current.value = "";
    } catch (error) {
      console.log(error, "upload Error");
    }
  };

  const handleSubmitNative = async () => {
    try {
      if (!formValues.addressList || formValues.addressList.trim() === "") {
        toast.error("Address list is empty!");
        return;
      }

      const recipientArray = formValues.addressList
        .split("\n")
        .map((line) => {
          const [recipient, amount] = line
            .split(",")
            .map((item) => item.trim());
          return { recipient, amount: parseFloat(amount) };
        })
        .filter(({ recipient, amount }) => recipient && !isNaN(amount));
      if (recipientArray.length === 0) {
        toast.error("No valid address-amount pairs found!");
        return;
      }
      setIsLoading(true);
      const tokenAddress = formValues.tokenAddress;
      const recipientList = recipientArray.map(({ recipient }) => recipient);
      const amountList = recipientArray.map(({ amount }) => amount);
      const totalFee = recipientArray.length * feePerTransfer;
      const totalTransfer = Number(
        totalFee + amountList?.reduce((a, d) => a + d, 0)
      );
      const amountListToSend = amountList?.map((item) => Number(item) * 1e18);

      const result = await writeContractAsync({
        abi: multisenderAbi,
        functionName: "distributeTAN",
        address: MULTI_SENDER_ADDRESS,
        args: [recipientList, amountListToSend],
        value: parseUnits(String(totalTransfer)),
      });
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      setIsLoading(false);

      toast.success("Transaction sent successfully!");
      setFormValues({
        tokenAddress: "",
        addressList: "",
        tokenType: "native",
      });
    } catch (error) {
      setIsLoading(false);
      console.log("Error during transaction:", error);
      toast.error(
        "Error while sending tokens. Please check the provided details."
      );
    }
  };

  const handleSubmitToken = async () => {
    try {
      if (!formValues.addressList || formValues.addressList.trim() === "") {
        toast.error("Address list is empty!");
        return;
      }
      const tokenAddress = formValues.tokenAddress;
      if (!isAddress(tokenAddress)) {
        toast.error("Enter valid token address");
        return;
      }

      const recipientArray = formValues.addressList
        .split("\n")
        .map((line) => {
          const [recipient, amount] = line
            .split(",")
            .map((item) => item.trim());
          return { recipient, amount: parseFloat(amount) };
        })
        .filter(({ recipient, amount }) => recipient && !isNaN(amount));
      if (recipientArray.length === 0) {
        toast.error("No valid address-amount pairs found!");
        return;
      }
      setIsLoading(true);

      const recipientList = recipientArray.map(({ recipient }) => recipient);
      const amountList = recipientArray.map(({ amount }) => amount);
      const totalFee = recipientArray.length * feePerTransfer;
      const totalTransfer = Number(
        totalFee + amountList?.reduce((a, d) => a + d, 0)
      );
      const totalAmountInWei =
        Number(amountList?.reduce((a, d) => a + d, 0)) * 1e18;
      const amountListToSend = amountList?.map((item) => Number(item) * 1e18);

      const approveResult = await writeContract(config, {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: "approve",
        args: [MULTI_SENDER_ADDRESS, totalAmountInWei],
      });

      await waitForTransactionReceipt(config, {
        hash: approveResult,
      });

      const result = await writeContractAsync({
        abi: multisenderAbi,
        functionName: "distributeToken",
        address: MULTI_SENDER_ADDRESS,
        args: [formValues.tokenAddress, recipientList, amountListToSend],
        value: parseUnits(String(Number(totalFee).toFixed(5))),
      });
      const transactionReceipt = await waitForTransactionReceipt(config, {
        hash: result,
      });
      setIsLoading(false);

      toast.success("Transaction sent successfully!");
      setFormValues({
        tokenAddress: "",
        addressList: "",
        tokenType: "native",
      });
    } catch (error) {
      console.error("Error during transaction:", error);
      toast.error(
        "Error while sending tokens. Please check the console for details."
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="w-full flex items-end justify-end">
          <BreadCrumb routes={breadCrumb} />
        </div>
        <div className="grid grid-cols-12 my-10">
          <div className="col-span-12 sm:col-span-12 lg:col-span-6 lg:col-start-4 xl:col-span-6 xl:col-start-4">
            <div className="col-span-12 mt-10">
              <PageTitle
                title={"Multisender"}
                subtitle={
                  " Distribute Tokens Instantly to Dozens or Hundreds of Addresses—Save Time and Gas with the Multisender Tool."
                }
              />
            </div>

            <div className="w-full border-2 border-stroke grid grid-cols-12 mt-4 rounded-2xl">
              <div className="col-span-12 md:col-start-2 md:col-span-10 p-4 flex flex-col gap-6 py-12">
                <div>
                  <label htmlFor="tokenAddress">Token Address</label>
                  <div className="flex gap-6">
                    {formValues?.tokenType == "native" ? (
                      <>
                        <input
                          defaultValue={"Native Coin (TAN)"}
                          disabled
                          placeholder="Select your Token"
                          className="w-full p-2 focus:outline-none   rounded-sm border-stroke border"
                        />
                      </>
                    ) : (
                      <input
                        disabled={writeContractPending || isLoading}
                        value={formValues.tokenAddress}
                        placeholder="e.g. 0x5B8343A0AC135BBb2884d682D763fd948fc442f2"
                        className="w-full p-2 focus:outline-none   rounded-sm border-stroke border"
                        onChange={(e) => {
                          setFormValues({
                            ...formValues,
                            tokenAddress: e.target.value,
                          });
                        }}
                      />
                    )}
                    <div className="flex flex-row gap-2">
                      <div
                        className={`border ${
                          formValues?.tokenType == "token" ? "bg-[#d3177b]" : ""
                        }  rounded-md  border-[#d3177b] h-11 w-11 flex justify-center items-center`}
                        onClick={() => {
                          setFormValues({ ...formValues, tokenType: "token" });
                        }}
                      >
                        <IconPrism
                          className={`dark:text-[#fff] text-2xl cursor-pointer ${
                            formValues.tokenType == "token"
                              ? "text-white"
                              : "text-[#d3177b]"
                          }`}
                        />
                      </div>
                      <div
                        className={`border ${
                          formValues?.tokenType == "native"
                            ? "bg-[#d3177b] dark:bg-[#d3177b]"
                            : ""
                        }  rounded-md  border-[#d3177b] h-11 w-11 flex justify-center items-center cursor-pointer`}
                        onClick={() => {
                          setFormValues({ ...formValues, tokenType: "native" });
                        }}
                      >
                        {formValues?.tokenType == "native" ? (
                          <img src="/assets/brand/whiteLogo.svg" />
                        ) : (
                          <img src="/assets/brand/onlyLogo.svg" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" ">
                  <div className="flex justify-between flex-col sm:flex-row">
                    <label htmlFor="csv">List of Addresses in CSV</label>
                  </div>
                  <textarea
                    disabled={writeContractPending || isLoading}
                    id="csv"
                    name="addressList"
                    rows="6"
                    placeholder="Insert your CSV here or use the button below..."
                    className="block w-full mt-1 px-4 py-2 rounded-lg border outline-0 "
                    value={formValues.addressList}
                    onChange={handleChange}
                  />
                  <div className="flex justify-end ">
                    <div className="flex items-center gap-4 justify-center border-tanborder border mt-4 rounded-xl pl-4">
                      <p
                        className="text-[#d3177b] cursor-pointer font-semibold"
                        onClick={() => {
                          document.getElementById("my_modal_1").showModal();
                        }}
                      >
                        Show Sample CSV
                      </p>
                      <button
                        className="bg-[#d3177b] text-white px-4 py-2 rounded-lg cursor-pointer"
                        onClick={() => {
                          csvBtnRef?.current?.click();
                        }}
                      >
                        <IconUpload />
                        <input
                          ref={csvBtnRef}
                          hidden
                          accept=".csv"
                          type="file"
                          onChange={handleFileUpload}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <CustomButton
                    isConnected={isConnected}
                    className={"min-w-44 rounded-sm"}
                    isLoading={writeContractPending || isLoading}
                    clickHandler={() => {
                      if (formValues?.tokenType == "native") {
                        handleSubmitNative();
                      } else {
                        handleSubmitToken();
                      }
                    }}
                  >
                    Submit
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box relative bg-background  md:min-w-xl">
          <p className="font-semibold">Show Sample CSV</p>
          <div className="py-2 flex ">
            <div className="modal-action absolute -top-6 right-0 p-6">
              <button
                className="cursor-pointer"
                onClick={() => {
                  document.getElementById("my_modal_1").close();
                }}
              >
                <IconX />
              </button>
            </div>
          </div>
          <form method="dialog " className="overflow-x-auto">
            {csvData?.map((item, idx) => {
              return (
                <div
                  className={`grid grid-cols-8 w-full gap-2 items-center`}
                  key={idx}
                >
                  <div className="col-span-1 text-center p-2 bg-[#EFEFEF] dark:bg-[#424242] text-[#101112] dark:text-white">
                    {idx}
                  </div>
                  <div className="col-span-7 text-[#101112] dark:text-white">
                    {item}
                  </div>
                </div>
              );
            })}
          </form>
        </div>
      </dialog>
    </>
  );
};

export default MultiSender;

const csvData = [
  "0x48A61b597361B84F76D78f3aD60479162bfc808E,0.00056",
  "0x9217a95aE45D9b8b51d0743D7CdcB953e3745Ab4,13.45",
  "0x1b7fD977833E6e82CD844151a6703D52E6A4D728,1.049",
  "0x85BC8640f06CE97DF3bC63fc5FfF0a0dD7EeeDDD,1",
];
