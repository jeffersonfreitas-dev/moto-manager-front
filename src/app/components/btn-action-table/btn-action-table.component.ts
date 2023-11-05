import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'btn-action-table',
  templateUrl: './btn-action-table.component.html',
  styleUrls: ['./btn-action-table.component.css'],
})
export class BtnActionTableComponent implements OnInit {
  constructor() {}

  @Input() public title!: string;
  @Input() public type: string = '';
  @Input() public icon: string = '';

  ngOnInit(): void {}
}
