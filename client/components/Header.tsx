import Link from "next/link";
import { useAppSelector } from "@store/store";
import styles from "@styles/Header.module.scss";
import { useHandleLogout } from "@hooks/auth/useHandleLogout";

const Header = () => {
  const userInfo = useAppSelector((state) => state.userInfo.value);

  const handleLogout = useHandleLogout();

  return (
    <nav className={styles.header_nav}>
      <ul className={styles.header_first_ul}>
        <Link
          href={
            userInfo.useremail === "" || userInfo.userflag === ""
              ? "/"
              : "/home"
          }
        >
          <li className={styles.header_li}>
            <span>돼지는여행중</span>
          </li>
        </Link>
        {userInfo.useremail === "" || userInfo.userflag === "" ? (
          <Link href="/">
            <li className={styles.header_li}>로그인/회원가입</li>
          </Link>
        ) : (
          <>
            <Link href="/mypage">
              <li className={styles.header_li}>
                <h4>🐽회원정보</h4>
              </li>
            </Link>
            <li className={styles.header_li} onClick={handleLogout}>
              로그아웃
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
