// utils/consts.ts

/**
 * This project was developed by Nikandr Surkov.
 * You may not use this code if you purchased it from any source other than the official website https://nikandr.com.
 * If you purchased it from the official website, you may use it for your own projects,
 * but you may not resell it or publish it publicly.
 * 
 * Website: https://nikandr.com
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * Telegram: https://t.me/nikandr_s
 * Telegram channel for news/updates: https://t.me/clicker_game_news
 * GitHub: https://github.com/nikandr-surkov
 */

import { crystal1, crystal2, crystal3, crystal4, crystal5, crystal6, crystal7, crystal8, crystal9, mainCharacter } from "@/images";
import { StaticImageData } from "next/image";

export const ALLOW_ALL_DEVICES = true;

export const WALLET_MANIFEST_URL = "https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmcFgnfXoiNtp8dvy25xA9hMEjz5AzugTuPQNTHQMTw9Tf";

export interface LevelData {
  name: string;
  minPoints: number;
  bigImage: StaticImageData;
  smallImage: StaticImageData;
  color: string;
  friendBonus: number;
  friendBonusPremium: number;
}

export const LEVELS: LevelData[] = [
  {
    name: "Ice Cube Intern",
    minPoints: 0,
    bigImage: mainCharacter,
    smallImage: crystal1,
    color: "#2adaf8",
    friendBonus: 0,
    friendBonusPremium: 0,
  },
  {
    name: "Frosty Freelancer",
    minPoints: 5000,
    bigImage: mainCharacter,
    smallImage: crystal2,
    color: "#d64767",
    friendBonus: 20000,
    friendBonusPremium: 25000,
  },
  {
    name: "Chilly Consultant",
    minPoints: 25000,
    bigImage: mainCharacter,
    smallImage: crystal3,
    color: "#e9c970",
    friendBonus: 30000,
    friendBonusPremium: 50000,
  },
  {
    name: "Glacial Manager",
    minPoints: 100000,
    bigImage: mainCharacter,
    smallImage: crystal4,
    color: "#73e94b",
    friendBonus: 40000,
    friendBonusPremium: 75000,
  },
  {
    name: "Subzero Supervisor",
    minPoints: 1000000,
    bigImage: mainCharacter,
    smallImage: crystal5,
    color: "#4ef0ba",
    friendBonus: 60000,
    friendBonusPremium: 100000,
  },
  {
    name: "Arctic Executive",
    minPoints: 2000000,
    bigImage: mainCharacter,
    smallImage: crystal6,
    color: "#1a3ae8",
    friendBonus: 100000,
    friendBonusPremium: 150000,
  },
  {
    name: "Polar CEO",
    minPoints: 10000000,
    bigImage: mainCharacter,
    smallImage: crystal7,
    color: "#902bc9",
    friendBonus: 250000,
    friendBonusPremium: 500000,
  },
  {
    name: "Tundra Tycoon",
    minPoints: 50000000,
    bigImage: mainCharacter,
    smallImage: crystal8,
    color: "#fb8bee",
    friendBonus: 500000,
    friendBonusPremium: 1000000,
  },
  {
    name: "Iceberg Mogul",
    minPoints: 100000000,
    bigImage: mainCharacter,
    smallImage: crystal9,
    color: "#e04e92",
    friendBonus: 1000000,
    friendBonusPremium: 2000000,
  }
];

export const DAILY_REWARDS = [
  500,
  1000,
  2500,
  5000,
  15000,
  25000,
  100000,
  500000,
  1000000,
  5000000
];

export const MAXIMUM_INACTIVE_TIME_FOR_MINE = 3*60*60*1000; // 3 hours in milliseconds

export const MAX_ENERGY_REFILLS_PER_DAY = 6;
export const ENERGY_REFILL_COOLDOWN = 60 * 60 * 1000; // 1 hour in milliseconds
export const TASK_WAIT_TIME = 60 * 60 * 1000; // 1 hour in milliseconds

export const REFERRAL_BONUS_BASE = 5000;
export const REFERRAL_BONUS_PREMIUM = 25000;


// Multitap
export const multitapUpgradeBasePrice = 1000;
export const multitapUpgradeCostCoefficient = 2;

export const multitapUpgradeBaseBenefit = 1;
export const multitapUpgradeBenefitCoefficient = 1;

// Energy
export const energyUpgradeBasePrice = 1000;
export const energyUpgradeCostCoefficient = 2;

