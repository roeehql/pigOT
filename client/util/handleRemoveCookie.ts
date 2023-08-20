import { USER_EMAIL, USER_FLAG, USER_NAME } from "@constant/cookie.constant";
import { removeCookie } from "./cookie";


export const removeCookies = () => {
  removeCookie(USER_EMAIL, { path: "/" });
  removeCookie(USER_NAME,{ path: "/" });
  removeCookie(USER_FLAG, { path: "/" });
  return true;
};