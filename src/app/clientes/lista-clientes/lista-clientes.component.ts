import { ClientesService } from './../clientes.service';
import { Clientes, ClienteFiltro } from './../cliente';
import { Component, OnInit } from '@angular/core';
import { GenericPagination } from 'src/app/shared/generic.pagination';
import { Subscription } from 'rxjs';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css'],
})
export class ListaClientesComponent implements OnInit {
  pagination: GenericPagination = new GenericPagination();
  clientes: Clientes = [];
  filterName: string = '';
  filterPlaca: string = '';
  loading: boolean = true;
  isErroAlert: boolean = false;
  errorMessage: string = 'Erro';

  sub: Subscription[] = [];

  constructor(
    private service: ClientesService,
    private modalService: NgbModal
  ) {
    this.carregaPagina(this.pagination.pgNo);
  }

  ngOnInit(): void {}

  deletar(uuid: string, index: number) {
    this.loading = true;
    this.sub.push(
      this.service.deleteById(uuid).subscribe(
        () => {
          this.clientes.splice(index, 1);
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
    if (this.filterName.length < 2 && this.filterPlaca.length < 2) {
      this.carregaPagina(this.pagination.pgNo);
    } else {
      const filtro = new ClienteFiltro();
      filtro.nome = this.filterName;
      filtro.placa = this.filterPlaca;

      this.sub.push(
        this.service.filter(filtro, this.pagination).subscribe(
          (data) => {
            this.clientes = data.content;
            this.pagination.total = data.totalElements;
          },
          (error) => {
            this.hasError(error.error.message);
          }
        )
      );
    }
  }

  carregaPagina(pgNo: number) {
    if (this.filterName === '' && this.filterPlaca === '') {
      this.sub.push(
        this.service.getAll(pgNo, this.pagination.size).subscribe(
          (data) => {
            this.clientes = data.content;
            this.pagination.total = data.totalElements;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.hasError(error.error.message);
          }
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
