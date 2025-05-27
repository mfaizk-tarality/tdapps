"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import { OWNER_ACCOUNT_ADDRESS } from "@/modules/faucet/config";
import { IconCopy, IconWorld } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useBalance } from "wagmi";
const breadCrumb = [
  {
    text: "Home",
    href: "/home",
  },
  {
    text: "Faucet",
    href: "/faucet",
  },
];

const Faucet = () => {
  const { data: ownerBalance } = useBalance({
    address: OWNER_ACCOUNT_ADDRESS,
  });

  const { mutateAsync: claimFaucetMutate } = useMutation({
    mutationFn: async () => {
      return claimFaucet(formValue.toAddress);
    },
    onSuccess: (data) => {
      console.log(data, "success");
      setIsLoading(true);
      if (data?.responseCode == 200) {
        sendFunds();
      } else {
        toast.error(data?.response?.data?.responseMessage);
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.log(error, "errorinClaiming");
      setIsLoading(false);
    },
  });

  return (
    <div>
      <div className="w-full flex items-end justify-end">
        <BreadCrumb routes={breadCrumb} />
      </div>
      <div className="grid grid-cols-12">
        <div className="col-span-12 sm:col-span-12 lg:col-span-5 lg:col-start-4">
          <h2 className="text-2xl font-semibold">Faucet</h2>
          <p className="text-description">
            Easily Request Free Testnet Tokens Using the Faucet—Jumpstart Your
            Development and Testing with Instant Token Access in Just a Few
            Clicks.
          </p>
          <div className="w-full border-2 border-stroke grid grid-cols-12 mt-4 rounded-2xl">
            <div className="col-span-12 md:col-start-2 md:col-span-10 p-4 flex flex-col gap-6 py-12">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 border border-stroke w-52 justify-start px-4 py-2 rounded-xl">
                  <img src="/assets/brand/onlyLogo.svg" alt="" />
                  <p>TAN Testnet</p>
                </div>
                <div className="text-end">
                  <p className="text-sm text-description">Balance:</p>
                  <p className="text-sm text-description">
                    {Number(ownerBalance?.formatted ?? 0).toFixed(2)} TAN
                  </p>
                </div>
              </div>
              <input
                type="text"
                className="border border-stroke w-full px-4 py-3 rounded-xl outline-0 text-center"
                defaultValue={"0x9217a95aE45D9b8b51d0743D7CdcB953e3745Ab4"}
              />
              <CustomButton>Claim 10 TAN</CustomButton>
              <p className="text-sm text-description">
                Once you are done with the testing, feel free to send the
                remaining coins to the following Faucet address.
              </p>
              <label className="relative">
                <input
                  type="text"
                  className="border border-stroke w-full px-4 py-3 rounded-xl outline-0 "
                  defaultValue={"0x9217a95aE45D9b8b51d0743D7CdcB953e3745Ab4"}
                />
                <div className="absolute top-3 right-3 bg-background">
                  <IconCopy className="" />
                </div>
              </label>
            </div>
          </div>
          <div className="mt-10 w-full flex justify-evenly items-center flex-col lg:flex-row gap-4 lg:gap-0">
            <CustomButton className="rounded-md w-52">
              <img src="/assets/misc/metamask.svg" alt="" />
              <p>Add TAN Network</p>
            </CustomButton>
            <CustomButton className="rounded-md w-52">
              <IconWorld />
              <p>View Explorer</p>
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faucet;
