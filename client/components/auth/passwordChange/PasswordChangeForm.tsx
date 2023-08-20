import { useAppDispatch } from "@store/store";
import { close } from "@store/modalSlice";
import useInput from "@hooks/useInput";
import { useEditPassword } from "@hooks/user/useEditPassword";
import PasswordChangeFormView from "./PasswordChangeFormView";

const PasswordChangeForm = ({ email }: { email: string }) => {
  const dispatch = useAppDispatch();
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

  const handleEditPassword = async () => {
    const result = await useEditPassword(password, passwordCheck, email);
    if (result === "succ") {
      dispatch(close());
      setPassword("");
      setPasswordCheck("");
    } else {
      setPassword("");
      setPasswordCheck("");
    }
  };

  const passwordChangeFormData = {
    password,
    onPasswordChange,
    passwordCheck,
    onPasswordCheckChange,
    handleEditPassword,
  };
  return <PasswordChangeFormView {...passwordChangeFormData} />;
};

export default PasswordChangeForm;
