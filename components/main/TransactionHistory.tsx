'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/utils/app-store';
import { useToast } from '@/contexts/ToastContext';
import Trash from '@/icons/Trash';
import { triggerHapticFeedback } from '@/utils/ui';
import { getXLMOneLevel, STELLAR_ASSET_CODE, STELLAR_ISSUER_ADDRESS, XLMOneLevel } from '@/utils/consts';
import { getTokenBalance } from '@/utils/custom';
import { dailyReward } from '@/images';
import Image, { StaticImageData } from 'next/image';

interface TransactionHistoryProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function TransactionHistory({ currentView, setCurrentView }: TransactionHistoryProps) {
  const showToast = useToast();
  const { getSelectedWalletAddress } = useAppStore();
  const [selectedWalletAddress, setSelectedWalletAddress] = useState<string | null>(null);
  const [tokenBalance, setTokenBalance] = useState<number | null>(null);
  const [userLevel, setUserLevel] = useState<XLMOneLevel | null>(null);

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
    setUserLevel(getXLMOneLevel(Number(tokenBalance)));
  };
  // END initial_load_logic

  const isLoaded: boolean = tokenBalance !== null ;
  const isInsufficientBalance: boolean = isLoaded && userLevel === null;
  
  return (
    <div className="bg-black flex justify-center min-h-screen">
      <div className="w-full bg-black text-white font-bold flex flex-col max-w-xl">
        <div className="flex-grow mt-4 bg-[#f3ba2f] rounded-t-[40px] relative top-glow z-0">
          <div className="mt-[2px] bg-[#1d2025] rounded-t-[38px] h-full overflow-y-auto no-scrollbar">
            <div className="px-6 pt-12 pb-24">
              <div className="relative">
                {/** BEGIN page_content */}
                {isLoaded ? (
                  <>
                    {/** BEGIN after_web3_loaded */}
                    {Number(tokenBalance) < 1000 ? (
                      <>
                        {/** BEGIN insufficient_balance_warning */}
                        <div className="flex items-center justify-center p-3 mt-4">
                          <div className="bg-yellow-500 text-black text-center p-3 rounded-lg border border-yellow-700 shadow-md">
                            <h1 className="text-2xl font-bold animate-pulse">Insufficient Balance</h1>
                            <p className="text-base mt-1">Please charge more</p>
                          </div>
                        </div>
                        {/** END insufficient_balance_warning */}
                      </>
                    ) : (
                      <>
                        {/** BEGIN normal_view_sufficient_holdings */}
                        <div className="flex flex-col items-center text-center">
                          {/* Vault Image */}
                          <Image src={dailyReward} alt="Base Gift" className="w-32 h-32 mb-4 drop-shadow-xl animate-pulse" />
                          {/* Rewards History */}
                          <h1 className="text-lg font-bold text-green-400 drop-shadow-md mb-4">Rewards History</h1>

                          <ul className="text-left w-full max-w-sm">
                            {[
                              { date: "Jan 30, 2025", amount: "500 XLM", type: "Daily Reward" },
                              { date: "Jan 29, 2025", amount: "1200 XLM", type: "Referral Bonus" },
                              { date: "Jan 28, 2025", amount: "800 XLM", type: "Tier Upgrade Reward" },
                              { date: "Jan 27, 2025", amount: "300 XLM", type: "Daily Reward" },
                              { date: "Jan 26, 2025", amount: "1000 XLM", type: "Special Event Bonus" },
                            ].map((reward, index, array) => (
                              <div key={index}>
                                <li className="flex justify-between items-center p-2">
                                  <div>
                                    <p className="text-yellow-300 text-sm">{reward.date}</p>
                                    <p className="text-white text-xs">{reward.type}</p>
                                  </div>
                                  <span className="text-green-400 font-semibold">{reward.amount}</span>
                                </li>
                                {index !== array.length - 1 && (
                                  <hr className="border-t border-yellow-500 opacity-40 my-2" />
                                )}
                              </div>
                            ))}
                          </ul>
                        </div>
                        {/** END normal_view_sufficient_holdings */}
                      </>
                    )}
                    {/** END after_web3_loaded */}
                  </>
                ) : (
                  <>
                    <h1 className="text-xl text-center mt-4">Loading ...</h1>
                  </>
                )}
                {/** END page_content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
