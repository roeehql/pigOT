import { EditFormViewState } from "@@types/contentsType";
import Button from "@atomic/Button";
import Input from "@atomic/Input";
import styles from "@styles/EditForm.module.scss";
import Select from "./Select";

const EditFormView = ({
  handleClose,
  editTripDate,
  selectTripDate,
  today,
  handleSelectCountry,
  selectlabel,
  fileInput,
  onFileChange,
  editImageURL,
  handleResetEditImageURL,
  editFood,
  onFoodChange,
  editCommentary,
  onCommentaryChange,
  editFoodExpenses,
  onFoodExpensesChange,
  editExchangedMoney,
  existExchangedMoney,
  onSubmit,
}: EditFormViewState) => {
  return (
    <div className={styles.editForm_box}>
      <Button
        text="닫기"
        className="big-button"
        type="button"
        onClick={handleClose}
      />
      <form method="post" className={styles.editForm_form}>
        <div className={styles.editForm_div}>
          <div>
            <small>*날짜와 국가는 미 선택시 기존 정보가 유지됩니다.</small>
            <Input
              type="date"
              name="tripDate"
              value={editTripDate}
              onChange={selectTripDate}
              labelText="여행날짜를 선택하세요!"
              max={today}
              required
            />

            <Select onChange={handleSelectCountry} labelText={selectlabel} />

            <Input
              type="file"
              name="foodImage"
              value={fileInput}
              onChange={onFileChange}
              labelText="사진을 등록해주세요!"
              required={false}
            />
            {editImageURL !== "" ? (
              <div className={styles.preview}>
                <img src={editImageURL} alt="preview" height="100px" />
                <button onClick={handleResetEditImageURL}>X</button>
              </div>
            ) : null}
          </div>
          <div>
            <Input
              type="text"
              value={editFood}
              onChange={onFoodChange}
              required={true}
              labelText="음식 이름을 기록해주세요!"
              name="food"
            />
            <Input
              type="text"
              value={editCommentary}
              onChange={onCommentaryChange}
              required={false}
              labelText="음식에 대해 기록해주세요!"
              name="commentary"
            />
            <Input
              type="number"
              value={editFoodExpenses}
              onChange={onFoodExpensesChange}
              required={true}
              labelText="금액을 숫자로 입력해주세요!"
              name="foodExpense"
            />
            <Input
              type="number"
              value={
                editExchangedMoney.toString() === editFoodExpenses
                  ? existExchangedMoney
                  : editExchangedMoney
              }
              onChange={onFoodExpensesChange}
              required={true}
              labelText="한국 금액입니다."
              name="exchangedMoney"
            />
          </div>
        </div>
        <Button
          text="입력 완료"
          className="big-button"
          type="submit"
          onClick={onSubmit}
        />
      </form>
    </div>
  );
};

export default EditFormView;
