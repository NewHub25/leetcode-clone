export type UserDataType = {
  uid: string;
  email: string | null;
  displayName: string;
  createdAt: number;
  updatedAt: number;
  likedProblems: string[];
  dislikedProblems: string[];
  solvedProblems: string[];
  starredProblems: string[];
  avatar_url: string[];
};