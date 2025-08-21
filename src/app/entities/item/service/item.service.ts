import { Injectable } from '@angular/core';
import { ItemData } from '../item.data';
import { Item } from '../item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  
  getItems(): Item[] {
    return ItemData;
  }

  getItemById(id: number): Item | undefined {
    return ItemData.find(item => item.id === id);
  }

  getItemsByType(type: string): Item[] {
    return ItemData.filter(item => item.type === type);
  }
}
