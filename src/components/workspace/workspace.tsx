import React, { useState } from "react";
import Split from "react-split";
import ProblemDescription from "./problem-description/problem-description";
import Playground from "./playground/playground";
import { type Problem } from "@/utils/types/problem";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/use-window-size";

type WorkspaceProps = {
  problem: Problem;
};

const Workspace: React.FC<WorkspaceProps> = ({ problem }) => {
  const [success, setSuccess] = useState(false);
  const { width, height } = useWindowSize();

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} />
      <div className="bg-dark-fill-2">
        <Playground problem={problem} setSuccess={setSuccess} />
        {success && (
          <Confetti
            tweenDuration={4000}
            gravity={0.3}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};
export default Workspace;
