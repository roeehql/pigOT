import { LoginFormViewState } from "@@types/authType";
import Button from "@atomic/Button";
import Input from "@atomic/Input";
import styles from "@styles/Auth.module.scss";

const LoginFormView = ({
  email,
  onEmailChange,
  password,
  onPwChange,
  handleTestUser,
  onSubmit,
}: LoginFormViewState) => {
  return (
    <>
      <Button
        text="로그인 없이 둘러보기"
        className="big-button"
        type="button"
        onClick={handleTestUser}
      />
      <h2>로그인</h2>
      <form className={styles.authForm_form}>
        <Input
          type="text"
          name="email"
          value={email}
          onChange={onEmailChange}
          required={true}
          labelText="이메일"
        />
        <Input
          type="password"
          name="password"
          value={password}
          onChange={onPwChange}
          required={true}
          labelText="비밀번호"
        />
        <Button
          text="로그인"
          className="big-button"
          type="submit"
          onClick={onSubmit}
        />
      </form>
    </>
  );
};

export default LoginFormView;
