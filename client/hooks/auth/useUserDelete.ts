import authApi from "@api/authApi";
import contentsApi from "@api/contentsApi";
import useUseremail from "@hooks/user/useUseremail";
import { Confirm, Toast } from "@util/handleAlert";
import { removeCookies } from "@util/handleRemoveCookie";
import { useRouter } from "next/router";

export const useUserDelete = () => {
    const useremail = useUseremail();
    const router = useRouter();

    const handleUserDelete = async () => {
      Confirm("탈퇴")
        .then((result) => {
          if (result.isConfirmed) {
            authApi.deleteUser(useremail)
            .then((result)=>{
              if(result === "succ"){
                contentsApi.deleteAll(useremail);
                removeCookies();
                Toast.fire({
                  icon: "success",
                  title: "계정이 삭제되었습니다. 감사합니다",
                });
                router.push("/");
              }else{
                Toast.fire({
                  icon: "error",
                  title: "죄송합니다. 다시 시도해주세요.",
                });
                return false;
              }
            });
          }else{
            return false;
          }
        })
        .catch(() => {
          Toast.fire({
            icon: "error",
            title: "죄송합니다. 다시 시도해주세요.",
          });
          return false;
        });
    };

  return handleUserDelete;
}