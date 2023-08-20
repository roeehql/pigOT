import { useAppDispatch, useAppSelector } from "@store/store";
import { close, open } from "@store/modalSlice";
import { Confirm } from "@util/handleAlert";
import styles from "@styles/Auth.module.scss";
import Button from "@atomic/Button";

import dynamic from "next/dynamic";
import AuthContainer from "../AuthContainer";
const EmailAuthForm = dynamic(() => import("./PasswordChangeEmailAuth"));

const FindIdPass = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.openModal.isOpen);

  const handleModalClosing = () => {
    Confirm("창을 닫고 처음부터 다시 ").then((result) => {
      if (result.isConfirmed) {
        dispatch(close());
      } else if (result.isDenied) {
        return false;
      }
    });
  };

  return (
    <AuthContainer>
      <>
        <Button
          text="비밀번호 찾기 및 변경"
          className="small-button"
          type="button"
          onClick={() => dispatch(open())}
        />
        {isOpen && (
          <div className={styles.findPassword_container}>
            <div className={styles.findPassword_box}>
              <Button
                text="닫기"
                className="small-button"
                type="button"
                onClick={handleModalClosing}
              />
              <EmailAuthForm />
            </div>
          </div>
        )}
      </>
    </AuthContainer>
  );
};

export default FindIdPass;
