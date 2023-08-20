import axiosApi from "@api/axiosApi";

import { AuthApiState, AuthState } from "@@types/authType";
import { getCookie, setCookie } from "@util/cookie";
import { USER_EMAIL, USER_FLAG, USER_NAME } from "@constant/cookie.constant";

const authApi:AuthApiState = {
    duplicationCheck : async ({is_Useremail}:AuthState) => {
        const { data : {json} }= await axiosApi.post("/api/register?type=duplicationCheck", {
            is_Useremail,
        }); 
        return json[0].num;
    },
    signup : async ({is_Username, is_Useremail, is_Password}:AuthState) => {
        const { statusText } = await axiosApi.post("/api/register?type=signup", {
            is_Username,
            is_Useremail,
            is_Password,
          });
  
        return statusText;
    },
    signin : async ({is_Useremail , is_Password}: AuthState) => {
        const { data: {json} } = await axiosApi.post("/api/LoginForm?type=signin", {
            is_Useremail,
            is_Password,
          });
        return json[0];
    },
    testUser : async (email :string , password : string) => {
      const { data : {json} } = await axiosApi.post("/api/LoginForm?type=testSignIn", {
        is_Userpassword: password,
        is_Useremail: email,
      });
      return json[0];
    },
    sessionState : async ({is_Useremail , is_Username, is_Userflag}: AuthState)=>{
        const { data , status } = await axiosApi.post(
            "api/LoginForm?type=SessionState",
            {
                is_Useremail,
                is_Username,
                is_Userflag,
            }
          );

          const expires = new Date();
          expires.setHours(expires.getHours() + 12);

          setCookie(USER_EMAIL, data.token1, {
            path: "/",
            expires,
          });
          setCookie(USER_NAME, data.token2, {
            path: "/",
            expires,
          });
          setCookie(USER_FLAG, data.token3, {
            path: "/",
            expires,
          });

        return status;
    },
    sessionConfirm : async () => {
        const { data } = await axiosApi.post("/api/LoginForm?type=SessionConfirm", {
            token1 : getCookie(USER_EMAIL),
            token2: getCookie(USER_NAME),
            token3: getCookie(USER_FLAG),
          });
        return {useremail : data.token1 , username : data.token2 , userflag : data.token3};
    },
    deleteUser : async (is_Useremail: string) => {
        const { data }  = await axiosApi.post("/api/LoginForm?type=deleteUser", {
          is_Useremail,
        });

        return data; //succ
    },
    emailAuth : async (email : string) => {
        const { data } = await axiosApi.post("/api/mail", {
          is_Email: email,
        });
        return data;
    },
    modifyPassword : async ( email: string , password : string) => {
        const { data } = await axiosApi.post("/api/LoginForm?type=pwdmodify", {
        is_Password: password,
        is_Useremail: email,
      });
      return data;
    },
    authUser : async (email : string) => {
      const { data }= await axiosApi.post("/api/register?type=authuser", {
        is_Useremail: email,
      });
      return data;
    },
    modifyUsername : async (useremail :string , username: string) =>{
      const { data } = await axiosApi.post("/api/LoginForm?type=userNameModify",{
        is_Username: username,
        is_Useremail : useremail,
      });      
      return data;
    },
}

export default authApi;