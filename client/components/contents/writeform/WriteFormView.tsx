import Button from "@atomic/Button";
import Input from "@atomic/Input";
import SelectCountry from "./SelectCountry";
import styles from "@styles/WriteForm.module.scss";
import { WriteFormViewState } from "@@types/contentsType";

const WriteFormView = ({
  selectDate,
  handleTodayClick,
  handleYesterdayClick,
  handleDateReset,
  handleRadioClick,
  fileInput,
  onFileChange,
  imageURL,
  handleImageReset,
  food,
  onFoodChange,
  commentary,
  onCommentaryChange,
  foodExpenses,
  onFoodExpensesChange,
  exchangedMoney,
  onSubmit,
}: WriteFormViewState) => {
  return (
    <form method="post" className={styles.writeForm_form}>
      <div className={styles.writeForm_zone}>
        <div className={styles.writeForm_div}>
          {selectDate === "" ? (
            <div>
              <Button
                text="어제"
                className="small-button"
                type="button"
                onClick={handleTodayClick}
              />
              <Button
                text="오늘"
                className="small-button"
                type="button"
                onClick={handleYesterdayClick}
              />
            </div>
          ) : (
            <p>
              {selectDate}
              <Button
                text="다시선택"
                className="small-button"
                type="button"
                onClick={handleDateReset}
              />
            </p>
          )}
          <div className={styles.writeForm_select_box}>
            <SelectCountry onChange={handleRadioClick} />
          </div>
          <Input
            type="file"
            name="foodImage"
            value={fileInput}
            onChange={onFileChange}
            labelText="사진을 등록해주세요!"
            required={false}
          />
          {imageURL !== "" ? (
            <div className={styles.preview}>
              <img src={imageURL} alt="preview" height="150px" />
              <button onClick={handleImageReset}>X</button>
            </div>
          ) : null}
        </div>
        <div className={styles.writeForm_div}>
          <Input
            type="text"
            value={food}
            onChange={onFoodChange}
            required={true}
            labelText="*음식 이름을 기록해주세요!"
            name="food"
          />
          <Input
            type="text"
            value={commentary}
            onChange={onCommentaryChange}
            required={false}
            labelText="음식에 대해 기록해주세요!"
            name="commentary"
          />
          <Input
            type="number"
            value={foodExpenses}
            onChange={onFoodExpensesChange}
            required={true}
            labelText="*금액을 숫자로 입력해주세요!"
            name="foodExpense"
          />
          <Input
            type="number"
            value={exchangedMoney | 0}
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
  );
};

export default WriteFormView;
