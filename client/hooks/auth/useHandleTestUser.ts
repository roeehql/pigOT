import { UserInfoState } from "@@types/authType";
import authApi from "@api/authApi";
import { Toast } from "@util/handleAlert";

export const useHandleTestUser = async () => {
  try{
  const response : UserInfoState = await authApi.testUser("test@test", "testuser22");
  const sessionResponse = await authApi.sessionState({
        is_Useremail: response.useremail,
        is_Username: response.username,
        is_Userflag: response.userflag,
      });
    if(sessionResponse === 200){
      return true;
     }else{
      return false;
     }
  }catch(error){
    Toast.fire({
      icon: "error",
      title: `죄송합니다. 로그인을 다시 실행해주시거나 새로고침 후 이용해주세요. \n Sorry Log-in is failed! Please retry Log-in or redirection your page.`,
    })
    return false;
  }
};
