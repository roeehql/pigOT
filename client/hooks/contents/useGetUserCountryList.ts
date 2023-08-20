import contentsApi from "@api/contentsApi";
import { useQuery } from "@tanstack/react-query";
import { COUNTRY_LIST_BY_USER_QUERY } from "@constant/query.constant";

const useGetUserCountryList = (useremail:string) => {
  const getUserCountryList = async () => {        
     return await contentsApi.getUserCountryList(useremail);       
  }
  const {data,isLoading,isError,refetch} = useQuery([COUNTRY_LIST_BY_USER_QUERY], getUserCountryList);
  
  return {data,isLoading,isError,refetch};
}

export default useGetUserCountryList