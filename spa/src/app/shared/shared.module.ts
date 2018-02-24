import { NgModule } from '@angular/core';

import { MaterialModules } from './material.module-list';
import { SharedComponents } from './shared.component-list';
import { SharedPipes } from './shared.pipe-list';

const SharedDeclarations = [
  ...SharedComponents,
  ...SharedPipes,
];

@NgModule({
  declarations: SharedDeclarations,
  imports: [
    // @angular/material
    ...MaterialModules,
  ],
  exports: [
    ...SharedDeclarations,
    // @angular/material
    ...MaterialModules,
  ],
  providers: [
  ],
})
export class SharedModule { }
