import styles from "./styles/atom.module.scss";

type InputTypes = {
  type: "text" | "date" | "file" | "number" | "password";
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required: boolean;
  labelText: string;
  placeholder?: string;
  max?: string;
};

const Input = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  required,
  labelText,
  max,
}: InputTypes) => {
  return (
    <>
      {type === "text" || type === "number" ? (
        <>
          <label className={styles.label} htmlFor={name}>
            {labelText}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
            placeholder={placeholder}
            required={required}
            readOnly={name === "exchangedMoney" ? true : false}
          />
        </>
      ) : null}
      {type === "date" ? (
        <>
          <label className={styles.label} htmlFor={name}>
            {labelText}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={styles.input}
            min="2021-11-22"
            max={max}
            required={required}
          />
        </>
      ) : null}
      {type === "file" ? (
        <>
          <label className={styles.label} htmlFor={name}>
            {labelText}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            accept="image/*"
            onChange={onChange}
            className={styles.input}
          />
        </>
      ) : null}
      {type === "password" ? (
        <>
          <label className={styles.label} htmlFor={name}>
            {labelText}
          </label>
          <input
            id={name}
            type={type}
            name={name}
            value={value}
            minLength={8}
            maxLength={20}
            pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
            onChange={onChange}
            className={styles.input}
          />
        </>
      ) : null}
    </>
  );
};

export default Input;
