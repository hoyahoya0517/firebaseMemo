import styles from "./Menu.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  NavStateType,
  memoOff,
  memoOn,
  navOff,
  navOn,
} from "../../redux/Redux";
import { Dispatch } from "redux";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function Menu(): JSX.Element {
  const navigate = useNavigate();
  const navState = useSelector((state: NavStateType) => state.nav);
  const memoState = useSelector((state: NavStateType) => state.memo);
  const dispatch: Dispatch = useDispatch();
  const navHandle = () => {
    if (navState === false) dispatch(navOn());
    else dispatch(navOff());
  };
  const memoHandle = () => {
    dispatch(memoOn());
    dispatch(navOff());
  };
  const xHandle = () => {
    dispatch(navOff());
  };
  const homeHandle = () => {
    navigate("./");
  };
  return (
    <div className={navState ? `${styles.menu}` : `${styles.hidden}`}>
      <div className={styles.x}>
        <div className={styles.x_icon} onClick={xHandle}>
          <FiX size={25} />
        </div>
      </div>
      <div className={styles.select}>
        <div className={styles.home} onClick={homeHandle}>
          HOME
        </div>
        <div className={styles.add} onClick={memoHandle}>
          ADD MEMO
        </div>
      </div>
    </div>
  );
}
