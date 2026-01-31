import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CoDonutChartComponent } from './co-donut-chart.component';

@NgModule({
  declarations: [CoDonutChartComponent],
  imports: [CommonModule, NgApexchartsModule],
  exports: [CoDonutChartComponent],
})
export class CoDonutChartModule {}
