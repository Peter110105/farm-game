import { FarmPlot } from '../farm-plot/farm-plot-module';
import { Inventory} from '..//inventory/inventory.model';

export interface GameState { 
  money: number;
  time: Date;
  field: FarmPlot[];
  inventory: Inventory;
}
