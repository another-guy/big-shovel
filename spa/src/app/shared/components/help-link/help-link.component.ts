import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'app-help-link',
  templateUrl: './help-link.component.html',
  styleUrls: ['./help-link.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpLinkComponent {

  @Input() tooltipText: string = "Help";
  @Input() ref: string;

}
