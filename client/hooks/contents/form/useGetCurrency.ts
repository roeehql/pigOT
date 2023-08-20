import { useEffect, useState } from "react";
import currencyApi from "@api/currencyApi";
import { CurrecyState, CurrencyApiResponseState } from "@@types/currencyType";


export const useGetCurrency = ({date , codeName}:CurrecyState) => {
    const [exchangeRate, setExchangeRate] = useState(1);

    const getCurrency = async () =>{
        const response = await currencyApi.getCurrency({date , codeName});
        let list : CurrencyApiResponseState = response[`${codeName.toLowerCase()}`];
        setExchangeRate(list.krw);
    };

    useEffect(()=>{
        getCurrency();
    },[date, codeName]);
  
    return exchangeRate;
}