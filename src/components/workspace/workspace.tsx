import React from "react";
import Split from "react-split";
import ProblemDescription from "./problem-description/problem-description";

type WorkspaceProps = {};

const Workspace: React.FC<WorkspaceProps> = () => {
  return (
    <Split className="split" minSize={0}>
      <ProblemDescription />
      <div>Code editor gonna be here</div>
    </Split>
  );
};
export default Workspace;
