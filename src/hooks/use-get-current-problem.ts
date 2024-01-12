import { type DBProblem, type Problem } from "@/utils/types/problem";
import { useEffect, useState } from "react";

export default function useGetCurrentProblem(problemId: Problem['id']) {
  const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
  useEffect(() => {
  }, []);

  return;
};