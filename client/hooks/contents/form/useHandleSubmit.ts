import contentsApi from "@api/contentsApi";
import { ContentsState } from "@@types/contentsType";
import { Toast } from "@util/handleAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONTENTS_LIST_QUERY, COUNTRY_LIST_BY_USER_QUERY, TOTAL_AMOUNT_QUERY } from "@constant/query.constant";

export const useHandleSubmit = () => {
    const queryClient = useQueryClient();
    const addContent = async (contents:ContentsState) => {
        return await contentsApi.inputContent({ contents });
    };
    const {mutate } = useMutation(addContent,{
        onSuccess:()=>{
            queryClient.invalidateQueries([CONTENTS_LIST_QUERY]);
            queryClient.invalidateQueries([TOTAL_AMOUNT_QUERY]);
            queryClient.invalidateQueries([COUNTRY_LIST_BY_USER_QUERY]);
            Toast.fire({
                icon: "success",
                title: "기록되었습니다. \n Success upload!",
            });
        },
        onError:()=>{
            Toast.fire({
                icon: "error",
                title: "죄송합니다 다시 시도해주세요. \n Sorry! Please retry.",
            });
            return false;
        }
    })
   return {mutate };
}
