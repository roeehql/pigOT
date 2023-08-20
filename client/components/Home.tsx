import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import { userInfoFetch } from "@store/userInfoSlice";

import Loading from "@atomic/Loading";
import styles from "@styles/WriteForm.module.scss";
import dynamic from "next/dynamic";

const WriteForm = dynamic(
  () => import("@components/contents/writeform/WriteForm")
);
const ContentsList = dynamic(
  () => import("@components/contents/contentsList/ContentsList"),
  { loading: () => <Loading /> }
);

const Home = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.value);

  useEffect(() => {
    dispatch(userInfoFetch());
  }, []);

  if (userInfo.userflag === "") {
    const Warning = dynamic(() => import("@atomic/Warning"));
    return (
      <Warning
        message={`로그인 후 이용하세요.
        잠시 후 로그인화면으로 이동합니다.`}
        path="/"
      />
    );
  }

  return (
    <main className={styles.contents_container}>
      <ContentsList />
      <WriteForm />
    </main>
  );
};

export default Home;
