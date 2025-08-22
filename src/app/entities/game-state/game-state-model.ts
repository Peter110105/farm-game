import { Animal } from '../animal/animal.model';
import { Field } from '../field/field-model';
import { Inventory} from '..//inventory/inventory.model';
import { Quest } from '../quest/quest.model';

export interface GameState { 
  money: number;
  time: Date;
  fields: Field[];
  farmLv: number;
  inventory: Inventory;
  animals: Animal[];
  ranchSize: number;
  ranchLv: number;
  activeQuests: Quest[];
  completedQuests: Quest[];
  availableQuests: Quest[];
}
