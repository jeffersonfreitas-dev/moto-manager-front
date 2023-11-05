import { OrdemServico } from './../../ordem-servico/entities/ordem-servico';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-movimentacao',
  templateUrl: './movimentacao.component.html',
})
export class MovimentacaoComponent implements OnInit {
  @Input() idComponent: string = '';
  @Input() ordemServico!: OrdemServico;
  @Input() totalServicos!: number;
  @Input() totalProdutos!: number;
  @Input() totalGeral!: number;
  @Input() status!: number;

  @Output() confirmarEvent = new EventEmitter<OrdemServico>();

  statusEmMovimentacao: string = '';
  exibeFormaPgtoPrazo: boolean = false;
  exibeFormaPgtoVista: boolean = true;
  subtotal: number = 0.0;
  descontos: number = 0.0;
  acrescimos: number = 0.0;
  constructor() {}

  ngOnInit(): void {
    this.statusEmMovimentacao = this.ordemServico.status;
  }

  fecharOffCanvasFechamento() {
    // this.statusEmMovimentacao = this.ordemServico.status;
    // this.descontos = 0;
    // this.subtotal = this.ordemServico.total;
  }

  confirmarMovimentacao() {
    // this.ordemServico.status = this.statusEmMovimentacao;
    // this.confirmarEvent.emit(this.ordemServico);
  }

  mudarStatus(status: string) {
    this.ordemServico.status = status;
  }

  selecionarTipoPgto(tipo: string) {
    // if (tipo === 'vista') {
    //   this.exibeFormaPgtoVista = true;
    //   this.exibeFormaPgtoPrazo = false;
    //   return;
    // }
    // if (tipo === 'prazo') {
    //   this.exibeFormaPgtoVista = false;
    //   this.exibeFormaPgtoPrazo = true;
    // }
  }

  setaValorDesconto(valor: string) {
    // let convert = '0';
    // if (valor !== '') {
    //   convert = valor.replace('.', '').replace(',', '.');
    // }
    // let dolar = parseFloat(convert);
    // this.subtotal = this.subtotal + this.descontos;
    // this.descontos = dolar;
    // this.ordemServico.totalDescontos = this.descontos;
    // this.subtotal = this.subtotal - this.descontos;
  }

  setaValorAcrescimo(valor: string) {
    // let convert = '0';
    // if (valor !== '') {
    //   convert = valor.replace('.', '').replace(',', '.');
    // }
    // let dolar = parseFloat(convert);
    // this.subtotal = this.subtotal - this.acrescimos;
    // this.acrescimos = dolar;
    // this.ordemServico.totalAcrescimos = this.acrescimos;
    // this.subtotal = this.subtotal + this.acrescimos;
  }
}
