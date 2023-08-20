import { useHandleDelete } from "@hooks/contents/useHandleDelete";
import useHandleModal from "@hooks/useHandleModal";
import { useAppSelector } from "@store/store";
import { useGetContentDetail } from "@hooks/contents/useGetContentDetail";
import { Confirm } from "@util/handleAlert";
import Button from "@atomic/Button";
import Loading from "@atomic/Loading";

import { useRouter } from "next/router";
import ContentsDetailView from "./ContentsDetailView";
import ContentsContainer from "./ContentsContainer";

const ContentsDetail = () => {
  const { mutate: deleteContent } = useHandleDelete();
  const router = useRouter();
  const { isOpen, open, close } = useHandleModal();
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const { data, isLoading, isError, refetch } = useGetContentDetail(
    userInfo.useremail
  );

  const handleDelete = async (id: string) => {
    await Confirm("삭제").then((result) => {
      if (result.isConfirmed) {
        deleteContent(id);
      }
    });
    router.push("/home");
  };

  if (isLoading) {
    return (
      <ContentsContainer>
        <Loading />
      </ContentsContainer>
    );
  }

  if (isError) {
    return (
      <ContentsContainer>
        <>
          <p>죄송합니다. 다시 시도해주세요.</p>
          <Button
            text="재시도"
            className="small-button"
            type="button"
            onClick={refetch}
          />
        </>
      </ContentsContainer>
    );
  }

  return (
    <ContentsDetailView
      data={data}
      isOpen={isOpen}
      handleOpenForm={() => open()}
      handleCloseForm={() => close()}
      handleDelete={handleDelete}
    />
  );
};

export default ContentsDetail;
