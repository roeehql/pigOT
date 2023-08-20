import { ChangeEvent, FormEvent } from "react";
import { DataState } from "./apiTypes";

export interface ContentsState {
       id: string,
       useremail: string,
       food: string,
       country: string,
       foodExpenses: string,
       exchangedMoney: string,
       currencyCode: string,
       commentary: string,
       tripDate: string,
       imageURL: string,
       regdate? : string,
}

export interface EditContentState {
        id: string,
        editFood: string,
        editFoodExpenses: string,
        editCountry: string,
        editExchangedMoney: string,
        editCurrencyCode: string,
        editCommentary: string,
        editTripDate: string,
        editImageURL: string,
}

export interface IdState {
    id: string,
}

export interface CountryListByUserState {
    country : string;
}

export interface ContentsApiState {
    inputContent : ({ contents }: { contents: ContentsState }) => Promise<DataState>,
    getContents : (useremail : string)=>Promise<ContentsState[]>,
    getTotalAmount : (useremail : string)=>Promise<number>,
    modifyContent: ({ editContent }: {
        editContent: EditContentState
    }) => Promise<DataState>,
    deleteContent: ({ id }: IdState) => Promise<DataState>,
    deleteAll: (useremail: string) => Promise<DataState>,
    getUserCountryList: (useremail: string) => Promise<CountryListByUserState[]>,
    getContentDetail: (id: string, useremail: string) => Promise<ContentsState[]>
}

export type SelectTypes = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    labelText: string;
    value?: [string, string];
  };


export interface WriteFormViewState {
    selectDate: string;
    handleTodayClick: () => void;
    handleYesterdayClick: () => void;
    handleDateReset: () => void;
    handleRadioClick: (event: ChangeEvent<HTMLInputElement>) => void;
    fileInput: string;
    onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    imageURL :string,
    handleImageReset:()=>void,
    food :string,
    onFoodChange:(e: ChangeEvent<HTMLInputElement>) => void,
    commentary :string,
    onCommentaryChange:(e: ChangeEvent<HTMLInputElement>) => void,
    foodExpenses :string,
    onFoodExpensesChange:(e: ChangeEvent<HTMLInputElement>) => void,
    exchangedMoney : number,
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<any>;
}

export interface ContentsDetailViewState {
    data: ContentsState[] | undefined;
    isOpen: boolean;
    handleOpenForm: () => void;
    handleCloseForm: () => void;
    handleDelete: (id: string) => Promise<void>;
  };

export interface EditFormViewState {
    handleClose: () => void;
    editTripDate: string;
    selectTripDate: (event: ChangeEvent<HTMLInputElement>) => void;
    today: string;
    handleSelectCountry: (event: ChangeEvent<HTMLSelectElement>) => void;
    selectlabel :string,
    fileInput:string,
    onFileChange:(e: ChangeEvent<HTMLInputElement>) => void,
    editImageURL:string,
    handleResetEditImageURL:()=>void,
    editFood:string,
    onFoodChange:(e: ChangeEvent<HTMLInputElement>) => void,
    editCommentary:string,
    onCommentaryChange:(e: ChangeEvent<HTMLInputElement>) => void,
    editFoodExpenses:string,
    onFoodExpensesChange:(e: ChangeEvent<HTMLInputElement>) => void,
    editExchangedMoney:number,
    existExchangedMoney:string,
    onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<any>;
}