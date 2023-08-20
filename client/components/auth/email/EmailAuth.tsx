import { useDuplicationCheck } from "@hooks/auth/useDuplicationCheck";
import { useHandleEmailAuth } from "@hooks/auth/useHandleEmailAuth";
import useInput from "@hooks/useInput";
import { Toast } from "@util/handleAlert";
import EmailAuthView from "./EmailAuthView";

const EmailAuth = () => {
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
    if (result === 0) {
      setStep("B");
      const num = await useHandleEmailAuth(authMail);
      setNumber(num.toString());
    } else {
      setStep("A");
      Toast.fire({
        icon: "error",
        title: "이미 가입된 계정입니다. \n Your account already exist.",
      });
      setAuthMail("");
    }
  };

  const handleAuthCheck = async () => {
    if (number.toString() === authNum) {
      setStep("C");
    } else {
      Toast.fire({
        icon: "error",
        title: `인증번호를 다르게 입력하셨습니다. \n entered wrong auth-number`,
      });
      setAuthNum("");
    }
  };

  const emailAuthData = {
    step,
    authNum,
    authMail,
    onAuthNumChange,
    onAuthMailChange,
    handleEmailAuth,
    handleAuthCheck,
  };

  return <EmailAuthView {...emailAuthData} />;
};

export default EmailAuth;
