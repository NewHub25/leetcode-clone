import { auth, firestore } from "@/firebase/firebase";
import Link from "next/link";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/atoms/auth-modal-atom";
import Logout from "../buttons/logout";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BsList } from "react-icons/bs";
import Timer from "../timer/timer";
import { useRouter } from "next/router";
import { problems } from "@/utils/problems";
import ProfileModal from "../modals/profile-modal";
import useGetAvatar from "@/hooks/use-get-avatar";
import { doc, updateDoc } from "firebase/firestore";

type TopbarProps = {
  problemPage?: boolean;
};

const Topbar: React.FC<TopbarProps> = ({ problemPage }) => {
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [openModalProfile, setOpenModalProfile] = useState(false);
  const [imageProfile, setImageProfile] = useGetAvatar(user);

  const handleProblemChange = (isForward: boolean) => {
    const { order } = problems[router.query.pid as string];
    const listKeyProblems = Object.keys(problems);
    const nextProblemIndex =
      (order - 1 + (isForward ? +1 : -1)) % listKeyProblems.length;
    const nextProblemKey = listKeyProblems.at(nextProblemIndex);
    router.push(`/problems/${nextProblemKey}`);
  };
  const changeAvatarDatabase = async (url: string) => {
    const userRef = doc(firestore, "users", user!.uid);
    await updateDoc(userRef, {
      avatar_url: [url],
    });
  };

  return (
    <>
      {openModalProfile && (
        <ProfileModal
          imageProfile={imageProfile}
          setImageProfile={setImageProfile}
          setOpenModalProfile={setOpenModalProfile}
          changeAvatarDatabase={changeAvatarDatabase}
        />
      )}
      <nav className="relative flex h-[50px] w-full shrink-0 items-center px-5 bg-dark-layer-1 text-dark-gray-7">
        <div
          className={`flex w-full items-center justify-between ${
            problemPage ? "" : "max-w-[1200px] mx-auto"
          }`}
        >
          <Link href="/" className="h-[22px] flex-1">
            <Image src="/logo-full.png" alt="Logo" width={100} height={100} />
          </Link>
          {problemPage && (
            <div className="flex items-center gap-4 flex-1 justify-center">
              <div
                className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 w-8 h-8 cursor-pointer"
                onClick={() => handleProblemChange(false)}
              >
                <FaChevronLeft />
              </div>
              <Link
                href="/"
                className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
              >
                <div>
                  <BsList />
                </div>
                <p>Problem List</p>
              </Link>
              <div
                className="flex items-center justify-center rounded bg-dark-fill-3 hover:bg-dark-fill-2 w-8 h-8 cursor-pointer"
                onClick={() => handleProblemChange(true)}
              >
                <FaChevronRight />
              </div>
            </div>
          )}
          <div className="flex items-center space-x-4 flex-1 justify-end">
            <div>
              <a
                href="https://www.buymeacoffee.com/newhub25"
                target="_blank"
                rel="noreferrer"
                className="bg-dark-fill-3 py-1.5 px-3 cursor-pointer rounded text-brand-orange hover:bg-dark-fill-2"
              >
                Premium
              </a>
            </div>
            {!user && (
              <Link
                href="/auth"
                onClick={() => {
                  setAuthModalState({ isOpen: true, type: "login" });
                }}
              >
                <button className="bg-dark-fill-3 py-1 px-2 cursor-pointer rounded ">
                  Sign In
                </button>
              </Link>
            )}
            {user && problemPage && <Timer />}
            {user && (
              <div className="cursor-pointer group relative">
                <Image
                  src={imageProfile}
                  alt="user profile image"
                  className="rounded-full object-cover object-center"
                  width={35}
                  height={35}
                  onClick={() => setOpenModalProfile(true)}
                />
                <div
                  className="absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out"
                >
                  <p className="text-sm">{user.email}</p>
                </div>
              </div>
            )}
            {user && <Logout />}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Topbar;
