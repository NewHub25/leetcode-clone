import React from "react";
import Split from "react-split";
import ProblemDescription from "./problem-description/problem-description";
import Playground from "./playground/playground";
import { type Problem } from "@/utils/types/problem";

type WorkspaceProps = {
  problem:Problem
};

const Workspace: React.FC<WorkspaceProps> = ({problem}) => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <div className="bg-dark-fill-2">
        <Playground />
      </div>
    </Split>
  );
};
export default Workspace;
