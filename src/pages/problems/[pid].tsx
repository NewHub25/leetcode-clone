import Topbar from "@/components/topbar/topbar";
import Workspace from "@/components/workspace/workspace";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <div>
      <Topbar problemPage={true} />
      <Workspace />
    </div>
  );
};
export default ProblemPage;
