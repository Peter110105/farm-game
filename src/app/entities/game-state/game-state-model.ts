import { Animal } from '../animal/animal.model';
import { Field } from '../field/field-model';
import { Inventory} from '..//inventory/inventory.model';
import { Quest } from '../quest/quest.model';

export interface GameState { 
  money: number;
  time: Date;
  fields: Field[];
  inventory: Inventory;
  ranchSize: number;
  animals: Animal[];
  activeQuests: Quest[];
  completedQuests: Quest[];
  availableQuests: Quest[];
}
