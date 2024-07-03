import { create } from "zustand";

export type ModalType = "createServer";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false, // Initial state of the modal
  onOpen: (type) => set({ type, isOpen: true }), // Open the modal
  onClose: () => set({ type: null, isOpen: false }), // Close the modal
}));
