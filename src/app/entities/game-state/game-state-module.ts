import { Field } from '../field/field-module';
import { Inventory} from '..//inventory/inventory.model';

export interface GameState { 
  money: number;
  time: Date;
  fields: Field[];
  inventory: Inventory;
}
