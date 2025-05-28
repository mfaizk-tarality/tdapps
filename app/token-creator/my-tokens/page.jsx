"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import PageTitle from "@/common_component/PageTitle";
import { useCreatedToken } from "@/modules/token-creator";
import { maskValue, sortAddress, useAddToken } from "@/utils";
import { formatNice } from "coin-format";
import { useAccount, useConfig } from "wagmi";
import moment from "moment";
import { IconCheck, IconX } from "@tabler/icons-react";
import LoadingScreen from "@/common_component/LoadingScreen";
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
    text: "My Token",
    href: "/token-creator/my-tokens",
  },
];

const MyTokens = () => {
  const { address, isConnected } = useAccount();
  const { data: tokenData, isLoading: tokenDataLoading } =
    useCreatedToken(address);
  const { addToken } = useAddToken();
  const getTokenNametoShow = (name) => {
    switch (name) {
      case "standardReflection":
        return "Reflection";
      case "standard":
        return "Standard";

      case "mintBurn":
        return "Minting";
    }
  };
  console.log(tokenData, "asdasdasdasd");

  return (
    <div className="">
      <div className="w-full flex items-end justify-end">
        <BreadCrumb routes={breadCrumb} />
      </div>

      <div className="grid grid-cols-12">
        <div className="md:col-start-2 md:col-span-10 col-span-12 ">
          <div className="col-span-12 my-10">
            <PageTitle
              title={"My Tokens"}
              subtitle={
                "Easily Deploy Your Own Standard Token on the Blockchain"
              }
            />
          </div>
          <div className="max-h-[700px] overflow-auto w-full">
            {tokenDataLoading && (
              <LoadingScreen
                className={"min-h-[400px]"}
                text={"Getting Token Data..."}
              />
            )}
            {!tokenDataLoading && (
              <table className="table table-md table-pin-rows table-pin-cols flex-1 min-w-[1200px]  ">
                <thead>
                  <tr className="bg-stroke">
                    <td>Token Address</td>
                    <td>Name</td>
                    <td>Symbol</td>
                    <td>Supply</td>
                    <td>Created At</td>
                    <td>Mint</td>
                    <td>Burn</td>
                    <td>Type</td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {tokenData?.map((item, idx) => {
                    return (
                      <tr key={idx}>
                        <td>
                          {maskValue({
                            str: item?.user_token_Address,
                            enableCopyButton: true,
                          })}
                        </td>
                        <td>{item?.token_name || "--"}</td>
                        <td>{item?.token_symbol || "--"}</td>
                        <td>{formatNice(item?.total_supply ?? 0)}</td>
                        <td>
                          {item?.createdAt
                            ? moment(item?.createdAt)?.format("ll")
                            : "--"}
                        </td>
                        <td>
                          {item?.can_mint ? (
                            <IconCheck className="text-description" />
                          ) : (
                            <IconX className="text-description" />
                          )}
                        </td>
                        <td>
                          {item?.can_burn ? (
                            <IconCheck className="text-description" />
                          ) : (
                            <IconX className="text-description" />
                          )}
                        </td>
                        <td>{getTokenNametoShow(item?.token_type)}</td>
                        <td>
                          <CustomButton
                            clickHandler={() => {
                              addToken({
                                tokenAddress: item.user_token_Address,
                                tokenDecimals: item.decimals
                                  ? item.decimals
                                  : 18,
                                tokenImage: null,
                                tokenSymbol: item?.token_symbol,
                              });
                            }}
                          >
                            <img src="/assets/misc/metamask.svg" alt="" />
                            <p className="text-xs">Add to wallet</p>
                          </CustomButton>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTokens;

// IconX
// IconCheck
