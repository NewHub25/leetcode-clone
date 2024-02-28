import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";

type ProfileModalProps = {
  imageProfile: string;
  setOpenModalProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setImageProfile: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileModal: React.FC<ProfileModalProps> = ({
  imageProfile,
  setImageProfile,
  setOpenModalProfile,
}) => {
  return (
    <nav className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="bg-slate-900 opacity-70 top-0 left-0 w-full h-full absolute"
        onClick={() => setOpenModalProfile(false)}
      ></div>
      <div className="w-1/2 aspect-square max-w-xl p-5 relative outline-dashed">
        <IoClose
          fontSize="35"
          className="cursor-pointer absolute top-5 right-5"
          onClick={() => setOpenModalProfile(false)}
        />
        <Image
          className="w-1/2 mx-auto"
          src={imageProfile}
          width={300}
          height={300}
          alt="ProfileView"
        />
      </div>
    </nav>
  );
};
export default ProfileModal;
