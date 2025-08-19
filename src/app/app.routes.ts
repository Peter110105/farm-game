import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FarmComponent } from './features/farm/farm.component';
import { ShopComponent } from './features/shop/shop.component';
import { RanchComponent } from './features/ranch/ranch.component';

export const routes: Routes = [
  { 
    path: 'farm', 
    component: FarmComponent,
    title: 'Farm'
  },
  { 
    path: 'shop', 
    component: ShopComponent,
    title: 'Shop'
  },
  {
    path: 'ranch',
    component: RanchComponent,
    title: 'Ranch'
  },
  {
    path: '**',
    redirectTo: 'farm',
    pathMatch: 'full'
  }
];