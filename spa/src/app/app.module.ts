import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appEffects } from './app.effects';
import { appReducers } from './app.reducers';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraphComponent } from './dashboard/graph/graph.component';
import { LogDbQueryResultsComponent } from './dashboard/log-db-query-results/log-db-query-results.component';
import { LogEntryListComponent } from './dashboard/log-entry-list/log-entry-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphComponent,
    LogDbQueryResultsComponent,
    LogEntryListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
