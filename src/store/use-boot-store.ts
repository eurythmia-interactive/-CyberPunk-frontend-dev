import { create } from 'zustand';

interface BootStore {
  isBooted: boolean;
  isBooting: boolean;
  bootProgress: number;
  setBooted: (booted: boolean) => void;
  setBooting: (booting: boolean) => void;
  setBootProgress: (progress: number) => void;
  reset: () => void;
}

export const useBootStore = create<BootStore>((set) => ({
  isBooted: false,
  isBooting: false,
  bootProgress: 0,
  setBooted: (booted) => set({ isBooted: booted, isBooting: !booted }),
  setBooting: (booting) => set({ isBooting: booting }),
  setBootProgress: (progress) => set({ bootProgress: progress }),
  reset: () => set({ isBooted: false, isBooting: false, bootProgress: 0 }),
}));
