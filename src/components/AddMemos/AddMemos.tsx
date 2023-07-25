import { useMutation, useQueryClient } from "@tanstack/react-query";
import styles from "./AddMemos.module.css";
import { useState } from "react";
import { addMemo } from "../../api/firebase";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { memoOff } from "../../redux/Redux";
import { BsCheckLg } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
interface AddMemoType {
  title: string;
  detail: string;
}
export default function AddMemos(): JSX.Element {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const queryClint = useQueryClient();
  const addMemoMutate = useMutation(
    ({ title, detail }: AddMemoType) => addMemo(title, detail),
    {
      onSuccess: () => {
        queryClint.invalidateQueries(["memo"]);
      },
    }
  );
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const titleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const detailHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };
  const addHandle = () => {
    if (title.trim() === "") {
      Swal.fire("Please write the title");
      return;
    }
    addMemoMutate.mutate({ title, detail });
    dispatch(memoOff());
    navigate("./");
    setTitle("");
    setDetail("");
  };
  const closeHandle = () => {
    dispatch(memoOff());
  };
  return (
    <div className={styles.addMemoWrap}>
      <div className={styles.addMemo}>
        <div className={styles.x}>
          <div onClick={closeHandle} className={styles.x_icon}>
            <FiX size={30} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.main_input}>
            <input value={title} onChange={titleHandle} />
          </div>
          <div className={styles.main_area}>
            <textarea value={detail} onChange={detailHandle}></textarea>
          </div>
        </div>
        <div className={styles.check}>
          <div onClick={addHandle} className={styles.check_icon}>
            <BsCheckLg size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}
