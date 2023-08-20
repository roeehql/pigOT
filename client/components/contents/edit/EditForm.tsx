import { FormEvent, useState, useEffect } from "react";
import { ContentsState } from "@@types/contentsType";

import { useGetCurrency } from "@hooks/contents/form/useGetCurrency";
import useInput from "@hooks/useInput";
import useGetTripDate from "@hooks/contents/form/useGetTripDate";
import useSelectCountry from "@hooks/contents/form/useSelectCountry";
import { useHandleEdit } from "@hooks/contents/form/useHandleEdit";
import useGetImageURL from "@hooks/contents/form/useGetImageURL";
import EditFormView from "./EditFormView";

const EditForm = ({
  contents,
  close,
}: {
  contents: ContentsState;
  close: () => void;
}) => {
  const { mutate: editContent } = useHandleEdit();

  const {
    tripDate: editTripDate,
    today,
    selectTripDate,
  } = useGetTripDate(contents.tripDate);
  const {
    country: editCountry,
    currencyCode: editCurrencyCode,
    selectCountry,
  } = useSelectCountry(contents.country, contents.currencyCode);
  const {
    imageURL: editImageURL,
    setImageURL: setEditImageURL,
    onFileChange,
  } = useGetImageURL(contents.imageURL);

  const { value: editFood, onChange: onFoodChange } = useInput(contents.food);
  const { value: editFoodExpenses, onChange: onFoodExpensesChange } = useInput(
    contents.foodExpenses
  );
  const { value: editCommentary, onChange: onCommentaryChange } = useInput(
    contents.commentary
  );

  const [editExchangedMoney, setEditExchangedMoney] = useState(
    parseInt(contents.exchangedMoney)
  );
  const { value: fileInput } = useInput("");

  const exchangeRate = useGetCurrency({
    date: editTripDate,
    codeName: editCurrencyCode,
  });

  const getExchangedMoney = (exchangeRate: number) => {
    let expense = parseInt(editFoodExpenses);
    setEditExchangedMoney(Math.round(exchangeRate * expense));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    editContent({
      id: contents.id,
      editFood,
      editFoodExpenses,
      editCountry,
      editExchangedMoney: editExchangedMoney.toString(),
      editCurrencyCode,
      editCommentary,
      editTripDate,
      editImageURL,
    });
    close();
  };

  useEffect(() => {
    getExchangedMoney(exchangeRate);
  }, [editFoodExpenses]);

  const editFormData = {
    handleClose: () => close(),
    editTripDate,
    selectTripDate,
    today,
    handleSelectCountry: selectCountry,
    selectlabel: contents.country,
    fileInput,
    onFileChange,
    editImageURL,
    handleResetEditImageURL: () => setEditImageURL(""),
    editFood,
    onFoodChange,
    editCommentary,
    onCommentaryChange,
    editFoodExpenses,
    onFoodExpensesChange,
    editExchangedMoney,
    existExchangedMoney: contents.exchangedMoney,
    onSubmit,
  };
  return <EditFormView {...editFormData} />;
};

export default EditForm;
