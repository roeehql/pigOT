import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";

import { useGetCurrency } from "@hooks/contents/form/useGetCurrency";
import useGetImageURL from "@hooks/contents/form/useGetImageURL";
import useInput from "@hooks/useInput";
import { useHandleSubmit } from "@hooks/contents/form/useHandleSubmit";

import { Toast } from "@util/handleAlert";
import { getToday, getYesterDay } from "@util/getToday";
import { useAppSelector } from "@store/store";
import WriteFormView from "./WriteFormView";

const WriteForm = () => {
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const { imageURL, setImageURL, onFileChange } = useGetImageURL("");
  /*날짜 선택 */
  const [tripDate, setTripDate] = useState(getToday());
  const [selectDate, setSelectDate] = useState("");
  const handleTripDate = (day: "오늘" | "어제") => {
    setSelectDate(day);
    day === "오늘" ? setTripDate(getToday()) : setTripDate(getYesterDay());
  };

  /*나라와 화폐단위 선택 */
  const [country, setCountry] = useState("");
  const [currencyCode, setCurrencyCode] = useState("KRW");

  const handleRadioClick = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setCurrencyCode(value.split(",")[0]);
    setCountry(value.split(",")[1]);
  };

  /*input 입력 함수 useInput들*/
  const {
    value: food,
    onChange: onFoodChange,
    setValue: setFood,
  } = useInput("");
  const {
    value: foodExpenses,
    onChange: onFoodExpensesChange,
    setValue: setFoodExpenses,
  } = useInput("");
  const {
    value: commentary,
    onChange: onCommentaryChange,
    setValue: setCommentary,
  } = useInput("");
  const { value: fileInput } = useInput("");

  /*환전 금액 계산 함수 */
  const [exchangedMoney, setExchangedMoney] = useState(0);

  const exchangeRate = useGetCurrency({
    date: tripDate,
    codeName: currencyCode,
  });
  const getExchangedMoney = (exchangeRate: number) => {
    let expense = parseInt(foodExpenses);
    let resultKRW = Math.round(exchangeRate * expense);
    setExchangedMoney(resultKRW);
  };

  /*submit 글쓰기 함수 */
  const { mutate: addContent } = useHandleSubmit();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (food === "" || country === "" || foodExpenses === "") {
      Toast.fire({
        icon: "warning",
        title:
          "음식이름과 금액, 나라는 필수입력사항입니다. \n You should fill required inputs that checked by *",
      });
    } else {
      addContent({
        useremail: userInfo.useremail,
        food,
        country,
        foodExpenses,
        exchangedMoney: exchangedMoney.toString(),
        currencyCode,
        commentary,
        tripDate,
        imageURL: imageURL.toString(),
        id: uuidv4(),
      });
      setFood("");
      setFoodExpenses("");
      setCommentary("");
      setImageURL("");
      setExchangedMoney(0);
    }
  };

  useEffect(() => {
    getExchangedMoney(exchangeRate);
  }, [foodExpenses]);

  const writeFormData = {
    selectDate,
    handleTodayClick: () => handleTripDate("오늘"),
    handleYesterdayClick: () => handleTripDate("어제"),
    handleDateReset: () => setTripDate(""),
    handleRadioClick,
    fileInput,
    onFileChange,
    imageURL,
    handleImageReset: () => setImageURL(""),
    food,
    onFoodChange,
    commentary,
    onCommentaryChange,
    foodExpenses,
    onFoodExpensesChange,
    exchangedMoney,
    onSubmit,
  };
  return <WriteFormView {...writeFormData} />;
};

export default WriteForm;
