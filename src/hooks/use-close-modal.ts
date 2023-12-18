import { authModalState } from '@/atoms/auth-modal-atom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

export default function useCloseModal() {
  const setAuthModal = useSetRecoilState(authModalState);

  const closeModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false, type: 'login' }));
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return closeModal;
}