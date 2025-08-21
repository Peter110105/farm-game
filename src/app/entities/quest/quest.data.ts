import { Quest } from "./quest.model";

export const QuestData: Quest[] = [
  {
    id: 1,
    title: '種植小麥',
    description: '請種植9個小麥: 在種子列表中選擇小麥種子後，點擊土地完成種植。',
    preconditions: {
      
    },
    targets: [
      { type: 'plant', itemId: 1, target: 9, current: 0 }
    ],
    reward: {
      money: 50,
    },
    completed: false,
    isRepeatable: false,
    rewardClaimed: false
  },
  {
    id: 2,
    title: '收集小麥',
    description: '請收集9個小麥: 等待作物成熟後，點擊收割完成收集。',
    preconditions: {
      requiredQuests: [1]
    },
    targets: [
      { type: 'collect', itemId: 101, target: 9, current: 0 }
    ],
    reward: {
      money: 100,
      items: [{ itemId: 102, quantity: 1 }]
    },
    completed: false,
    isRepeatable: false,
    rewardClaimed: false
  },
  {
    id: 3,
    title: '出售小麥',
    description: '請出售9個小麥: 在商店中選擇小麥，點擊出售完成任務。',
    preconditions: {
      requiredQuests: [2]
    },
    targets: [
      { type: 'sell', itemId: 101, target: 9, current: 0 }
    ],
    reward: {
      money: 100,
      items: [{ itemId: 102, quantity: 1 }]
    },
    completed: false,
    isRepeatable: false,
    rewardClaimed: false
  },
  {
    id: 4,
    title: '購買小雞',
    description: '請購買1隻小雞: 在表單中點選牧場後，點擊購買小雞完成任務。',
    preconditions: {
      requiredQuests: [3]
    },
    targets: [
      { type: 'buy', itemId: 0, target: 1, current: 0 }
    ],
    reward: {
      money: 200,
    },
    completed: false,
    isRepeatable: false,
    rewardClaimed: false
  },
  {
    id: 5,
    title: '收集雞蛋，並賣掉',
    description: '請收集5個雞蛋，並賣掉: 小雞會自動長大，成為母雞後會自動產生資源(雞蛋)，將收集到的資源到商店售出。',
    preconditions: {
      requiredQuests: [4]
    },
    targets: [
      { type: 'collect', itemId: 100, target: 5, current: 0 },
      { type: 'sell', itemId: 100, target: 5, current: 0 }
    ],
    reward: {
      money: 100,
      items: [{ itemId: 102, quantity: 1 }]
    },
    completed: false,
    isRepeatable: false,
    rewardClaimed: false
  },
];