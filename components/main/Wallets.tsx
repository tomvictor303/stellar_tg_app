'use client';

import React, { useState } from 'react';
import { useAppStore } from '@/utils/app-store';
import { useToast } from '@/contexts/ToastContext';
import Trash from '@/icons/Trash';

export default function WalletTodo() {
  const showToast = useToast();
  const { wallets, addWallet, removeWallet, selectedWalletId, setSelectedId } = useAppStore();
  const [newWallet, setNewWallet] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false); // Close modal after adding
    showToast('Wallet address added!', 'success');
  };

  // Handle Select Wallet
  const handleSelectWallet = (walletId: string) => {
    setSelectedId(selectedWalletId === walletId ? null : walletId);
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

                {/* Add Wallet Button */}
                <div className="text-center mb-4 px-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-[#272a2f] text-white border-2 border-dashed border-green-500 px-6 py-3 rounded-xl"
                  >
                    + Add Wallet
                  </button>
                </div>

                {/* Horizontal Line */}
                <hr className="border-gray-600 mb-4 mx-4" />

                {/* Wallet List */}
                <ul className="mt-4 space-y-4">
                  {wallets.map((wallet) => (
                    <li key={wallet.id} className="flex items-center space-x-2">
                      {/* Select Wallet (Dynamic Width) */}
                      <span
                        onClick={() => handleSelectWallet(wallet.id)}
                        className={`flex items-center w-auto min-w-0 flex-grow p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedWalletId === wallet.id ? 'bg-green-900 text-white' : 'bg-gray-700'
                        }`}
                      >
                        {/* Custom Styled Radio Button */}
                        <div className="w-6 h-6 flex items-center justify-center rounded-full border-2 border-white mr-3">
                          {selectedWalletId === wallet.id && (
                            <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          {wallet.address.length > 18 ? `${wallet.address.slice(0, 18)} ...` : wallet.address}
                        </div>
                      </span>

                      {/* Delete Button (Fixed Width) */}
                      <button 
                        onClick={() => removeWallet(wallet.id)} 
                        className="flex-shrink-0 bg-red-500 text-white p-4 rounded-lg"
                      >
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

      {/* Wallet Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold text-white mb-4 text-center">Add Wallet</h2>

            {/* Input Field */}
            <input
              type="text"
              className="w-full bg-gray-700 text-white p-2 rounded-lg mb-4 outline-none"
              placeholder="Enter XLM Wallet Address"
              value={newWallet}
              onChange={(e) => setNewWallet(e.target.value)}
            />

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddWallet}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
