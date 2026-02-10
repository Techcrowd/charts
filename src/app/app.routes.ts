import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'donut-chart', pathMatch: 'full' },
      {
        path: 'donut-chart',
        loadComponent: () => import('./pages/donut-chart/donut-chart.page').then(m => m.DonutChartPage),
      },
      {
        path: 'bar-chart',
        loadComponent: () => import('./pages/bar-chart/bar-chart.page').then(m => m.BarChartPage),
      },
      {
        path: 'column-chart',
        loadComponent: () => import('./pages/column-chart/column-chart.page').then(m => m.ColumnChartPage),
      },
      {
        path: 'value-performance-chart',
        loadComponent: () => import('./pages/value-performance-chart/value-performance-chart-page.component').then(m => m.ValuePerformanceChartPageComponent),
      },
      {
        path: 'panel-menu',
        loadComponent: () => import('./pages/panel-menu/panel-menu.page').then(m => m.PanelMenuPage),
      },
    ],
  },
];
