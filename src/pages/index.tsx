import ProblemsTable from "@/components/problems-table/problems-table";
import Topbar from "@/components/topbar/topbar";
import { useState } from "react";
import LoadingSkeleton from "./../components/skeletons/loading-skeleton";
import useHasMounted from "@/hooks/use-has-mounted";

export default function Home() {
  const [loadingProblems, setLoadingProblems] = useState(true);
  const hasMounted = useHasMounted();

  if (!hasMounted) return null;

  return (
    <main className="bg-dark-layer-2 min-h-screen">
      <Topbar />
      <h1
        className="text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5"
      >
        &ldquo; QUALITY OVER QUANTITY &rdquo; 👇
      </h1>
      <div className="relative overflow-x-auto mx-auto px-6 pb-10">
        {loadingProblems && (
          <div className="animate-pulse max-w-[1200px] mx-auto sm:w-7/12 w-full">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
          </div>
        )}
        <table className="text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto">
          {!loadingProblems && (
            <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b ">
              <tr>
                <th scope="col" className="px-1 py-3 w-0 font-medium">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Difficulty
                </th>

                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 w-0 font-medium">
                  Solution
                </th>
              </tr>
            </thead>
          )}
          <ProblemsTable setLoadingProblems={setLoadingProblems} />
        </table>
      </div>
    </main>
  );
}
