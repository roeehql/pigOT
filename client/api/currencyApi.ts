import axiosApi from "@api/axiosApi";
import { CurrecyState, CurrencyApiState } from "@@types/currencyType";

const currencyApi: CurrencyApiState = {
    getCountryList : async () => {
      const { data } = await axiosApi.post("/api/currency");
        return data.countryCodeList;
    },
    getCurrency : async ({date , codeName} : CurrecyState) => {
        const { data } = await axiosApi.get(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/${date}/currencies/${codeName.toLowerCase()}.json`);
        return data;
    },        
}


export default currencyApi;