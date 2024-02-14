import { firestore } from "@/firebase/firebase";
import { type DBProblem, type Problem } from "@/utils/types/problem";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useGetCurrentProblem(problemId: Problem['id']) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [problemDifficultyClass, setProblemDifficultyClass] = useState<string>("");

  useEffect(() => {
    // Get problem from DB
    const getCurrentProblem = async () => {
      setLoading(true);
      const docRef = doc(firestore, "problems", problemId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const problem = docSnap.data() as DBProblem;
        setCurrentProblem({ ...problem });
        setProblemDifficultyClass(
          problem.difficulty == 'Easy' ? 'bg-olive text-olive' : problem.difficulty == 'Medium' ? 'bg-yellow text-dark-yellow' : 'bg-dark-pink text-dark-pink'
        );
      }
      setLoading(false);
    };
    getCurrentProblem();
  }, [problemId]);

  return { currentProblem, setCurrentProblem, loading, problemDifficultyClass };
};