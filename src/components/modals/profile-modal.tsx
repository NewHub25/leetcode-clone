import Image from "next/image";
import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

type ProfileModalProps = {
  imageProfile: string;
  setOpenModalProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setImageProfile: React.Dispatch<React.SetStateAction<string>>;
  changeAvatarDatabase: (url: string) => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  imageProfile,
  setImageProfile,
  setOpenModalProfile,
  changeAvatarDatabase,
}) => {
  const [imageOnlyView, setImageOnlyView] = useState(imageProfile);
  const [inputUrl, setInputUrl] = useState("");

  const handleView = () => {
    setImageOnlyView(inputUrl);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(e.target.value);
  };
  const handleAccept = () => {
    setImageProfile(imageOnlyView);
    localStorage.setItem("image-profile", imageOnlyView);
    setOpenModalProfile(false);
    changeAvatarDatabase(imageOnlyView);
  };

  return (
    <nav className="fixed inset-0 flex items-center justify-center z-50">
      <section
        className="bg-slate-900 opacity-70 top-0 left-0 w-full h-full absolute"
        onClick={() => setOpenModalProfile(false)}
      ></section>
      <article className="w-2/3 aspect-square max-w-lg p-7 relative">
        <div className="border-2 border-dark-yellow bg-dark-layer-2 h-full w-full p-4 rounded-xl relative">
          <h2 className="bg-slate-500 w-fit p-1 rounded-md text-slate-100 mb-4">
            Change image profile here{" "}
            <CgProfile className="inline" fontSize="25" />
          </h2>
          <IoCloseCircle
            fontSize="30"
            className="cursor-pointer absolute top-2 right-2 text-dark-yellow"
            onClick={() => setOpenModalProfile(false)}
          />
          <Image
            className="w-3/5 aspect-square max-w-sm mx-auto rounded-full object-cover object-center"
            src={imageOnlyView}
            width={300}
            height={300}
            alt="ProfileView"
          />
          <div className="flex justify-between p-4 px-10 w-full">
            <input
              onChange={handleChange}
              value={inputUrl}
              type="text"
              className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2
            bg-gray-600 border-gray-500 placeholder-gray-400 text-white w-full"
              placeholder="Enter URL of image profile"
            />
            <button
              onClick={handleView}
              type="button"
              className="bg-dark-blue-s py-1 px-2 cursor-pointer rounded-md ml-0.5 font-medium text-slate-100"
            >
              View
            </button>
          </div>
          <footer className="absolute bottom-4 w-[calc(100%-2rem)] px-10 flex justify-between">
            <button
              type="button"
              className="bg-slate-300 py-1 px-2 cursor-pointer rounded-md"
              onClick={() => setOpenModalProfile(false)}
            >
              Decline
            </button>
            <button
              type="button"
              className="bg-emerald-500 py-1 px-2 cursor-pointer rounded-md"
              onClick={handleAccept}
            >
              Accept
            </button>
          </footer>
        </div>
      </article>
    </nav>
  );
};
export default ProfileModal;
