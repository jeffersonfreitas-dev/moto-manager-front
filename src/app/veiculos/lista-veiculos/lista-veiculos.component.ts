import { VeiculosService } from './../veiculos.service';
import { Veiculo } from './../veiculos';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-veiculos',
  templateUrl: './lista-veiculos.component.html',
  styleUrls: ['./lista-veiculos.component.css'],
})
export class ListaVeiculosComponent implements OnInit {
  veiculos: Veiculo[] = [];
  size: number = 10;
  pgNo: number = 1;
  total: number = 0;
  placa: string = '';

  constructor(private _service: VeiculosService) {}

  ngOnInit(): void {
    // this.findAll();
  }

  findAll() {
    //   return this._service.findAll().subscribe(
    //     (data) => {
    //       this.veiculos = data;
    //     },
    //     (error) => {
    //       alert('Ocorreu um erro');
    //     }
    //   );
  }

  delete(uuid: string, index: number) {
    //   if (confirm('Deseja realmente excluir este veiculo?')) {
    //     this._service.deleteById(uuid).subscribe(
    //       (data) => {
    //         this.veiculos.splice(index, 1);
    //         this.carregaPagina(this.pgNo);
    //       },
    //       (error) => {
    //         alert(error.error.message);
    //       }
    //     );
    //   }
  }

  busca() {
    //   if (this.placa === '') {
    //     this.carregaPagina(this.pgNo);
    //   } else {
    //     this._service
    //       .filter(this.placa, this.pgNo, this.size)
    //       .subscribe((data) => {
    //         this.veiculos = data.content;
    //         this.total = data.totalElements;
    //       });
    //   }
  }

  carregaPagina(pgNo: any) {
    //   if (this.placa === '') {
    //     this._service.findAllPagination(pgNo, this.size).subscribe((data) => {
    //       this.veiculos = data.content;
    //       this.total = data.totalElements;
    //     });
    //   } else {
    //     this.busca();
    //   }
  }
}
