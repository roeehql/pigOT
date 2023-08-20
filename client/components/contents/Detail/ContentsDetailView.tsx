import Button from "@atomic/Button";
import EditForm from "../edit/EditForm";
import { ContentsDetailViewState, ContentsState } from "@@types/contentsType";
import ContentsContainer from "./ContentsContainer";
import Link from "next/link";

const ContentsDetailView = ({
  data,
  isOpen,
  handleOpenForm,
  handleCloseForm,
  handleDelete,
}: ContentsDetailViewState) => {
  return (
    <>
      {data?.map((content) => (
        <ContentsContainer key={content.id}>
          {isOpen ? (
            <EditForm contents={content} close={handleCloseForm} />
          ) : (
            <>
              <Link href="/home">⬅️목록으로 돌아가기</Link>
              <small>{content.regdate}</small>
              <h4>🛫{content.country}</h4>
              {content.imageURL !== "" && (
                <div>
                  <img src={content?.imageURL} alt="food" width="300px" />
                </div>
              )}
              <p>
                {content.food} : {content.foodExpenses}
                {content.currencyCode} ➡️ {content.exchangedMoney}
                <br />
                {content.commentary}
              </p>
              <div>
                <Button
                  text="수정"
                  className="small-button"
                  type="button"
                  onClick={handleOpenForm}
                />
                <Button
                  text="삭제"
                  className="small-button"
                  type="button"
                  onClick={handleDelete}
                />
              </div>
            </>
          )}
        </ContentsContainer>
      ))}
    </>
  );
};

export default ContentsDetailView;
