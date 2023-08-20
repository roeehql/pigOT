import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./styles/atom.module.scss";

const Warning = ({ message, path }: { message: string; path: string }) => {
  const router = useRouter();
  const [showTimeOut, setShowTimeOut] = useState(0);

  useEffect(() => {
    const expressTime = setInterval(() => {
      setShowTimeOut((current: number) => current + 1);
    }, 100);
    const moveUserLocation = setTimeout(() => {
      clearInterval(expressTime);
      router.push(`${path}`);
    }, 3000);
    return () => clearTimeout(moveUserLocation);
  }, []);

  return (
    <div className={styles.warning}>
      <label id="warning">{message}</label>
      <progress
        id="warning"
        className={styles.warning_progress}
        max={30}
        value={showTimeOut}
      />
    </div>
  );
};

export default Warning;
