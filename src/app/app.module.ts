import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CoDonutChartModule } from './components/co-donut-chart/co-donut-chart.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoDonutChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
