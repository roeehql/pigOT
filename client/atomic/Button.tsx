import styles from "./styles/atom.module.scss";

type ButtonState = {
  text: string;
  className: "big-button" | "small-button";
  type: "button" | "submit" | "reset";
  onClick?: any;
  onSubmit?: any;
};

const Button = ({ text, type, className, onClick, onSubmit }: ButtonState) => {
  return (
    <button
      type={type}
      className={
        className === "big-button" ? styles.big_button : styles.small_button
      }
      onClick={onClick}
      onSubmit={onSubmit}
    >
      {text}
    </button>
  );
};

export default Button;
