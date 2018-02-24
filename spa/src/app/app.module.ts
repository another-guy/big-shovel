import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { appEffects } from './app.effects';
import { appReducers } from './app.reducers';
import { BuildModule } from './build/build.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffects),

    // Feature modules
    SharedModule,
    BuildModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