export const energyUpgradeBaseBenefit = 500;
export const energyUpgradeBenefitCoefficient = 1;

// Mine (profit per hour)
export const mineUpgradeBasePrice = 1000;
export const mineUpgradeCostCoefficient = 1.5;

export const mineUpgradeBaseBenefit = 100;
export const mineUpgradeBenefitCoefficient = 1.2;

// Stellar token
export const STELLAR_ASSET_CODE = "XLMONE";
export const STELLAR_ISSUER_ADDRESS = "GBT5GHVRNDFJLLTOO3KV7PUTRDEJJZDMLK5JPAW7E6SCJUANZ6Z76Z4P";

export interface XLMOneLevel {
  level: number;
  start: number;
  end: number;
  cryptoRewardPercent: number;
  metalRewardPercent: number;
  dailyReturnPercent: number;
  bonusXLMPostICO?: number;
  isBenefitFromPrevious: boolean;
  additionalBenefits?: string[];
}

export const XLMOneLevels: XLMOneLevel[] = [
  {
    level: 1,
    start: 1000,
    end: 5000,
    cryptoRewardPercent: 6000,
    metalRewardPercent: 12000,
    dailyReturnPercent: 5,
    isBenefitFromPrevious: false,
  },
  {
    level: 2,
    start: 5001,
    end: 20000,
    cryptoRewardPercent: 9000,
    metalRewardPercent: 21000,
    dailyReturnPercent: 10,
    bonusXLMPostICO: 750000,
    isBenefitFromPrevious: true,
  },
  {
    level: 3,
    start: 20001,
    end: 50000,
    cryptoRewardPercent: 18000,
    metalRewardPercent: 33000,
    dailyReturnPercent: 20,
    bonusXLMPostICO: 2250000,
    isBenefitFromPrevious: true,
  },
  {
    level: 4,
    start: 50001,
    end: 100000,
    cryptoRewardPercent: 39000,
    metalRewardPercent: 54000,
    dailyReturnPercent: 30,
    bonusXLMPostICO: 3750000,
    isBenefitFromPrevious: true,
    additionalBenefits: ["Exclusive Stellar NFTs"],
  },
  {
    level: 5,
    start: 100001,
    end: 200000,
    cryptoRewardPercent: 60000,
    metalRewardPercent: 75000,
    dailyReturnPercent: 40,
    bonusXLMPostICO: 7500000,
    isBenefitFromPrevious: true,
    additionalBenefits: ["Priority Staking Opportunities"],
  },
  {
    level: 6,
    start: 200001,
    end: 500000,
    cryptoRewardPercent: 90000,
    metalRewardPercent: 120000,
    dailyReturnPercent: 50,
    bonusXLMPostICO: 15000000,
    isBenefitFromPrevious: true,
    additionalBenefits: ["Free Stellar-Based Airdrops"],
  },
  {
    level: 7,
    start: 500001,
    end: 1000000,
    cryptoRewardPercent: 120000,
    metalRewardPercent: 180000,
    dailyReturnPercent: 60,
    bonusXLMPostICO: 30000000,
    isBenefitFromPrevious: true,
    additionalBenefits: ["Access to Advanced DeFi Tools"],
  },
  {
    level: 8,
    start: 1000001,
    end: 2000000,
    cryptoRewardPercent: 150000,
    metalRewardPercent: 240000,
    dailyReturnPercent: 70,
    bonusXLMPostICO: 150000000,
    isBenefitFromPrevious: true,
    additionalBenefits: ["Voting Power in wXLM & Stellar Governance", "Access to Pre-Launch Tokens"],
  },
  {
    level: 9,
    start: 2000001,
    end: 5000000,
    cryptoRewardPercent: 225000,
    metalRewardPercent: 375000,
    dailyReturnPercent: 80,
    bonusXLMPostICO: 300000000,
    isBenefitFromPrevious: true,
    additionalBenefits: ["Lifetime Free Stellar Transactions"],
  },
  {
    level: 10,
    start: 5000001,
    end: 100000000,
    cryptoRewardPercent: 300000,
    metalRewardPercent: 450000,
    dailyReturnPercent: 100,
    bonusXLMPostICO: 2000000000,
    isBenefitFromPrevious: true,
  },
];

export const getXLMOneLevel = (userBalance: number): XLMOneLevel | null => {
  const v = XLMOneLevels.find(level => userBalance >= level.start && userBalance <= level.end)
  return v ? v : null;
};