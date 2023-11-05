import { ModalDeleteComponent } from './../../components/modal-delete/modal-delete.component';
import { Subscription } from 'rxjs';
import { GenericPagination } from './../../shared/generic.pagination';
import { Marcas } from 'src/app/marcas/marca';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { MarcasService } from '../marcas.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-marcas',
  templateUrl: './lista-marcas.component.html',
  styleUrls: ['./lista-marcas.component.css'],
  providers: [NgbActiveModal],
})
export class ListaMarcasComponent implements OnInit, OnDestroy {
  pagination: GenericPagination = new GenericPagination();
  marcas: Marcas = [];
  filterName: string = '';
  loading: boolean = false;
  isErroAlert: boolean = false;
  errorMessage: string = 'Erro';

  sub: Subscription[] = [];

  constructor(private service: MarcasService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.carregaPagina(this.pagination.pgNo);
  }

  deletar(uuid: string, index: number) {
    this.loading = true;
    this.sub.push(
      this.service.deleteById(uuid).subscribe(
        () => {
          this.marcas.splice(index, 1);
        },
        (error) => {
          this.hasError(error.error.message);
          this.loading = false;
        },
        () => (this.loading = false)
      )
    );
  }

  filtrar() {
    if (this.filterName.length < 2) {
      this.carregaPagina(this.pagination.pgNo);
    } else {
      this.sub.push(
        this.service.filter(this.filterName, this.pagination).subscribe(
          (data) => {
            this.marcas = data.content;
            this.pagination.total = data.totalElements;
            this.loading = false;
          },
          (error) => {
            this.hasError(error.error.message);
            this.loading = false;
          }
        )
      );
    }
  }

  carregaPagina(pgNo: number) {
    if (this.filterName === '') {
      this.loading = true;
      this.sub.push(
        this.service.getAll(pgNo, this.pagination.size).subscribe(
          (data) => {
            this.marcas = data.content;
            this.pagination.total = data.totalElements;
          },
          (error) => {
            if (error.error.message === undefined) {
              this.hasError(
                'Erro ao carregar a página. Verifique sua conexão.'
              );
            } else {
              console.log(error);
              this.hasError(error.error.message);
            }
            this.loading = false;
          },
          () => (this.loading = false)
        )
      );
    }
  }

  openDeleteModal(nome: string, uuid: string, index: number) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.name = nome;
    modalRef.result.then((response) => {
      if (response) {
        this.deletar(uuid, index);
      }
    });
  }

  hasError(error: string) {
    if (error === '' || error === undefined) {
      error = 'Erro ao tentar realizar a operação. Por favor, tente novamente.';
    }
    this.errorMessage = error;
    this.isErroAlert = error !== '' ? true : false;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
