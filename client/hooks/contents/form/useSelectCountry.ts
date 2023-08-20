import { useState } from "react";

const useSelectCountry = (initialCountry : string , initialCurrencyCode = "KRW") => {
    const [country, setCountry] = useState(initialCountry);
    const [currencyCode, setCurrencyCode] = useState(initialCurrencyCode);
    
    const selectCountry = (event : React.ChangeEvent<HTMLSelectElement>) => {   
        const {
          target: { value },
        } = event;
        setCurrencyCode(value.split(",")[0]);
        setCountry(value.split(",")[1]);
    };
    return {country , currencyCode , selectCountry};
}

export default useSelectCountry;