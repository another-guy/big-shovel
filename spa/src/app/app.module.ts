import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
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
    StoreDevtoolsModule.instrument({
      name: 'BIG SHOVEL',
      maxAge: 25,
      
      // HACK: https://github.com/ngrx/platform/issues/825#issuecomment-368058930
      actionSanitizer: action => JSON.parse(JSON.stringify(action)),
    }),

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
