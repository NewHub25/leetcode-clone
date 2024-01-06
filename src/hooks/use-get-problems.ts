import { firestore } from "@/firebase/firebase";
import {type DBProblem } from "@/utils/types/problem";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useGetProblems(setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>) {
  const [problems, setProblems] = useState<DBProblem[]>([]);

  useEffect(() => {
    const getProblems = async () => {
      // Fetching de data
      setLoadingProblems(true);
      const q = query(collection(firestore, "problems"), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const tmp: DBProblem[] = [];
      querySnapshot.forEach(doc => {
        tmp.push(doc.data() as DBProblem);
      });
      setProblems(tmp);
      setLoadingProblems(false);
    }
    getProblems();
  }, [setLoadingProblems]);

  return problems;
};