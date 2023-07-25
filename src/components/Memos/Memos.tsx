import { useNavigate } from "react-router-dom";
import { MemoType } from "../../pages/Home/Home";
import styles from "./Memos.module.css";

interface MemoProp {
  memo: MemoType;
}
export default function Memos({ memo }: MemoProp): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className={styles.memo}>
      <div className={styles.memoRadius}>
        <div
          onClick={() => {
            navigate(`/${memo.id}`);
          }}
          className={styles.title}
        >
          {memo.title}
        </div>
        <div
          onClick={() => {
            navigate(`/${memo.id}`);
          }}
          className={styles.detail}
        >
          {memo.detail}
        </div>

        <div className={styles.date}>{memo.date}</div>
      </div>
    </div>
  );
}
