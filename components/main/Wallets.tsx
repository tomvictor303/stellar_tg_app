'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/utils/app-store';

import { useToast } from '@/contexts/ToastContext';

export default function WalletTodo() {
  const showToast = useToast();
  const { wallets, addWallet, removeWallet, toggleComplete } = useAppStore();
  const [newWallet, setNewWallet] = useState('');

  // Validate XLM Wallet Address
  const isValidStellarAddress = (address: string) => /^G[A-Z2-7]{55}$/.test(address);

  // Handle Add Wallet
  const handleAddWallet = () => {
    if (!isValidStellarAddress(newWallet)) {
      showToast('Invalid Stellar wallet address!', 'error');
      return;
    }
    addWallet(newWallet);
    setNewWallet('');
    showToast('Wallet address added!', 'success');
  };
  
  return (
    
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#1d2025] rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-16 pb-36">
              <div className="relative">
                {/** BEGIN page_content */}                
                <h1 className="text-lg text-center font-bold mb-4">XLM Wallet To-Do List</h1>

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
                <ul className="mt-4 space-y-2">
                  {wallets.map((wallet) => (
                    <li
                      key={wallet.id}
                      className={`flex items-center justify-between p-2 rounded-lg ${wallet.completed ? 'bg-gray-600' : 'bg-gray-700'}`}
                    >
                      <span className={`truncate ${wallet.completed ? 'line-through text-gray-400' : ''}`}>{wallet.address}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => toggleComplete(wallet.id)}
                          className={`px-3 py-1 rounded-lg ${wallet.completed ? 'bg-yellow-500' : 'bg-blue-500'}`}
                        >
                          {wallet.completed ? 'Undo' : 'Done'}
                        </button>
                        <button onClick={() => removeWallet(wallet.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                          ❌
                        </button>
                      </div>
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
