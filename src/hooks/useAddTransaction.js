import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase-config.js";
import { useGetUserInfo } from "./useGetUserInfo.js";

function useAddTransaction() {
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  const addTransaction = async ({
    description,
    transactionAmount,
    transactionType,
  }) => {
    await addDoc(transactionCollectionRef, {
      userID,
      description,
      transactionAmount,
      transactionType,
      createdAt: serverTimestamp(),
    });
  };

  return { addTransaction };
}

export { useAddTransaction };
