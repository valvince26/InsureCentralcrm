import { create } from 'zustand';

type PopupType = 'alert' | 'confirm' | 'prompt' | null;

interface PopupState {
  isOpen: boolean;
  type: PopupType;
  title: string;
  message: string;
  defaultValue: string;
  resolve: ((value: any) => void) | null;
}

interface UiStore extends PopupState {
  showAlert: (message: string, title?: string) => Promise<void>;
  showConfirm: (message: string, title?: string) => Promise<boolean>;
  showPrompt: (message: string, title?: string, defaultValue?: string) => Promise<string | null>;
  closePopup: (value: any) => void;
}

const initialState: PopupState = {
  isOpen: false,
  type: null,
  title: '',
  message: '',
  defaultValue: '',
  resolve: null,
};

export const useUiStore = create<UiStore>((set, get) => ({
  ...initialState,

  showAlert: (message, title = 'Alert') => {
    return new Promise<void>((resolve) => {
      set({ isOpen: true, type: 'alert', title, message, defaultValue: '', resolve });
    });
  },

  showConfirm: (message, title = 'Confirm') => {
    return new Promise<boolean>((resolve) => {
      set({ isOpen: true, type: 'confirm', title, message, defaultValue: '', resolve });
    });
  },

  showPrompt: (message, title = 'Input Required', defaultValue = '') => {
    return new Promise<string | null>((resolve) => {
      set({ isOpen: true, type: 'prompt', title, message, defaultValue, resolve });
    });
  },

  closePopup: (value: any) => {
    const { resolve } = get();
    set({ ...initialState });
    if (resolve) resolve(value);
  },
}));
