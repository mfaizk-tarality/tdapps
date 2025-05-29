"use client";
import BreadCrumb from "@/common_component/BreadCrumb";
import CustomButton from "@/common_component/CustomButton";
import PageTitle from "@/common_component/PageTitle";
import { useCreatedToken } from "@/modules/token-creator";
import { maskValue, sortAddress, useAddToken } from "@/utils";
import { formatNice } from "coin-format";
import { useAccount, useConfig } from "wagmi";
import moment from "moment";
import { IconCheck, IconSearch, IconX } from "@tabler/icons-react";
import LoadingScreen from "@/common_component/LoadingScreen";
import { useState } from "react";
import NoDataFound from "@/common_component/NoDataFound";
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
  const [search, setSearch] = useState("");
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

  const filterToken = (item) => {
    if (search) {
      if (String(item?.user_token_Address).includes(search)) {
        return true;
      }
      if (
        String(item?.token_name)
          .toLowerCase()
          .includes(String(search).toLowerCase())
      ) {
        return true;
      }
      if (
        String(item?.token_symbol)
          .toLowerCase()
          .includes(String(search).toLowerCase())
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  return (
    <div className="">
      <div className="w-full flex items-end justify-end">
        <BreadCrumb routes={breadCrumb} />
      </div>

      <div className="grid grid-cols-12">
        <div className="md:col-start-2 md:col-span-10 col-span-12 ">
          <div className="col-span-12 grid-cols-12 grid  my-10">
            <div className="col-span-12 md:col-span-6">
              <PageTitle
                title={"My Tokens"}
                subtitle={
                  "Easily Deploy Your Own Standard Token on the Blockchain"
                }
              />
            </div>
            <div className="col-span-12 md:col-span-6 flex justify-end items-center">
              <label className="input bg-background border rounded-4xl ">
                <IconSearch />
                <input
                  type="search"
                  className="grow outline-0 border-0"
                  placeholder="Search Tokens"
                  onChange={(e) => setSearch(e?.target?.value)}
                />
              </label>
            </div>
          </div>

          <div className="max-h-[700px] overflow-auto w-full">
            {tokenDataLoading && (
              <LoadingScreen
                className={"min-h-[400px]"}
                text={"Getting Token Data..."}
              />
            )}
            {!tokenDataLoading &&
              tokenData?.filter(filterToken)?.length == 0 && (
                <div className="min-h-56">
                  <NoDataFound text={"No Token Found."} />
                </div>
              )}
            {!tokenDataLoading &&
              tokenData?.filter(filterToken)?.length != 0 && (
                <table className="table table-md table-pin-rows table-pin-cols flex-1 min-w-[1200px]">
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
                    {tokenData?.filter(filterToken)?.map((item, idx) => {
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
