import { Field } from '../field/field-model';
import { Inventory} from '..//inventory/inventory.model';
import { Animal } from '../animal/animal.model';

export interface GameState { 
  money: number;
  time: Date;
  fields: Field[];
  inventory: Inventory;
  ranchSize: number;
  animals: Animal[];
}
