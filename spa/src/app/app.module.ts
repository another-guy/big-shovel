import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appEffects } from './app.effects';
import { appReducers } from './app.reducers';
import { BuildComponent } from './dashboard/build.component';
import { ChartTypeSelectorComponent } from './dashboard/chart-type-selector/chart-type-selector.component';
import { DotsPipe } from './dashboard/dots/dots.pipe';
import { GraphOptionsComponent } from './dashboard/graph-options/graph-options.component';
import { GraphComponent } from './dashboard/graph/graph.component';
import { HelpLinkComponent } from './dashboard/help-link/help-link.component';
import { LogDbQueryResultsComponent } from './dashboard/log-db-query-results/log-db-query-results.component';
import { LogEntriesComponent } from './dashboard/log-entries/log-entries.component';
import { LogEntryListComponent } from './dashboard/log-entry-list/log-entry-list.component';
import { MetricTypeSelectorComponent } from './dashboard/metric-type-selector/metric-type-selector.component';
import { TimeseriesComponent } from './dashboard/timeseries/timeseries.component';
import { MaterialModules } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    BuildComponent,
    GraphComponent,
    LogDbQueryResultsComponent,
    LogEntryListComponent,
    ChartTypeSelectorComponent,
    MetricTypeSelectorComponent,
    GraphOptionsComponent,
    TimeseriesComponent,
    LogEntriesComponent,
    HelpLinkComponent,
    DotsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),

    // @angular/material
    ...MaterialModules,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
