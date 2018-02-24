import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    ...MaterialModules,
  ],
  exports: [
    FormsModule,
    ...SharedDeclarations,
    ...MaterialModules,
  ],
  providers: [
  ],
})
export class SharedModule { }
