import { FormEvent } from "react";
import { useRouter } from "next/router";
import useInput from "@hooks/useInput";
import { useHandleLogin } from "@hooks/auth/useHandleLogin";
import { Toast } from "@util/handleAlert";
import { useHandleTestUser } from "@hooks/auth/useHandleTestUser";
import LoginFormView from "./LoginFormView";

const LoginForm = () => {
  const router = useRouter();
  const {
    value: email,
    onChange: onEmailChange,
    setValue: setEmail,
  } = useInput("");
  const {
    value: password,
    onChange: onPwChange,
    setValue: setPassword,
  } = useInput("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email === "" || password === "") {
      Toast.fire({
        icon: "error",
        title:
          "이메일과 비밀번호를 입력해주세요! \n Please Enter your email and Password!",
      });
    } else {
      const result = await useHandleLogin(email, password);
      if (result) {
        setEmail("");
        setPassword("");
        router.push("/home");
      } else {
        setEmail("");
        setPassword("");
      }
    }
  };

  const handleTestUser = async () => {
    const result = await useHandleTestUser();
    if (result) {
      setEmail("");
      setPassword("");
      router.push("/home");
    } else {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <LoginFormView
      email={email}
      onEmailChange={onEmailChange}
      password={password}
      onPwChange={onPwChange}
      handleTestUser={() => handleTestUser()}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
