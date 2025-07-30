import { Item } from '../../entities/item/item.model';

export interface ShopItem extends Item{
    price: number; // 購買價格
    sellPrice: number; // 販售價格
}