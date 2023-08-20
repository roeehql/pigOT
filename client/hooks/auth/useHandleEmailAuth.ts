import authApi from "@api/authApi";

export const useHandleEmailAuth = async (email : string) =>{
    const response = await authApi.emailAuth(email);
    return response.randomNum;
}