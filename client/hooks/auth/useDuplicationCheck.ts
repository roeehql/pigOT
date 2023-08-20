import authApi from "@api/authApi";

export const useDuplicationCheck = async (email : string) =>{
    const response = await authApi.duplicationCheck({
    is_Useremail: email,
  });
  return response;
};