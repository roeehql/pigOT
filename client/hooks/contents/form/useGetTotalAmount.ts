import contentsApi from "@api/contentsApi";
import { handleAmountComma } from "@util/handleAmountComma";
import { useQuery } from "@tanstack/react-query";
import { TOTAL_AMOUNT_QUERY } from "@constant/query.constant";

const useGetTotalAmount = (useremail:string) => {
    const getTotalAmount = async () => {
        const result = await contentsApi.getTotalAmount(useremail);
        return handleAmountComma(result);
    }
    const {
      data,
      isLoading,
      isError,
      refetch,
    } = useQuery([TOTAL_AMOUNT_QUERY], getTotalAmount);

    return  {
      data,
      isLoading,
      isError,
      refetch,
    };
}

export default useGetTotalAmount