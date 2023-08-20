import { CountryListByUserState } from "@@types/contentsType";
import Button from "@atomic/Button";
import style from "@styles/ContentsList.module.scss";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

interface CountryListProps {
  userCounryList: CountryListByUserState[] | undefined;
  userCountryListError: boolean;
  setListByCountry: Dispatch<SetStateAction<string>>;
  userCountryListRefetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<CountryListByUserState[], unknown>>;
}

const CountryList = ({
  userCounryList,
  userCountryListError,
  setListByCountry,
  userCountryListRefetch,
}: CountryListProps) => {
  return (
    <ol className={style.items_counrtry}>
      <li onClick={() => setListByCountry("")}>전체보기|</li>
      {userCountryListError && (
        <Button
          text="재시도"
          className="small-button"
          type="button"
          onClick={userCountryListRefetch}
        />
      )}
      {userCounryList?.map((item, index) => (
        <li key={index} onClick={() => setListByCountry(item.country)}>
          {item.country.length < 10
            ? item.country
            : `${item.country.slice(0, 10)}...`}
          |
        </li>
      ))}
    </ol>
  );
};

export default CountryList;
