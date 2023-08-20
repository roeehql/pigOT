import { useState } from "react";
import { useAppSelector } from "store/store";
import useGetUserCountryList from "../../../hooks/contents/useGetUserCountryList";
import { useGetContentsList } from "../../../hooks/contents/useGetContentList";

import styles from "@styles/ContentsList.module.scss";
import Loading from "@atomic/Loading";
import Button from "@atomic/Button";

import TotalAmount from "./TotalAmount";
import ContentsTable from "./ContentsTable";
import CountryList from "./CountryList";

const ContentsList = () => {
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const {
    data: userCounryList,
    isError: userCountryListError,
    refetch: userCountryListRefetch,
  } = useGetUserCountryList(userInfo.useremail);
  const [listByCountry, setListByCountry] = useState("");
  const {
    data: contentsArr,
    isLoading,
    isError,
    refetch,
  } = useGetContentsList(userInfo.useremail);

  if (isLoading) {
    return (
      <div className={styles.contentslist_container}>
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.contentslist_container}>
        <p>죄송합니다. 다시 시도해주세요.</p>
        <Button
          text="재시도"
          className="small-button"
          type="button"
          onClick={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className={styles.contentslist_container}>
      <TotalAmount />
      <CountryList
        userCounryList={userCounryList}
        userCountryListError={userCountryListError}
        setListByCountry={setListByCountry}
        userCountryListRefetch={userCountryListRefetch}
      />
      <ContentsTable
        className={styles.table_container}
        contentsArr={contentsArr}
        listByCountry={listByCountry}
      />
    </div>
  );
};

export default ContentsList;
