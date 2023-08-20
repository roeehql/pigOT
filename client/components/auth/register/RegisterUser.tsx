import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useHandleSignup } from "@hooks/auth/useHandleSignup";
import useInput from "@hooks/useInput";
import { Toast } from "@util/handleAlert";
import RegisterUserView from "./RegisterUserView";

const RegisterUser = ({ authMail }: { authMail: string }) => {
  const router = useRouter();
  const {
    value: password,
    onChange: onPasswordChange,
    setValue: setPassword,
  } = useInput("");
  const {
    value: passwordCheck,
    onChange: onPasswordCheckChange,
    setValue: setPasswordCheck,
  } = useInput("");
  const {
    value: userName,
    onChange: onUserNameChange,
    setValue: setUserName,
  } = useInput("");

  const handleSignUp = useHandleSignup();

  const onChange = () => {
    Toast.fire({
      icon: "warning",
      title:
        "계정을 바꾸려면 다시 인증하셔야 합니다. \n If you want to change account, you should auth from the begining again",
    });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === "" || userName === "") {
      Toast.fire({
        icon: "warning",
        title:
          "비밀번호와 별명을 입력해주세요. \n Please enter your password or name",
      });
    } else if (password !== passwordCheck) {
      Toast.fire({
        icon: "warning",
        title:
          "입력된 비밀번호를 확인해주세요.\n Please check your password that entered",
      });
    } else {
      const result = await handleSignUp({
        is_Username: userName,
        is_Useremail: authMail,
        is_Password: password,
      });
      if (result) {
        setPassword("");
        setPasswordCheck("");
        setUserName("");
        router.push("/");
      }
    }
  };

  return (
    <RegisterUserView
      registerData={{
        authMail,
        onChange,
        password,
        onPasswordChange,
        passwordCheck,
        onPasswordCheckChange,
        userName,
        onUserNameChange,
        onSubmit,
      }}
    />
  );
};

export default RegisterUser;
