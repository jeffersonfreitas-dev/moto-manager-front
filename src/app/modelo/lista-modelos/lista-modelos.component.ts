import { ModeloService } from './../modelo.service';
import { Modelos } from './../modelo';
import { Component, OnInit } from '@angular/core';
import { GenericPagination } from 'src/app/shared/generic.pagination';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';

@Component({
  selector: 'app-lista-modelos',
  templateUrl: './lista-modelos.component.html',
  styleUrls: ['./lista-modelos.component.scss']
})
export class ListaModelosComponent implements OnInit {
  pagination: GenericPagination = new GenericPagination();
  modelos: Modelos = [];
  filterName: string = '';
  loading: boolean = true;
  isErroAlert: boolean = false;
  errorMessage: string = 'Erro';

  sub: Subscription[] = [];

  constructor(private service: ModeloService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.carregaPagina(this.pagination.pgNo);
  }

  deletar(uuid: string, index: number) {
    this.loading = true;
    this.sub.push(
      this.service.deleteById(uuid).subscribe(
        () => {
          this.modelos.splice(index, 1);
          this.carregaPagina(this.pagination.pgNo);
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
            this.modelos = data.content;
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
            this.modelos = data.content;
            this.pagination.total = data.totalElements;
          },
          (error) => {
            if (error.error.message === undefined) {
              this.hasError(
                'Erro ao carregar a página. Verifique sua conexão.'
              );
            } else {
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
