import styles from "./Home.module.css";
import { getMemo } from "../../api/firebase";
import { useQuery } from "@tanstack/react-query";
import Memos from "../../components/Memos/Memos";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { memoOff, navOff } from "../../redux/Redux";

export interface MemoType {
  id: number;
  date: string;
  title: string;
  detail: string;
}

export default function Home(): JSX.Element {
  const { isLoading, data: memos } = useQuery(["memo"], () => {
    return getMemo().then((memo) => {
      return memo;
    });
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(navOff());
    dispatch(memoOff());
  }, []);
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1690121480/tuzuku_z9xlrd.png" />
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <video autoPlay muted loop className={styles.homeVideo}>
        <source src="https://res.cloudinary.com/hoyahoya/video/upload/v1689144591/videoplayback_cbwmks.mp4"></source>
      </video>
      <div className={styles.memoWrap}>
        {memos!.map((memo: MemoType) => {
          return <Memos memo={memo} key={memo.id} />;
        })}
      </div>
    </div>
  );
}
