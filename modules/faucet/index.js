import { api, tokenCreator } from "@/services/apiServices";
import { ethers, parseEther } from "ethers";
import { amountToSend, OWNER_PRIVATE_KEY } from "./config";
import { toast } from "sonner";
import axios from "axios";

export const getUserIP = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://checkip.amazonaws.com/",
    });
    if (response?.data) {
      return String(response?.data)?.trim();
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const claimFaucet = async (walletAddress) => {
  try {
    const currentIpAddress = await getUserIP();
    const response = await api({
      url: `${tokenCreator}/tokenCreator/claimFaucet`,
      method: "POST",
      data: { walletAddress: walletAddress, userIp: currentIpAddress },
    });
    return response.data;
  } catch (error) {
    console.log(error, "Error in claim faucets");
    return error;
  }
};

export const sendFunds = async ({ provider, address }) => {
  try {
    const wallet = new ethers.Wallet(OWNER_PRIVATE_KEY, provider);
    const amountInWei = parseEther(amountToSend);
    const tx = {
      to: address,
      value: amountInWei,
      gasLimit: 21000,
    };
    const transactionResponse = await wallet.sendTransaction(tx);

    toast.promise(transactionResponse.wait(), {
      loading: "Sending transaction...",
      success: "Transaction confirmed!",
      error: (error) => `Error: ${error.message || "Transaction failed"}`,
    });
  } catch (error) {
    console.error("Error during transfer:", error);
    toast.error(`Error: ${error.message || "Transaction failed"}`);
  }
};
