import { PasswordChangeFormViewState } from "@@types/authType";
import Button from "@atomic/Button";
import Input from "@atomic/Input";
import styles from "@styles/Auth.module.scss";

const PasswordChangeFormView = ({
  password,
  onPasswordChange,
  passwordCheck,
  onPasswordCheckChange,
  handleEditPassword,
}: PasswordChangeFormViewState) => {
  return (
    <div className={styles.findPassword_modal}>
      <p>
        인증되었습니다. <br />
        새로운 비밀번호를 입력해주세요.
      </p>
      <Input
        type="password"
        name="password"
        value={password}
        onChange={onPasswordChange}
        required={true}
        labelText="비밀번호"
      />
      <Input
        type="password"
        name="passwordCheck"
        value={passwordCheck}
        onChange={onPasswordCheckChange}
        required={true}
        labelText="비밀번호 확인"
      />
      {password !== passwordCheck && (
        <small>비밀번호가 일치하지 않습니다.</small>
      )}
      <Button
        text="비밀번호 변경"
        className="small-button"
        type="button"
        onClick={handleEditPassword}
      />
    </div>
  );
};

export default PasswordChangeFormView;
