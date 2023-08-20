export interface CountryListState {
    currencyName: string;
    country: string;
}

export type CurrecyState = {
    date : string;
    codeName : string;
}
export interface CurrencyApiResponseState{
        [key: string] : number,
}
export interface CurrencyApiState {
    getCountryList: () => Promise<CountryListState[]>,
    getCurrency :({ date, codeName }: CurrecyState) => Promise<any>,
}