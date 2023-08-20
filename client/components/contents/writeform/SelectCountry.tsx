import styles from "@styles/Select.module.scss";
import { famousCountry } from "@util/famousCountry";
import { ChangeEvent } from "react";

const SelectCountry = ({
  onChange,
}: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      {famousCountry.map((item) => (
        <div className={styles.select_div} key={item.index}>
          <input
            type="radio"
            name="country"
            className={styles.select_radio}
            onChange={onChange}
            value={[item.currencyCode, item.country]}
          />
          <label className={styles.label} htmlFor="country">
            {item.country}
          </label>
        </div>
      ))}
    </>
  );
};

export default SelectCountry;
