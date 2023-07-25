import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeMemo, deleteMemo, getMemoDetail } from "../../api/firebase";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { memoOff, navOff } from "../../redux/Redux";
import { BsCheckLg, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";

interface MutationProps {
  id: string;
  title: string;
  detail: string;
}
interface IdType {
  id: string;
}
export default function Detail(): JSX.Element {
  const { id } = useParams() as { id: string };
  const queryClint = useQueryClient();
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const { isLoading, data: memo } = useQuery(["memo", id], () => {
    return getMemoDetail(id as string).then((memo) => memo);
  });
  const memoChangeMutate = useMutation(
    ({ id, title, detail }: MutationProps) => changeMemo(id, title, detail),
    {
      onSuccess: () => {
        queryClint.invalidateQueries(["memo", id]);
      },
    }
  );
  const memoDeleteMutate = useMutation(({ id }: IdType) => deleteMemo(id), {
    onSuccess: () => {
      queryClint.invalidateQueries(["memo"]);
    },
  });
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  useEffect(() => {
    dispatch(navOff());
    dispatch(memoOff());
    if (memo !== undefined) {
      setTitle(memo.title);
      setDetail(memo.detail);
    }
  }, [memo]);
  const submitHandle = () => {
    memoChangeMutate.mutate({ id, title, detail });
  };
  const deleteHandle = () => {
    Swal.fire({
      title: "Do you want to delete the memo?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/..");
        memoDeleteMutate.mutate({ id });
      } else if (result.isDenied) {
        Swal.fire("Your memo is safe", "", "info");
      }
    });
  };
  const titleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const detailHandle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDetail(e.target.value);
  };
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <img src="https://res.cloudinary.com/hoyahoya/image/upload/v1690121480/tuzuku_z9xlrd.png" />
      </div>
    );
  }
  return (
    <div className={styles.detail}>
      {/* <video autoPlay muted loop className={styles.homeVideo}>
        <source src="https://res.cloudinary.com/hoyahoya/video/upload/v1690257481/videoplayback2_qtrz04.mp4"></source>
      </video> */}
      <div className={styles.main}>
        <div className={styles.main_title}>
          <input value={title} onChange={titleHandle} />
        </div>
        <div className={styles.main_detail}>
          <textarea onChange={detailHandle} value={detail}></textarea>
        </div>
        <div className={styles.main_date}>{memo!.date}</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.bottom_check} onClick={submitHandle}>
          <BsCheckLg size={55} />
        </div>
        <div className={styles.bottom_delete} onClick={deleteHandle}>
          <BsTrash size={40} />
        </div>
      </div>
    </div>
  );
}
