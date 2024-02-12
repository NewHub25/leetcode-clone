import React from "react";
import { type Problem } from "@/utils/types/problem";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import useGetCurrentProblem from "@/hooks/use-get-current-problem";
import RectangleSkeleton from "./../../skeletons/rectangle-skeleton";
import CircleSkeleton from "./../../skeletons/circle-skeleton";
import useGetUsersDataOnProblem from "@/hooks/use-get-users-data-on-problem";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";

type ProblemDescriptionProps = {
  problem: Problem;
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const { currentProblem, loading, problemDifficultyClass } =
    useGetCurrentProblem(problem.id);
  const { liked, disliked, solved, starred, setData } =
    useGetUsersDataOnProblem(problem.id);
  const [user] = useAuthState(auth);

  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like a problem", {
        position: "top-left",
        theme: "dark",
      });
      return;
    }
  };

  return (
    <div className="bg-dark-layer-1">
      {/* TAB */}
      <div className="flex h-11 w-full items-center pt-2 bg-dark-layer-2 text-white overflow-x-hidden">
        <div
          className={
            "bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"
          }
        >
          Description
        </div>
      </div>

      <div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
        <div className="px-5">
          {/* Problem heading */}
          <div className="w-full">
            <div className="flex space-x-4">
              <div className="flex-1 mr-2 text-lg text-white font-medium">
                {problem.title}
              </div>
            </div>
            {!loading && currentProblem && (
              <div className="flex items-center mt-3">
                <div
                  className={`${problemDifficultyClass} inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
                >
                  {currentProblem.difficulty}
                </div>
                <div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s">
                  <BsCheck2Circle />
                </div>
                <div
                  className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6"
                  onClick={handleLike}
                >
                  {liked && <AiFillLike className="text-dark-blue-s" />}
                  {!liked && <AiFillLike />}
                  <span className="text-xs">{currentProblem.likes}</span>
                </div>
                <div className="flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-dark-gray-6">
                  <AiFillDislike />
                  <span className="text-xs">{currentProblem.dislikes}</span>
                </div>
                <div className="cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-dark-gray-6 ">
                  <TiStarOutline />
                </div>
              </div>
            )}
            {loading && (
              <div className="mt-3 flex space-x-2">
                <RectangleSkeleton />
                <CircleSkeleton />
                <RectangleSkeleton />
                <RectangleSkeleton />
                <CircleSkeleton />
              </div>
            )}

            {/* Problem Statement(paragraphs) */}
            <div className="text-white text-sm">
              <div
                dangerouslySetInnerHTML={{ __html: problem.problemStatement }}
              />
            </div>

            {/* Examples */}
            <div className="mt-4">
              {problem.examples.map((example, index) => {
                return (
                  <div key={example.id}>
                    <p className="font-medium text-white ">
                      Example {index + 1}:
                    </p>
                    {example.img && (
                      <img
                        className="mt-3"
                        src={example.img}
                        alt={`Example ${example.id}`}
                      />
                    )}
                    <div className="example-card">
                      <pre>
                        <strong className="text-white">Input:</strong>{" "}
                        {example.inputText}
                        <br />
                        <strong>Output:</strong> {example.outputText}
                        <br />
                        {example.explanation && (
                          <>
                            <strong>Explanation:</strong> {example.explanation}
                          </>
                        )}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Constraints */}
            <div className="my-5 pb-8">
              <div className="text-white text-sm font-medium">Constraints:</div>
              <ul className="text-white ml-5 list-disc">
                {
                  <div
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                  />
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProblemDescription;
