import { UserInfoState } from "@@types/authType";
import authApi from "@api/authApi";
import { Toast } from "@util/handleAlert";

export const useHandleLogin = async (email: string, password: string) => {
  try{
  const duplicationResult = await authApi.duplicationCheck({
    is_Useremail: email,
    });
    if(duplicationResult === 1){
      try{
    const response : UserInfoState = await authApi.signin({
      is_Useremail: email,
      is_Password: password,
    });
    const sessionResponse = await authApi.sessionState({
        is_Useremail: response.useremail,
        is_Username: response.username,
        is_Userflag: response.userflag,
      });
    if(sessionResponse === 200){
      return true;
    }else{
      return false;
    }}catch{
      Toast.fire({
        icon: "error",
        title:
          "계정 또는 비밀번호를 확인하세요. \n Please Check your account or password.",
      });
      return false;
    }
    }else{
    Toast.fire({
      icon: "error",
      title:
        "없는 계정입니다. 회원가입을 먼저 진행해주세요. \n your email account doesn't exist. Please register first.",
    });
    return false;
  };
}catch(error){
  Toast.fire({
    icon: "error",
    title:
      "죄송합니다 다시 시도해주세요. \n Sorry. Please retry.",
  });
  return false;
}
};
