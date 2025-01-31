'use client';

import React, { useEffect, useState } from 'react';
import { useAppStore } from '@/utils/app-store';
import { useToast } from '@/contexts/ToastContext';
import Trash from '@/icons/Trash';
import { triggerHapticFeedback } from '@/utils/ui';
import { getXLMOneLevel, STELLAR_ASSET_CODE, STELLAR_ISSUER_ADDRESS, XLMOneLevel } from '@/utils/consts';
import { getTokenBalance } from '@/utils/custom';

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
                    <h1 className="text-lg font-bold text-yellow-400 drop-shadow-md">
                      Your XLMONE Holdings: <span className="text-green-400">{Number(tokenBalance).toFixed(0)}</span>
                    </h1>
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
                        <h1 className="text-lg font-bold text-green-500 mt-4 drop-shadow-md">
                          Your Tier Level: <span className="text-white">{userLevel?.level}</span>
                        </h1>
                        <h1 className="text-lg mt-6 text-center">Your Benefits From Tier</h1>
                        <div className="bg-gray-900 text-white p-6 mt-3 rounded-xl border-4 border-yellow-500 shadow-lg ring-2 ring-yellow-400">
                          <ul className="space-y-3">
                            <li className="flex items-top space-x-2">
                              <span className="text-yellow-400 text-lg">💰</span>
                              <p className="text-base font-semibold">
                                Crypto Reward: <br />
                                <span className="text-green-400">{Number(userLevel?.cryptoRewardPercent).toLocaleString()}%</span> in each Crypto Reward
                              </p>
                            </li>
                            <li className="flex items-top space-x-2">
                              <span className="text-yellow-400 text-lg">👑</span>
                              <p className="text-base font-semibold">
                                Precious Metals Reward: <br />
                                <span className="text-green-400">{Number(userLevel?.metalRewardPercent).toLocaleString()}%</span> in each Metal Reward
                              </p>
                            </li>
                            {userLevel?.isBenefitFromPrevious && (
                              <li className="text-gray-300 text-base">- All Previous Benefits from Lower Levels</li>
                            )}
                            {userLevel?.additionalBenefits?.map((benefit, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <span className="text-yellow-300 text-lg">⭐️</span>
                                <p className="text-base font-semibold">{benefit}</p>
                              </li>
                            ))}
                            <li className="flex items-top space-x-2">
                              <span className="text-pink-400 text-lg">💝</span>
                              <p className="text-base font-semibold">
                                Bonus: <br /> 
                                <span className="text-green-400">{Number(userLevel?.bonusXLMPostICO).toLocaleString()} XLM</span> post-ICO
                              </p>
                            </li>
                            <li className="flex items-center space-x-2">
                              <span className="text-blue-400 text-lg">💻</span>
                              <p className="text-base font-semibold">
                                Daily <span className="text-green-400">{Number(userLevel?.dailyReturnPercent).toLocaleString()}% XLM</span> Return
                              </p>
                            </li>
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
