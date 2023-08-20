import authApi from "@api/authApi";
import { Toast } from "@util/handleAlert";

export const useEditPassword = async (password:string , checkPassword:string , email:string) => {
    if (password === checkPassword) {
      const response = await authApi.modifyPassword(email, password);
      if (response === "succ") {
        Toast.fire({
          icon: "success",
          title:
            "비밀번호가 변경되었습니다. \n your password was changed successly!",
        });
      }else{
        Toast.fire({
            icon: "error",
            title:
              "죄송합니다. 비밀번호 변경이 실패했습니다. 다시 시도해주세요. \n Sorry. changing password is failed. please retry.",
          });
      }
      return response;
    } else {
      Toast.fire({
        icon: "error",
        title:
          "입력하신 비밀번호가 일치하지 않습니다. \n Each password that you entered not same",
      });
    }
  };