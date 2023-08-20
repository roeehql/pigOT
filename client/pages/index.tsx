import Button from "@atomic/Button";
import AuthContainer from "@components/auth/AuthContainer";
import LoginForm from "@components/auth/login/LoginForm";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "@styles/Auth.module.scss";
import dynamic from "next/dynamic";
const FindIdPass = dynamic(
  () => import("@components/auth/passwordChange/FindIdPass")
);

const FirstPage: NextPage = () => {
  const router = useRouter();

  return (
    <AuthContainer>
      <div className={styles.authForm_box}>
        <LoginForm />
        <FindIdPass />
        <Button
          text="회원가입"
          className="small-button"
          type="button"
          onClick={() => router.push("/auth")}
        />
      </div>
    </AuthContainer>
  );
};

export default FirstPage;
