import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

interface Wallet {
  id: string;
  address: string;
  completed: boolean;
}

interface AppState {
  wallets: Wallet[];
  addWallet: (address: string) => void;
  removeWallet: (id: string) => void;
  toggleComplete: (id: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      wallets: [],
      addWallet: (address) =>
        set((state) => ({
          wallets: [...state.wallets, { id: nanoid(), address, completed: false }],
        })),
      removeWallet: (id) =>
        set((state) => ({
          wallets: state.wallets.filter((wallet) => wallet.id !== id),
        })),
      toggleComplete: (id) =>
        set((state) => ({
          wallets: state.wallets.map((wallet) =>
            wallet.id === id ? { ...wallet, completed: !wallet.completed } : wallet
          ),
        })),
    }),
    { name: 'wallet-store' }
  )
);
