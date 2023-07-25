import styles from "./Nav.module.css";
import { BsList } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavStateType, navOff, navOn } from "../../redux/Redux";
import { Dispatch } from "redux";
import Menu from "../Menu/Menu";
import AddMemos from "../AddMemos/AddMemos";

export default function Nav(): JSX.Element {
  const navState = useSelector((state: NavStateType) => state.nav);
  const memoState = useSelector((state: NavStateType) => state.memo);
  const dispatch: Dispatch = useDispatch();
  const navHandle = () => {
    if (navState === false) dispatch(navOn());
    else dispatch(navOff());
  };
  return (
    <div className={styles.nav}>
      <div className={styles.icon} onClick={navHandle}>
        <BsList size={55} />
      </div>
      <div>
        <Menu />
      </div>
      <div
        className={
          memoState ? `${styles.memoComponent}` : `${styles.memoHidden}`
        }
      >
        <AddMemos />
      </div>
    </div>
  );
}
