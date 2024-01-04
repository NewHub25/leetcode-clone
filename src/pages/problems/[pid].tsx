import Topbar from "@/components/topbar/topbar";
import React from "react";

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <div>
      <Topbar problemPage={true} />
    </div>
  );
};
export default ProblemPage;
