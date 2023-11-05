import { Component, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'modal-delete',
  templateUrl: './modal-delete.component.html',
})
export class ModalDeleteComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  @Input() name = '';
  ngOnInit(): void {}

  close() {
    this.activeModal.close(false);
  }

  confirmar() {
    this.activeModal.close(true);
  }
}
