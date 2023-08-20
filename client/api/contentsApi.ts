import { ContentsApiState, ContentsState, EditContentState, IdState } from "@@types/contentsType";
import axiosApi from "@api/axiosApi";

const contentsApi: ContentsApiState = {
    inputContent : async ({contents} : {contents : ContentsState}) => {
        const { data } = await axiosApi.post("api/contents?type=inputContent", {
            useremail : contents.useremail,
            food : contents.food,
            country : contents.country,
            foodExpenses : contents.foodExpenses,
            exchangedMoney: contents.exchangedMoney,
            currencyCode  : contents.currencyCode,
            commentary : contents.commentary,
            tripDate : contents.tripDate,
            imageURL : contents.imageURL,
            id: contents.id,
        });
        return data;
    },
    getContents : async (useremail : string) =>{
        const { data }= await axiosApi.post("api/contents?type=contentsList", {
            useremail,
        });
          return data.json;
    },
    getTotalAmount : async (is_Useremail:string) =>{
        const { data } = await axiosApi.post("api/contents?type=totalAmount", {
            useremail : is_Useremail,
          });
          return data.json[0].sum_of_exchangedMoney;
    },
    modifyContent : async({editContent} : {editContent : EditContentState}) => {
        const { data } = await axiosApi.post("/api/contents?type=editContent", {
            id: editContent.id,
            editFood: editContent.editFood,
            editFoodExpenses: editContent.editFoodExpenses,
            editCountry: editContent.editCountry,
            editExchangedMoney: editContent.editExchangedMoney,
            editCurrencyCode: editContent.editCurrencyCode,
            editCommentary: editContent.editCommentary,
            editTripDate: editContent.editTripDate,
            editImageURL: editContent.editImageURL,
        });
        return data;
    },
    deleteContent : async ({id} : IdState) => {
        const { data } = await axiosApi.post("/api/contents?type=deleteContent", {
            id,
          });
        return data;
    },
    deleteAll : async (is_Useremail : string) => {
        const { data } = await axiosApi.post("/api/contents?type=deleteAll", {
            useremail : is_Useremail,
          });
        return data;
    },
    getUserCountryList : async (useremail : string) => {
        const { data } = await axiosApi.post("/api/contents?type=userCountryList", {
            useremail,
          });
        return data.json;
    },
    getContentDetail : async (id:string ,useremail : string) => {
        const { data } = await axiosApi.post("/api/contents?type=contentDetail", {
            id,
            useremail,
          });      
        return data.json;
    },
}

export default contentsApi;