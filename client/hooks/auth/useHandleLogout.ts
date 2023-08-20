import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@store/store";
import { deleteSession } from "@store/userInfoSlice";
import { Confirm, Toast } from "@util/handleAlert";
import { removeCookies } from "@util/handleRemoveCookie";


export const useHandleLogout = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const userInfo = useAppSelector((state) => state.userInfo.value);

    const handleLogout = async () => {
        Confirm("로그아웃")
          .then((result) => {
            if (result.isConfirmed) {
              removeCookies();
              localStorage.removeItem("username");
              if (userInfo.useremail !== "") {
                dispatch(deleteSession());
              }
                return true;
            }else{
                return false;
            }
          })
          .then((response)=>{
            if(response){
                router.push("/");
            }
          })
          .catch(() => {
            Toast.fire({
              icon: "error",
              title: `죄송합니다. 로그아웃을 다시 실행해주시거나 새로고침 후 이용해주세요. \n Sorry Log-out is failed! Please retry Log-out or redirection your page.`,
            });
          })
      };

      return handleLogout;
}
