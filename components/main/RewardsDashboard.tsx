'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/utils/app-store';
import { useToast } from '@/contexts/ToastContext';
import Trash from '@/icons/Trash';
import { triggerHapticFeedback } from '@/utils/ui';
import { STELLAR_ASSET_CODE, STELLAR_ISSUER_ADDRESS } from '@/utils/consts';
import { getTokenBalance } from '@/utils/custom';

interface RewardsDashboardProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function RewardsDashboard({ currentView, setCurrentView }: RewardsDashboardProps) {
  const showToast = useToast();
  const { getSelectedWalletAddress } = useAppStore();
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);

  // BEGIN initial_load_logic
  const handleViewChange = (view: string) => {
    console.log('Attempting to change view to:', view);
    if (typeof setCurrentView === 'function') {
      try {
        triggerHapticFeedback(window);
        setCurrentView(view);
        console.log('View change successful');
      } catch (error) {
        console.error('Error occurred while changing view:', error);
      }
    } else {
      console.error('setCurrentView is not a function:', setCurrentView);
    }
  };

  useEffect(() => {
    let swa = getSelectedWalletAddress();
    if (!swa) {
      handleViewChange('wallets');
      return;
    }
    setSelectedWalletAddress(swa);
  }, [getSelectedWalletAddress]);

  useEffect(() => {
    load_data();
  }, [selectedWalletAddress])

  const load_data = async () => {
    if (!selectedWalletAddress) { return ;}

    const tokenBalance = await getTokenBalance(selectedWalletAddress, STELLAR_ASSET_CODE, STELLAR_ISSUER_ADDRESS);
    setTokenBalance(Number(tokenBalance));
  };
  // END initial_load_logic

  const isLoaded: boolean = tokenBalance !== null;
  
  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#1d2025] rounded-t-[46px] h-full overflow-y-auto no-scrollbar">
            <div className="px-4 pt-16 pb-36">
              <div className="relative">
                {/** BEGIN page_content */}
                { isLoaded ? (<>
                  {/** BEGIN after_web3_loaded */}
                  <h1 className="text-2xl text-center mt-4">{selectedWalletAddress}</h1>
                  <h1 className="text-2xl text-center mt-4">{tokenBalance}</h1>
                  {/** BEGIN after_web3_loaded */}
                </>): (<>
                  <h1 className="text-2xl text-center mt-4">Loading ...</h1>
                </>)}
                {/** END page_content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
