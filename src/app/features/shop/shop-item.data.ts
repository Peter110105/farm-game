import { ShopItem } from './shop-item.model';

export const ShopItemData: ShopItem[] = [
    {
        name: '小麥',
        icon: '🌾',
        type: 'vegetable',
        quantity: 1,
        price: 0,
        sellPrice: 2,
    },
    {
        name: '玉米',
        icon: '🌽',
        type: 'vegetable',
        quantity: 1,
        price: 0,
        sellPrice: 10,
    },
    {
        name: '胡蘿蔔',
        icon: '🥕',
        type: 'vegetable',
        quantity: 1,
        price: 0,   // 商店不賣成品
        sellPrice: 20, // 玩家賣給商店的價格
    },
    {
        name: '蘋果',
        icon: '🍎',
        type: 'fruit',
        quantity: 1,
        price: 0,
        sellPrice: 15,
    },
    {
        name: '草莓',
        icon: '🍓',
        type: 'fruit',
        quantity: 1,
        price: 0,
        sellPrice: 20,
    },
    {
        name: '鋤頭',
        icon: '🔨',
        type: 'tool',
        quantity: 1,
        price: 50,
        sellPrice: 10,
    }
];
