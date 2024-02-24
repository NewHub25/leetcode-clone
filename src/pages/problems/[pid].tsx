import React from "react";
import Topbar from "@/components/topbar/topbar";
import Workspace from "@/components/workspace/workspace";
import { type Problem } from "@/utils/types/problem";
import { problems } from "@/utils/problems";
import useHasMounted from "@/hooks/use-has-mounted";

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  const hasMounted = useHasMounted();
  
  if (!hasMounted) return null;

  return (
    <div>
      <Topbar problemPage />
      <Workspace problem={problem} />
    </div>
  );
};
export default ProblemPage;

// Fetch the local data
// SSG
// getStaticPaths => It creates the dynamic routes
export async function getStaticPaths() {
  const paths = Object.keys(problems).map((key) => ({ params: { pid: key } }));
  return { paths, fallback: false };
}

// getStaticProps => It fetches the data
export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problems[pid];

  if (!problem) {
    return { notFound: true };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: { problem },
  };
}
