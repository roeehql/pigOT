import { useQuery } from "@tanstack/react-query";
import currencyApi from "@api/currencyApi";
import { CountryListState } from "@@types/currencyType";
import { COUNTRY_LIST_QUERY } from "@constant/query.constant";
import styles from "@styles/Select.module.scss";
import Button from "@atomic/Button";
import { SelectTypes } from "@@types/contentsType";

const Select = ({ onChange, labelText, value }: SelectTypes) => {
  const getList = (): Promise<CountryListState[]> => {
    return currencyApi.getCountryList();
  };
  const {
    data: countryList,
    isLoading,
    refetch,
    isError,
  } = useQuery([COUNTRY_LIST_QUERY], getList);

  if (isError) {
    return (
      <>
        <label className={styles.label} htmlFor="choose-country">
          "죄송합니다. 리스트를 불러오지 못했습니다. 다시 시도해주세요."
        </label>
        <Button
          text="재시도"
          className="small-button"
          type="button"
          onClick={refetch}
        />
      </>
    );
  }

  return (
    <>
      <label className={styles.label} htmlFor="choose-country">
        {labelText}
      </label>
      <select className={styles.select} id="country-select" onChange={onChange}>
        <option className={styles.option} value={value}>
          --{isLoading ? "불러오는 중..." : labelText}--
        </option>
        {countryList?.map((item, index) => (
          <option
            className={styles.option}
            key={index}
            value={[item.currencyName, item.country]}
          >
            화폐 : {item.currencyName}, 나라이름 : {item.country}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
