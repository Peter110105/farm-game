import { Routes } from '@angular/router';
import { FarmComponent } from './features/farm/farm.component';
import { ShopComponent } from './features/shop/shop.component';
import { RanchComponent } from './features/ranch/ranch.component';
import { SeasonDisplayComponent } from './features/Season-display/season-display.component';

export const routes: Routes = [
  {
    path: 'farm',
    component: FarmComponent,
    title: 'Farm',
  },
  {
    path: 'shop',
    component: ShopComponent,
    title: 'Shop',
  },
  {
    path: 'ranch',
    component: RanchComponent,
    title: 'Ranch',
  },
  {
    path: 'season-card',
    component: SeasonDisplayComponent,
    title: 'season',
  },
  {
    path: '**',
    redirectTo: 'farm',
    pathMatch: 'full',
  },
];
