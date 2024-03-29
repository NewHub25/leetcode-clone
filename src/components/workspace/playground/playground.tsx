import React, { useEffect, useState } from "react";
import PreferenceNav from "./preference-nav/preference-nav";
import Split from "react-split";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./editor-footer/editor-footer";
import { type Problem } from "@/utils/types/problem";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "@/firebase/firebase";
import { toast } from "react-toastify";
import { problems } from "@/utils/problems";
import { useRouter } from "next/router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { type ISetting } from "@/utils/types/settings";
import useLocalStorage from "@/hooks/use-local-storage";
import useGetUsersDataOnProblem from "@/hooks/use-get-users-data-on-problem";

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
  let [userCode, setUserCode] = useState(problem.starterCode);
  const [user] = useAuthState(auth);
  const {
    query: { pid },
  } = useRouter();
  const [fontSize, _] = useLocalStorage("lcc-font-size", "16px");
  const [setting, setSetting] = useState<ISetting>({
    settingModalIsOpen: false,
    fontSize: fontSize,
    dropdownIsOpen: false,
  });
  const { solved } = useGetUsersDataOnProblem(problem.id);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please login to submit your code", {
        position: "top-center",
        theme: "dark",
        autoClose: 3000,
      });
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb: any = new Function(`return ${userCode}`)();
      const handler = problems[pid as string].handlerFunction;

      if (typeof handler === "function") {
        const success = handler(cb);
        if (success) {
          toast.success("Congrats! All tests passed!", {
            position: "top-center",
            autoClose: 3000,
            theme: "dark",
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          // Save the problem id in db
          const useRef = doc(firestore, "users", user.uid);
          await updateDoc(useRef, {
            solvedProblems: arrayUnion(pid),
            updatedAt: Date.now(),
          });
          setSolved(true);
        }
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.message.startsWith(
          "AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:"
        )
      ) {
        toast.error("Oops! One or more tests failed", {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
          theme: "dark",
        });
      }
    }
  };
  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pid, user, problem.starterCode]); 

  useEffect(() => {
    if (!solved) {
      setSolved(false);
    }
  }, [solved, setSolved]);

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-hidden">
      <PreferenceNav setting={setting} setSetting={setSetting} />
      <Split
        className="h-[calc(100vh-94px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <ReactCodeMirror
            value={userCode}
            onChange={onChange}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: setting.fontSize }}
          />
        </div>
        <div className="w-full px-5 overflow-auto">
          {/* Testcase heading */}
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-sm font-medium leading-5 text-white">
                Test cases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>

          <div className="flex">
            {problem.examples.map((example, index) => {
              return (
                <div
                  key={example.id}
                  className="mr-2 items-start mt-2"
                  onClick={() => setActiveTestCaseId(index)}
                >
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div
                      className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
                    ${
                      activeTestCaseId === index
                        ? "text-white cursor-default"
                        : "text-gray-500 hover:bg-dark-fill-2"
                    }
                    `}
                    >
                      Case {index + 1}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="font-semibold my-4">
            <p className="text-sm font-medium mt-4 text-white">Input: </p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-sm font-medium mt-4 text-white">Output: </p>
            <div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-dark-fill-3 border-transparent text-white mt-2">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <EditorFooter handleSubmit={handleSubmit} />
    </div>
  );
};
export default Playground;
