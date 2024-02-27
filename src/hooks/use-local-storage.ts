import React, { useEffect, useState } from "react";

type LocalStorageType = [string, React.Dispatch<React.SetStateAction<string>>];

export default function useLocalStorage(key: string, initialValue: string): LocalStorageType {
  const [value, setValue] = useState<string>(() => {
    try {
      if (typeof window !== "undefined") {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initialValue;
      } else {
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};