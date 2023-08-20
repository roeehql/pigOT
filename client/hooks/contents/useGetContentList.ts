import contentsApi from "@api/contentsApi";
import { useQuery } from "@tanstack/react-query";
import { CONTENTS_LIST_QUERY } from "@constant/query.constant";

export const useGetContentsList = (useremail:string) => { 
  const getContentsList = async() => {
    const response = await contentsApi.getContents(useremail);
    return response;
  };

  const {data,isLoading,isError,refetch} = useQuery([CONTENTS_LIST_QUERY], getContentsList);

  return  {
    data,
    isLoading,
    isError,
    refetch
  };
}