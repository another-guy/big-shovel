import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BuildComponents } from './build.component-list';

const BuildDeclarations = [
  ...BuildComponents,
];

@NgModule({
  declarations: BuildDeclarations,
  imports: [
    SharedModule,
  ],
  exports: [
    ...BuildDeclarations,
  ],
  providers: [
  ],
})
export class BuildModule { }
