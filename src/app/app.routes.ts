import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FarmComponent } from './features/farm/farm.component';
import { ShopComponent } from './features/shop/shop.component';
import { RanchComponent } from './features/ranch/ranch.component';

export const routes: Routes = [
  
  { 
    path: 'home', 
    component: HomeComponent,
    title: 'Home'
  },
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
    path: 'welcome', 
    loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) }
];