import { useAppSelector } from "store/store";
import useGetTotalAmount from "@hooks/contents/form/useGetTotalAmount";
import Button from "@atomic/Button";
import style from "@styles/ContentsList.module.scss";

const TotalAmount = () => {
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const {
    data: totalAmount,
    isLoading,
    isError,
    refetch,
  } = useGetTotalAmount(userInfo.useremail);

  if (isError) {
    <Button
      text="재시도"
      className="small-button"
      type="button"
      onClick={refetch}
    />;
  }

  return (
    <div className={style.items_box}>
      <p>총 누적금액 : {isLoading ? "..." : totalAmount}원</p>;
    </div>
  );
};

export default TotalAmount;
