import { atom } from 'recoil'

type TypeAuthModalState = {
  isOpen: boolean,
  type: 'login' | 'register' | 'forgotPassword'
};
export type TypeAuthModalType = TypeAuthModalState['type']

const initialAuthModalState: TypeAuthModalState = {
  isOpen: false,
  type: 'login'
};

export const authModalState = atom<TypeAuthModalState>({
  key: 'authModalState',
  default: initialAuthModalState
});