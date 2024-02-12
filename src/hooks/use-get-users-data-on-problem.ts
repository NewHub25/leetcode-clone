import { auth, firestore } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function useGetUsersDataOnProblem(problemId: string) {
  const [data, setData] = useState({
    liked: false,
    disliked: false,
    starred: false,
    solved: false
  });
  const [user] = useAuthState(auth);

  useEffect(() => {
    const getUsersDataOnProblem = async () => {
      const userRef = doc(firestore, "users", user!.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        const {
          likedProblems,
          dislikedProblems,
          solvedProblems,
          starredProblems,
        } = data;
        setData({
          liked: likedProblems.includes(problemId),
          disliked: dislikedProblems.includes(problemId),
          solved: solvedProblems.includes(problemId),
          starred: starredProblems.includes(problemId),
        })
      }
    };
    if (user) getUsersDataOnProblem();
    
    return () => setData({
      liked: false,
      disliked: false,
      starred: false,
      solved: false
    });
  }, [problemId, user]);

  return { ...data, setData };
};