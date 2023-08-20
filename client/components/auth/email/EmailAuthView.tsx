import Button from "@atomic/Button";
import Input from "@atomic/Input";
import styles from "@styles/Auth.module.scss";

import dynamic from "next/dynamic";
import { EmailAuthViewState } from "@@types/authType";
const RegisterUser = dynamic(() => import("../register/RegisterUser"));

const EmailAuthView = ({
  step,
  authNum,
  authMail,
  onAuthNumChange,
  onAuthMailChange,
  handleEmailAuth,
  handleAuthCheck,
}: EmailAuthViewState) => {
  return (
    <div className={styles.authForm_container}>
      {step === "A" && (
        <div className={styles.authForm_box}>
          <Input
            type="text"
            name="authMail"
            value={authMail}
            onChange={onAuthMailChange}
            required={true}
            labelText="입력하신 이메일로 인증번호가 전송됩니다."
          />
          <p>
            이메일 전송에 시간이 걸릴 수 있습니다.
            <br />
            3분이 지나도 이메일을 받지 못하시면 재시도 해주세요.
          </p>
          <Button
            text="이메일 인증하기"
            className="big-button"
            type="button"
            onClick={handleEmailAuth}
          />
        </div>
      )}
      {step === "B" && (
        <div className={styles.authForm_box}>
          <Input
            type="text"
            name="authNumber"
            value={authNum}
            onChange={onAuthNumChange}
            required={true}
            labelText="인증번호를 입력해주세요!"
          />
          <Button
            text="확인"
            className="big-button"
            type="button"
            onClick={handleAuthCheck}
          />
        </div>
      )}
      {step === "C" && <RegisterUser authMail={authMail} />}
    </div>
  );
};

export default EmailAuthView;
