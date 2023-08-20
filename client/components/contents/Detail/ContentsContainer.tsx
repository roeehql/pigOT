import { ReactElement } from "react";
import styles from "@styles/ContentsDetail.module.scss";

const ContentsContainer = (props: { children: ReactElement }) => {
  return (
    <div className={styles.contents_container}>
      <div className={styles.contentslist_container}>{props.children}</div>
    </div>
  );
};

export default ContentsContainer;
