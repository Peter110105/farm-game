export interface Quest {
  id: number;                     // 任務ID
  title: string;                  // 任務名稱
  description: string;            // 任務描述
  preconditions : Precondition; // 任務前置條件
  targets: QuestTarget[]; // 任務目標（物品ID: 數量）
  reward: { 
    money?: number; 
    items?: { itemId: number; quantity: number }[]  
  }; // 獎勵
  completed: boolean; // 任務是否完成
  isRepeatable?: boolean;      // 是否可重複完成
  rewardClaimed: boolean;  // 獎勵是否已領取
}

// 收集任務 (Collect)       例：收集 10 顆小麥、5 顆雞蛋。
// 交付任務 (Deliver)       例：交付 10 顆小麥。
// 購買任務 (Buy)           例：購買 5 道具。
// 銷售任務 (Sell)          例：賣出 3 顆小麥。
// 生產任務 (Produce)       例：生產 3 份牛奶。
// 金錢任務 (Wealth)        例：存到 100 金幣。
// 進度任務 (Progression)   例：達成背包升級 Lv2。

export interface QuestTarget {
  type: 'plant' | 'collect'| 'deliver' | 'buy' | 'sell' | 'produce' | 'wealth' | 'progress'; // 任務目標類型
  itemId?: number;
  target: number;
  current: number;
}

export interface Precondition{ 
    requiredQuests?: number[];      // 必須完成哪些任務
    minLevel?: number;              // 玩家最小等級
    requiredItems?: { itemId: number; quantity: number }[]; // 必須擁有物品
    unlockDate?: Date; // 遊戲遊玩時間
}