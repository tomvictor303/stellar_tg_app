'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/utils/app-store';
import { useToast } from '@/contexts/ToastContext';
import Trash from '@/icons/Trash';
import { id2item } from '@/utils/custom';

export default function RewardsDashboard() {
  const showToast = useToast();
  const { getSelectedWalletAddress } = useAppStore();
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string | null>(null);

  useEffect(() => {
    setSelectedWalletAddress(getSelectedWalletAddress());
  }, [getSelectedWalletAddress]);

  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#1d2025] rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-16 pb-36">
              <div className="relative">
                {/** BEGIN page_content */}
                <h1 className="text-2xl text-center mt-4">{selectedWalletAddress}</h1>
                {/** END page_content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
