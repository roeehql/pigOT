import contentsApi from "@api/contentsApi";
import { EditContentState } from "@@types/contentsType";
import { Toast } from "@util/handleAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONTENTS_LIST_QUERY, CONTENT_DETAIL_QUERY, COUNTRY_LIST_BY_USER_QUERY, TOTAL_AMOUNT_QUERY } from "@constant/query.constant";

export const useHandleEdit = () => {
    const queryClient = useQueryClient();
    const editContent = async ( editContent:EditContentState ) => {
        return await contentsApi.modifyContent({ editContent });
    };
    const {mutate , data} = useMutation(editContent, {
        onSuccess : ()=>{
            queryClient.invalidateQueries([CONTENTS_LIST_QUERY]);
            queryClient.invalidateQueries([CONTENT_DETAIL_QUERY]);
            queryClient.invalidateQueries([TOTAL_AMOUNT_QUERY]);
            queryClient.invalidateQueries([COUNTRY_LIST_BY_USER_QUERY]);
            Toast.fire({
                icon: "success",
                title: "수정되었습니다. \n Success!",
            });
        },
        onError:()=>{
            Toast.fire({
                icon: "error",
                title: "죄송합니다 다시 시도해주세요. \n Sorry! Please retry.",
            });
            return false;
        }
    });   
    return {mutate , data};
}