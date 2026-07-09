import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  // Showcase detail renders standalone (no layout sidebar) — matches original Golem DS
  {
    path: 'showcase/:slug',
    loadComponent: () => import('./pages/showcase/showcase-detail.page').then(m => m.ShowcaseDetailPage),
  },
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
        path: 'line-basic-chart',
        loadComponent: () => import('./pages/line-basic-chart/line-basic-chart.page').then(m => m.LineBasicChartPage),
      },
      {
        path: 'stacked-bar-chart',
        loadComponent: () => import('./pages/stacked-bar-chart/stacked-bar-chart.page').then(m => m.StackedBarChartPage),
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
      {
        path: 'showcase',
        loadComponent: () => import('./pages/showcase/showcase.page').then(m => m.ShowcasePage),
      },
    ],
  },
];
