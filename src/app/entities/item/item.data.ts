import { Item} from './item.model';

export const ItemData: Item[] = [
    // === 種子類 ===
    {
        id: 1,
        name: '小麥種子',
        icon: '🌾',
        type: 'seed',
        price: 1,
        sellPrice: 0,
        displayOrder: 0,
        description: '基礎作物種子，成長快速。'
    },
    {
        id: 2,
        name: '玉米種子',
        icon: '🌽',
        type: 'seed',
        price: 5,
        sellPrice: 0,
        displayOrder: 1,
        description: '營養豐富的作物種子。'
    },
    {
        id: 3,
        name: '胡蘿蔔種子',
        icon: '🥕',
        type: 'seed',
        price: 8,
        sellPrice: 0,
        displayOrder: 2,
        description: '根莖類蔬菜種子。'
    },
    {
        id: 4,
        name: '蘋果種子',
        icon: '🍎',
        type: 'seed',
        price: 15,
        sellPrice: 0,
        displayOrder: 3,
        description: '水果樹種子，需要更長時間成長。'
    },
    {
        id: 5,
        name: '草莓種子',
        icon: '🍓',
        type: 'seed',
        price: 20,
        sellPrice: 0,
        displayOrder: 4,
        description: '甜美的漿果種子。'
    },
    {
        id: 6,
        name: '番茄種子',
        icon: '🍅',
        type: 'seed',
        price: 12,
        sellPrice: 0,
        displayOrder: 5,
        description: '多用途蔬菜種子。'
    },
    {
        id: 7,
        name: '馬鈴薯種子',
        icon: '🥔',
        type: 'seed',
        price: 6,
        sellPrice: 0,
        displayOrder: 6,
        description: '澱粉類作物種子。'
    },

    // === 農作物 ===
    {
        id: 101,
        name: '小麥',
        icon: '🌾',
        type: 'crop',
        price: 0,
        sellPrice: 2,
        displayOrder: 0,
        description: '基礎農作物，可用於製作麵粉。'
    },
    {
        id: 102,
        name: '玉米',
        icon: '🌽',
        type: 'crop',
        price: 0,
        sellPrice: 10,
        displayOrder: 1,
        description: '營養豐富的穀物。'
    },
    {
        id: 103,
        name: '胡蘿蔔',
        icon: '🥕',
        type: 'crop',
        price: 0,
        sellPrice: 15,
        displayOrder: 2,
        description: '富含維生素的根莖類蔬菜。'
    },
    {
        id: 104,
        name: '蘋果',
        icon: '🍎',
        type: 'crop',
        price: 0,
        sellPrice: 25,
        displayOrder: 3,
        description: '香甜的水果。'
    },
    {
        id: 105,
        name: '草莓',
        icon: '🍓',
        type: 'crop',
        price: 0,
        sellPrice: 30,
        displayOrder: 4,
        description: '鮮美的漿果。'
    },
    {
        id: 106,
        name: '番茄',
        icon: '🍅',
        type: 'crop',
        price: 0,
        sellPrice: 18,
        displayOrder: 5,
        description: '多用途蔬菜，可製作各種料理。'
    },
    {
        id: 107,
        name: '馬鈴薯',
        icon: '🥔',
        type: 'crop',
        price: 0,
        sellPrice: 12,
        displayOrder: 6,
        description: '澱粉豐富的塊莖作物。'
    },

    // === 動物產品 ===
    {
        id: 100,
        name: '雞蛋',
        icon: '🥚',
        type: 'produce',
        price: 0,
        sellPrice: 25,
        displayOrder: 0,
        description: '新鮮雞蛋，可用於烹飪。'
    },
    {
        id: 101,
        name: '牛奶',
        icon: '🥛',
        type: 'produce',
        price: 0,
        sellPrice: 50,
        displayOrder: 1,
        description: '新鮮牛奶，營養豐富。'
    },
    {
        id: 102,
        name: '羊毛',
        icon: '🧶',
        type: 'produce',
        price: 0,
        sellPrice: 60,
        displayOrder: 2,
        description: '柔軟的羊毛，可用於製作衣物。'
    },
    {
        id: 103,
        name: '蜂蜜',
        icon: '🍯',
        type: 'produce',
        price: 0,
        sellPrice: 80,
        displayOrder: 3,
        description: '甜美的天然蜂蜜。'
    },

    // === 加工食品 ===
    {
        id: 300,
        name: '麵粉',
        icon: '🍞',
        type: 'processed',
        price: 0,
        sellPrice: 5,
        displayOrder: 0,
        description: '由小麥加工而成的基礎食材。'
    },
    {
        id: 301,
        name: '起司',
        icon: '🧀',
        type: 'processed',
        price: 0,
        sellPrice: 120,
        displayOrder: 1,
        description: '由牛奶發酵製成的美味起司。'
    },
    {
        id: 302,
        name: '奶油',
        icon: '🧈',
        type: 'processed',
        price: 0,
        sellPrice: 80,
        displayOrder: 2,
        description: '由牛奶提煉而成的香濃奶油。'
    },
    {
        id: 303,
        name: '麵包',
        icon: '🍞',
        type: 'processed',
        price: 0,
        sellPrice: 15,
        displayOrder: 3,
        description: '由麵粉烘焙而成的基礎食品。'
    },
    {
        id: 304,
        name: '蛋糕',
        icon: '🍰',
        type: 'processed',
        price: 0,
        sellPrice: 200,
        displayOrder: 4,
        description: '精緻的甜點，需要多種食材製作。'
    },
    {
        id: 305,
        name: '果醬',
        icon: '🍓',
        type: 'processed',
        price: 0,
        sellPrice: 60,
        displayOrder: 5,
        description: '由水果熬煮而成的甜美果醬。'
    },
    {
        id: 306,
        name: '披薩',
        icon: '🍕',
        type: 'processed',
        price: 0,
        sellPrice: 180,
        displayOrder: 6,
        description: '美味的義式披薩。'
    },
    {
        id: 307,
        name: '優格',
        icon: '🥛',
        type: 'processed',
        price: 0,
        sellPrice: 70,
        displayOrder: 7,
        description: '由牛奶發酵製成的健康食品。'
    },
    {
        id: 308,
        name: '薯條',
        icon: '🍟',
        type: 'processed',
        price: 0,
        sellPrice: 35,
        displayOrder: 8,
        description: '由馬鈴薯製作的酥脆薯條。'
    },
    {
        id: 309,
        name: '番茄醬',
        icon: '🍅',
        type: 'processed',
        price: 0,
        sellPrice: 25,
        displayOrder: 9,
        description: '由番茄製作的萬用調味料。'
    },
];
