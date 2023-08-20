import contentsApi from "@api/contentsApi";
import { Toast } from "@util/handleAlert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CONTENTS_LIST_QUERY, COUNTRY_LIST_BY_USER_QUERY, TOTAL_AMOUNT_QUERY } from "@constant/query.constant";

export const useHandleDelete = () => {
  const queryClient = useQueryClient();

    const handleItemDelete = async (id:string) => {
      const result = await contentsApi.deleteContent({id});
      return result;
    }
    const { mutate, isSuccess } = useMutation(handleItemDelete, {
      onSuccess: () => {
      queryClient.invalidateQueries([CONTENTS_LIST_QUERY]);
      queryClient.invalidateQueries([TOTAL_AMOUNT_QUERY]);
      queryClient.invalidateQueries([COUNTRY_LIST_BY_USER_QUERY]);
      Toast.fire({
        icon: "success",
        title: "삭제되었습니다. \n Success delete!",
      });
      },
      onError: () =>{
        Toast.fire({
          icon: "error",
          title: "죄송합니다. 다시 시도해주세요. \n Sorry. It's failed. Please retry.",
        });
      }
    });

    return { mutate, isSuccess};
}