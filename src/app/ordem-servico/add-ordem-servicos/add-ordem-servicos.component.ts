import { UtilsDate } from './../../shared/UtilsDates';

import { ClientesService } from './../../clientes/clientes.service';
import { MecanicoService } from './../../mecanicos/mecanico.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdemServicoService } from '../ordem-servico.service';
import { Mecanicos } from 'src/app/mecanicos/mecanico';
import { Veiculos } from 'src/app/veiculos/veiculos';
import { OrdemServicoCreate } from '../entities/ordem-servico-create';
import { ClienteSimples, ClientesSimples } from 'src/app/clientes/cliente';

@Component({
  selector: 'app-add-ordem-servicos',
  templateUrl: './add-ordem-servicos.component.html',
})
export class AddOrdemServicosComponent implements OnInit {
  ordemServico = new OrdemServicoCreate();
  listMecanicos: Mecanicos = [];
  isSuccessAlert = false;
  isErroAlert = false;
  alertMensagem = '';
  loading: boolean = true;
  listClientes: ClientesSimples = [];
  nomeClienteSelecionado: string = '';
  clienteSelecionado!: ClienteSimples;
  pesqNomeCliente: string = '';
  veiculosClienteSelecionado: Veiculos = [];
  mostrarVeiculos: boolean = false;

  sub: Subscription[] = [];

  constructor(
    private service: OrdemServicoService,
    private mecanicoService: MecanicoService,
    private clienteService: ClientesService
  ) {
    this.fillSelectMecanicos();
    this.fillSelectMecanicos();
  }

  ngOnInit(): void {}

  buscarVeiculosClienteSelecionado() {
    this.loading = true;
    this.sub.push(
      this.clienteService
        .getVeiculosByCliente(this.clienteSelecionado.uuid)
        .subscribe(
          (data) => {
            this.veiculosClienteSelecionado = data;
            this.loading = false;
            this.mostrarVeiculos = true;
          },
          (error) => {
            this.veiculosClienteSelecionado = [];
            this.loading = false;
            this.mostrarVeiculos = false;
            this.showError(error.error.message);
          }
        )
    );
  }

  fillSelectMecanicos() {
    this.loading = true;
    this.sub.push(
      this.mecanicoService.getAll(1, 100).subscribe(
        (data) => {
          this.listMecanicos = data.content;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.showError(
            'Erro ao preencher o componente de mecânicos. Verifique sua conexão e tente novamente!'
          );
        }
      )
    );
  }

  create() {
    this.loading = true;
    const data = UtilsDate.formatData(this.ordemServico.data);
    this.ordemServico.data = data;
    this.sub.push(
      this.service.create(this.ordemServico).subscribe(
        (data) => {
          this.showSuccess(data.codigo);
          this.novo();
          this.loading = false;
        },
        (error) => {
          this.showError(error.error.message);
          this.loading = false;
        }
      )
    );
  }

  onBuscarCliente(nome: string) {
    if (nome.length >= 2) {
      this.loading = true;
      this.sub.push(
        this.clienteService.findByNome(nome).subscribe(
          (data) => {
            this.listClientes = data;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
            this.showError(error.error.message);
          }
        )
      );
    } else {
      this.listClientes = [];
    }
  }

  onOpenModalPesquisaCliente() {
    this.listClientes = [];
    this.pesqNomeCliente = '';
  }

  onSelectCliente(cliente: any) {
    this.clienteSelecionado = cliente;
    this.ordemServico.cliente = cliente.uuid;
    this.nomeClienteSelecionado = cliente.nome;
    this.buscarVeiculosClienteSelecionado();
  }

  onSelectVeiculo(veiculo: string) {
    this.ordemServico.veiculo = veiculo;
  }

  novo() {
    this.ordemServico = new OrdemServicoCreate();
    this.veiculosClienteSelecionado = [];
    this.pesqNomeCliente = '';
    this.mostrarVeiculos = false;
  }

  onCloseModalPesquisa() {
    this.pesqNomeCliente = '';
  }

  showError(error: string) {
    if (error === '' || error === undefined) {
      error = 'Erro ao tentar realizar a operação. Por favor, tente novamente.';
    }
    this.isErroAlert = true;
    this.isSuccessAlert = false;
    this.alertMensagem = error;
  }

  showSuccess(codigo: number) {
    this.isErroAlert = false;
    this.isSuccessAlert = true;
    this.alertMensagem = `Ordem de Servico nº ${codigo} salva com sucesso!`;
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }
}
