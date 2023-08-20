import contentsApi from "@api/contentsApi";
import { useQuery } from "@tanstack/react-query";
import { CONTENT_DETAIL_QUERY } from "@constant/query.constant";

export const useGetContentDetail = (useremail : string) => {
    const getContent = async () => {
      let url = window.location.pathname;  
      const response = await contentsApi.getContentDetail(url.slice(10), useremail);
      return response;
    };
    const {data , isLoading, isError, refetch} = useQuery([CONTENT_DETAIL_QUERY],getContent);
    return {data , isLoading, isError, refetch};
}