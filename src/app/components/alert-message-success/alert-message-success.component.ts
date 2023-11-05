import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-message-success',
  templateUrl: './alert-message-success.component.html',
  styleUrls: ['./alert-message-success.component.css'],
})
export class AlertMessageSuccessComponent implements OnInit {
  @Input() message: string = '';
  @Input() destaq: string = '';
  constructor() {}

  ngOnInit(): void {}
}
