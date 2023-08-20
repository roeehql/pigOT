import authApi from "@api/authApi";
import { Toast } from "@util/handleAlert";
import useUseremail from "./useUseremail";

export const useEditUsername = () => {
    const useremail = useUseremail();
    const USERNAME = "username";

    const handleEditUserName = async (editName: string) => {
        const result = await authApi.modifyUsername(useremail, editName);
        if (result === "succ") {
          localStorage.setItem(USERNAME , editName);
          Toast.fire({
            icon: "success",
            title: "별명이 변경되었습니다. \n nickname change success!",
          });
          return true;
        }else{
            Toast.fire({
                icon: "error",
                title: "죄송합니다. 다시 시도해주세요. \n nickname change failed! Sorry. Please retry",
              });  
          return false;
        }
      };

    return handleEditUserName;
}