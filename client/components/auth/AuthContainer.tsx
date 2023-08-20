import { ReactElement } from "react";
import styles from "@styles/Auth.module.scss";

const AuthContainer = (props: { children: ReactElement }) => {
  return <div className={styles.authForm_container}>{props.children}</div>;
};

export default AuthContainer;
