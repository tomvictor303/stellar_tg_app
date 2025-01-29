'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/utils/app-store';
import { useToast } from '@/contexts/ToastContext';
import Trash from '@/icons/Trash';

export default function WalletTodo() {
  const showToast = useToast();
  const { wallets, addWallet, removeWallet } = useAppStore();
  const [newWallet, setNewWallet] = useState('');
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);

  // Validate XLM Wallet Address
  const isValidStellarAddress = (address: string) => /^G[A-Z2-7]{55}$/.test(address);

  // Handle Add Wallet
  const handleAddWallet = () => {
    if (!isValidStellarAddress(newWallet)) {
      showToast('Invalid Stellar wallet address!', 'error');
      return;
    }

    if (wallets.some(wallet => wallet.address === newWallet)) {
      showToast('Wallet address already added!', 'error');
      return;
    }

    addWallet(newWallet);
    setNewWallet('');
    showToast('Wallet address added!', 'success');
  };

  // Handle Select Wallet
  const handleSelectWallet = (walletId: string) => {
    setSelectedWalletId(walletId === selectedWalletId ? null : walletId);
  };

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#1d2025] rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-16 pb-36">
              <div className="relative">
                {/** BEGIN page_content */}
                <h1 className="text-lg text-center font-bold mb-4">Your Stellar Wallets</h1>

                {/* Add Wallet Input */}
                <div className="flex items-center bg-gray-800 p-2 rounded-lg">
                  <input
                    type="text"
                    className="w-full bg-transparent text-white outline-none px-2"
                    placeholder="Enter XLM Wallet Address"
                    value={newWallet}
                    onChange={(e) => setNewWallet(e.target.value)}
                  />
                  <button onClick={handleAddWallet} className="bg-green-500 text-white px-4 py-1 rounded-lg ml-2">
                    Add
                  </button>
                </div>

                {/* Wallet List */}
                <ul className="mt-4 space-y-4">
                  {wallets.map((wallet) => (
                    <li key={wallet.id} className="flex items-center justify-between space-x-2">
                      {/* Select Wallet */}
                      <span
                        onClick={() => handleSelectWallet(wallet.id)}
                        className={`truncate p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedWalletId === wallet.id ? 'bg-green-900 text-white' : 'bg-gray-700'
                        }`}
                      >
                        {wallet.address}
                      </span>
                      <button onClick={() => removeWallet(wallet.id)} className="bg-red-500 text-white p-4 rounded-lg">
                        <Trash />
                      </button>
                    </li>
                  ))}
                </ul>
                {/** END page_content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
