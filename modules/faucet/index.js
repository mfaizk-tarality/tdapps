import { tokenCreator } from "@/services/apiServices";

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
