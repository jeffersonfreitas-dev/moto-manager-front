import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css'],
})
export class AlertMessageComponent implements OnInit {
  @Input() message: string = '';
  @Input() destaq: string = '';
  constructor() {}

  ngOnInit(): void {}
}
