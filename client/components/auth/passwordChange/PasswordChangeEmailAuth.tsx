import useInput from "@hooks/useInput";
import { useDuplicationCheck } from "@hooks/auth/useDuplicationCheck";
import { useHandleEmailAuth } from "@hooks/auth/useHandleEmailAuth";

import { Toast } from "@util/handleAlert";
import styles from "@styles/Auth.module.scss";
import Button from "@atomic/Button";
import Input from "@atomic/Input";

import dynamic from "next/dynamic";
import AuthContainer from "../AuthContainer";
const PasswordChangeForm = dynamic(() => import("./PasswordChangeForm"));

const PasswordChangeEmailAuth = () => {
  const {
    value: authNum,
    onChange: onAuthNumChange,
    setValue: setAuthNum,
  } = useInput("");
  const {
    value: authMail,
    onChange: onAuthMailChange,
    setValue: setAuthMail,
  } = useInput("");
  const { value: number, setValue: setNumber } = useInput("");
  const { value: step, setValue: setStep } = useInput("A");

  const handleEmailAuth = async () => {
    const result = await useDuplicationCheck(authMail);
    if (result === 1) {
      setStep("B");
      const num = await useHandleEmailAuth(authMail);
      setNumber(num.toString());
    } else {
      setStep("A");
      Toast.fire({
        icon: "error",
        title:
          "가입되지 않은 계정입니다. \n Your account not exist, but you can be the our user now and always!",
      });
      setAuthMail("");
    }
  };

  const handleCheckAuthNumber = () => {
    if (authNum == number) {
      setStep("C");
    } else {
      Toast.fire({
        icon: "error",
        title: `인증번호를 다르게 입력하셨습니다. \n entered wrong auth-number`,
      });
      setAuthNum("");
      setTimeout(() => {
        setStep("A");
      }, 60000);
    }
  };

  return (
    <AuthContainer>
      <>
        {step === "A" ? (
          <div className={styles.findPassword_form}>
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
        ) : null}
        {step === "B" ? (
          <div className={styles.findPassword_form}>
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
              onClick={handleCheckAuthNumber}
            />
          </div>
        ) : null}
        {step === "C" ? <PasswordChangeForm email={authMail} /> : null}
      </>
    </AuthContainer>
  );
};

export default PasswordChangeEmailAuth;
