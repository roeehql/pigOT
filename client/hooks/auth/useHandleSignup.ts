import { AuthState } from "@@types/authType"
import { Toast } from "@util/handleAlert";
import authApi from "@api/authApi"

export const useHandleSignup = () => {
  const handleSignUp = async ({is_Username, is_Useremail, is_Password}:AuthState) => {
        const response = await authApi.signup({is_Username, is_Useremail, is_Password})
        if(response === "OK"){
        Toast.fire({
            icon: "success",
            title: "가입되었습니다. \n Success sign-up!",
        });
        return true;
    }else{
        Toast.fire({
            icon: "error",
            title: "죄송합니다. 다시 시도해주세요. \n Sorry Please retry.",
        });
        return false;
    }
}

return handleSignUp;
}