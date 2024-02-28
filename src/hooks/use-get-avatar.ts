import { firestore } from "@/firebase/firebase";
import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type GetAvatarType = [string, React.Dispatch<React.SetStateAction<string>>];

export default function useGetAvatar(user: User | null | undefined): GetAvatarType {
  const [imageProfile, setImageProfile] = useState<string>("/avatar.png");

  useEffect(() => {
    const storedImage = localStorage.getItem("image-profile")
    if (storedImage) {
      setImageProfile(storedImage);
      return;
    }
    const getDataUserAvatar = async () => {
      if (!user) {
        return;
      }
      const userRef = doc(firestore, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const { avatar_url: [firstUrl] } = userSnap.data();
        return firstUrl as string;
      }
    };
    const setImage = async () => {
      try {
        const imageUrl = await getDataUserAvatar();
        if (!imageUrl) return;
        setImageProfile(imageUrl);
        localStorage.setItem("image-profile", imageUrl);
      } catch (error) {
        console.log(error);
      }
    };
    setImage();
  }, [user]);

  return [imageProfile, setImageProfile];
}