import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
    },
    {
        path: 'farm',
        loadComponent: () => import('./features/farm/farm-plot.component').then(m => m.FarmPlotComponent),
        title: 'Farm',
    },

];
