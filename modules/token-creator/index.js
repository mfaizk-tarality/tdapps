import { api, tokenCreator } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";

export const createToken = async (
  formData,
  tokenType,
  address,
  tokenAddress
) => {
  try {
    const response = await api({
      url: `${tokenCreator}/tokenCreator/createToken`,
      method: "POST",
      data: {
        token_type: tokenType ? tokenType : undefined,
        user_add: address ? address : undefined,
        user_token_add: tokenAddress ? tokenAddress : undefined,
        token_name: formData?.tokenName ? formData?.tokenName : undefined,
        token_symbol: formData?.tokenSymbol ? formData?.tokenSymbol : undefined,
        total_supply: formData?.totalSupply
          ? String(formData?.totalSupply)
          : undefined,
        decimals: formData?.decimals ? formData?.decimals : undefined,
        can_mint: tokenType == "mintBurn" ? !!formData?.mintable : undefined,
        can_burn: tokenType == "mintBurn" ? !!formData?.burnable : undefined,
        supply_type: formData?.supplyType ? formData?.supplyType : undefined,
        access_type: formData?.accessType ? formData?.accessType : undefined,
        fees_amt: formData?.fees ? formData?.fees : undefined,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error, "Error in claim faucets");
    return error;
  }
};

export const useCreatedToken = (address) => {
  return useQuery({
    queryKey: ["deployedToken", address],
    queryFn: async () => {
      return getTokens(address);
    },
  });
};

const getTokens = async (address) => {
  try {
    const response = await api({
      url: `${tokenCreator}/tokenCreator/createdTokenDetails`,
      method: "POST",
      data: { user_add: address },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const verifyDeployedToken = async (address, sourceCode) => {
  try {
    const response = await api({
      url: `${tokenCreator}/tokenCreator/verify-smart-contract`,
      method: "POST",
      data: {
        address: address,
        sourceCode: sourceCode,
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
