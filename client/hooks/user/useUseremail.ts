import { useEffect, useState } from "react";
import { useAppSelector } from "@store/store";

const useUseremail = () => {
    const [useremail , setUserEmail] =useState("");
    const userInfo = useAppSelector((state) =>{return state.userInfo.value});

    useEffect(() => {
      if(userInfo.useremail === "") {
        setUserEmail("");
      }else{
        setUserEmail(userInfo.useremail);
      }
    }, [])
    
    return useremail;
}

export default useUseremail