import Button from "@atomic/Button";
import Input from "@atomic/Input";
import AuthContainer from "../AuthContainer";
import styles from "@styles/Auth.module.scss";
import { RegisterUserViewState } from "@@types/authType";

const RegisterUserView = ({ registerData }: RegisterUserViewState) => {
  return (
    <AuthContainer>
      <div className={styles.authForm_box}>
        <form className={styles.authForm_form} method="post" name="frm">
          <Input
            type="text"
            name="validatedMail"
            value={registerData.authMail}
            onChange={registerData.onChange}
            required={true}
            labelText="계정"
          />
          <Input
            type="password"
            name="password"
            value={registerData.password}
            onChange={registerData.onPasswordChange}
            required={true}
            labelText="비밀번호"
          />
          <Input
            type="password"
            name="passwordCheck"
            value={registerData.passwordCheck}
            onChange={registerData.onPasswordCheckChange}
            required={true}
            labelText="비밀번호 확인"
          />
          {registerData.password !== registerData.passwordCheck ? (
            <small>비밀번호가 일치하지 않습니다.</small>
          ) : null}
          <Input
            type="text"
            name="userName"
            value={registerData.userName}
            onChange={registerData.onUserNameChange}
            required={true}
            labelText="별명"
          />
          <Button
            text="계정생성"
            className="big-button"
            type="submit"
            onClick={registerData.onSubmit}
          />
        </form>
      </div>
    </AuthContainer>
  );
};

export default RegisterUserView;
