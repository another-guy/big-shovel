import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-graph-options-enquirer',
  templateUrl: './graph-options-enquirer.component.html',
  styleUrls: ['./graph-options-enquirer.component.css']
})
export class GraphOptionsEnquirerComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

}
