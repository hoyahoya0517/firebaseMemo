import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, remove, set } from "firebase/database";
import { MemoType } from "../pages/Home/Home";
import dayjs from "dayjs";

const firebaseConfig = {
  apiKey: "AIzaSyC7-m_mpsYmxqsJ9tbisfe097LtaYgKoZ0",
  authDomain: "memo-99e04.firebaseapp.com",
  databaseURL:
    "https://memo-99e04-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "memo-99e04",
  storageBucket: "memo-99e04.appspot.com",
  messagingSenderId: "310003020790",
  appId: "1:310003020790:web:2cb7c2b74b646748adcdd7",
};
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export function getMemo() {
  const dbRef = ref(database, "memo");
  return get(dbRef).then((snapshot): MemoType[] => {
    let data: MemoType[] = Object.values(snapshot.val());
    data.sort((a: MemoType, b: MemoType): number => {
      return (
        Number(b["date"].match(/\d+/g)!.join("")) -
        Number(a["date"].match(/\d+/g)!.join(""))
      );
    });

    return data;
  });
}

export function getMemoDetail(id: string) {
  const dbRef = ref(database, `/memo/${id}`);
  return get(dbRef).then((snapshot): MemoType => snapshot.val());
}

export async function changeMemo(id: string, title: string, detail: string) {
  const dbRef = ref(database, `/memo/${id}`);
  const date = dayjs(Date.now()).format("YYYY-MM-DD a HH:mm:ss");
  set(dbRef, {
    id: id,
    title: title,
    detail: detail,
    date: date,
  });
}

export async function deleteMemo(id: string) {
  const dbRef = ref(database, `/memo/${id}`);
  remove(dbRef);
}

export async function addMemo(title: string, detail: string) {
  const id = String(Date.now());
  const dbRef = ref(database, `/memo/${id}`);
  const date = dayjs(Date.now()).format("YYYY-MM-DD a HH:mm:ss");
  set(dbRef, {
    id: id,
    title: title,
    detail: detail,
    date: date,
  });
}
