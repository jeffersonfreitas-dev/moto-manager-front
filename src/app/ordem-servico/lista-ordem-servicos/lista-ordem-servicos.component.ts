import { UtilsDate } from './../../shared/UtilsDates';
import { OrdensServicosToList } from './../entities/ordem-servico-list';
import { OrdemServicoService } from './../ordem-servico.service';
import { Component, OnInit } from '@angular/core';
import { GenericPagination } from 'src/app/shared/generic.pagination';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrdemServicoFiltro } from '../entities/ordem-servico-filtro';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';


@Component({
  selector: 'app-lista-ordem-servicos',
  templateUrl: './lista-ordem-servicos.component.html',
  styleUrls: ['./lista-ordem-servicos.component.css']
})
export class ListaOrdemServicosComponent implements OnInit {
  pagination: GenericPagination = new GenericPagination();
  ordensServicos: OrdensServicosToList = [];
  loading: boolean = true;
  isErroAlert: boolean = false;
  errorMessage: string = 'Erro';
  osfiltro: OrdemServicoFiltro = new OrdemServicoFiltro();
  temFiltroData: boolean = false;
  sub: Subscription[] = [];

  constructor(
    private service: OrdemServicoService,
    private modalService: NgbModal
  ) {
    this.filtrar();
  }

  ngOnInit(): void {}

  deletar(uuid: string, index: number) {
    this.loading = true;
    this.sub.push(
      this.service.deleteById(uuid).subscribe(
        () => {
          this.ordensServicos.splice(index, 1);
          this.filtrar();
          this.loading = false;
        },
        (error) => {
          this.hasError(error.error.message);
          this.loading = false;
        }
      )
    );
  }

  filtrar() {
    if (
      this.osfiltro.codigo !== '' ||
      this.osfiltro.placa.length > 2 ||
      this.osfiltro.nome.length > 2 ||
      this.osfiltro.status !== ''
    ) {
      this.pagination.pgNo = 1;
      this.realizarFiltro();
    }
  }

  realizarFiltro() {
    //this.loading = true;
    this.sub.push(
      this.service.filter(this.osfiltro, this.pagination).subscribe(
        (data) => {
          this.ordensServicos = data.content;
          this.pagination.total = data.totalElements;
          this.loading = false;
        },
        (error) => {
          this.hasError(error.error.message);
          this.onFecharModal();
          this.loading = false;
        }
      )
    );
  }

  carregaPagina(pgNo: number) {
    this.pagination.pgNo = pgNo;
    this.realizarFiltro(); 
  }

  openDeleteModal(nome: number, uuid: string, index: number) {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.name = nome;
    modalRef.result.then((response) => {
      if (response) {
        this.deletar(uuid, index);
      }
    });
  }

  onCancelarFiltroModalData() {
    this.onFecharModal();
    this.filtrar();
  }

  onFecharModal() {
    this.osfiltro.datafinal = '';
    this.osfiltro.datainicial = '';
    this.temFiltroData = false;
  }

  onConfirmarModalData() {
    this.osfiltro.datafinal = UtilsDate.formatData(this.osfiltro.datafinal);
    this.osfiltro.datainicial = UtilsDate.formatData(this.osfiltro.datainicial);
    this.filtrar();
    this.temFiltroData = true;
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
