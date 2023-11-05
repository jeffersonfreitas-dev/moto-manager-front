import { OrdemServico } from '../entities/ordem-servico';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { OrdemServicoService } from '../ordem-servico.service';
import { Subscription } from 'rxjs';
import { ServicoService } from 'src/app/servicos/servicos.service';
import { Servico, Servicos } from 'src/app/servicos/servicos';
import { Produto, Produtos } from 'src/app/produto/produto';
import { ProdutoService } from 'src/app/produto/produto.service';
import { OrdemServicoItem } from '../entities/ordem-servico-item';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/components/modal-delete/modal-delete.component';
import { OrdemProdutoItem } from '../entities/ordem-produto-item';

@Component({
  selector: 'app-att-ordem-servicos',
  templateUrl: './att-ordem-servicos.component.html',
  styleUrls: ['./att-ordem-servicos.component.css']
})
export class AttOrdemServicosComponent implements OnInit {
  ordemServico: OrdemServico = new OrdemServico();
  @Output() pendencia = this.ordemServico.pendencias;

  errorMessage = '';
  isErroAlert: boolean = false;
  loading: boolean = true;
  statusEmMovimentacao: string = this.ordemServico.status;

  itemServico: OrdemServicoItem = new OrdemServicoItem();
  servicoSelecionado: Servico = new Servico();
  quantidadeInicialServico: number = 0.0;
  valorTotalItemServico: number = 0.0;
  valorInicialServico: number = 0.0;
  nomeServicoBusca: string = '';
  loadingModal: boolean = false;
  showCadastroServico = false;
  listServicos: Servicos = [];
  totalServicos: number = 0.0;

  itemProduto: OrdemProdutoItem = new OrdemProdutoItem();
  produtoSelecionado: Produto = new Produto();
  quantidadeInicialProduto: number = 0.0;
  loadingProdutoModal: boolean = false;
  valorTotalItemProduto: number = 0.0;
  valorInicialProduto: number = 0.0;
  nomeProdutoBusca: string = '';
  totalProdutos: number = 0.0;
  showCadastroProduto = true;
  listProdutos: Produtos = [];

  totalGeral: number = 0.0;
  subtotal: number = 0.0;
  descontos: number = 0.0;
  acrescimos: number = 0.0;
  showBotoesControle = true;
  sub: Subscription[] = [];

  constructor(
    private routeActive: ActivatedRoute,
    private service: OrdemServicoService,
    private servicoService: ServicoService,
    private produtoService: ProdutoService,
    private modalService: NgbModal
  ) {
    let uuid = this.routeActive.snapshot.paramMap.get('uuid');
    this.findById(uuid);
  }

  ngOnInit(): void {}

  salvarMovimentacao() {
    this.ordemServico.status = this.statusEmMovimentacao;
    this.salvar();
  }

  ngOnDestroy() {
    this.sub.forEach((s) => s.unsubscribe());
  }

  findById(uuid: string | null) {
    this.loading = true;
    if (uuid !== null) {
      this.sub.push(
        this.service.getById(uuid).subscribe(
          (data) => {
            this.ordemServico = data;
            this.calculaTotalServicos();
            this.calculaTotalProdutos();
            this.totalGeral =
              this.totalProdutos +
              this.totalServicos +
              this.ordemServico.acrescimos -
              this.ordemServico.descontos;
            this.loading = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loading = false;
          }
        )
      );
    } else {
      this.showError('');
    }
  }

  salvar() {
    this.loading = true;
    this.sub.push(
      this.service.update(this.ordemServico.uuid, this.ordemServico).subscribe(
        (data) => {
          this.loading = false;
          this.ordemServico = data;
        },
        (error) => {
          this.showError(error.error.message);
          this.loading = false;
        }
      )
    );
  }

  onBuscarServico() {
    if (this.nomeServicoBusca.length >= 3) {
      if (this.listServicos.length === 0) {
        this.loadingModal = true;
      }
      this.sub.push(
        this.servicoService.findByNome(this.nomeServicoBusca).subscribe(
          (data) => {
            this.listServicos = data;
            this.loadingModal = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loadingModal = false;
          }
        )
      );
    }
  }

  onSelectServico(servico: Servico) {
    this.showCadastroServico = true;
    this.showCadastroProduto = false;
    this.servicoSelecionado = servico;
    this.itemServico.valor = this.servicoSelecionado.valor;
    this.itemServico.quantidade = 1;
    this.calculaValorServico();
  }

  incluirServico() {
    this.loading = true;

    const obj = {
      valor: this.itemServico.valor,
      quantidade: this.itemServico.quantidade,
      servico: this.servicoSelecionado.uuid,
      ordemServico: this.ordemServico.uuid,
    };

    this.sub.push(
      this.service.addItemServico(this.ordemServico.uuid, obj).subscribe(
        (data) => {
          this.totalServicos = data;
          this.findById(this.ordemServico.uuid);
          this.loading = false;
        },
        (error) => {
          this.showError(error.error.message);
          this.loading = false;
        }
      )
    );
  }

  openDeleteModal(tipo: string, nome: string, uuid: string, index: number) {
    if (this.ordemServico.status !== 'FECHADO') {
      const modalRef = this.modalService.open(ModalDeleteComponent);
      modalRef.componentInstance.name = nome;
      modalRef.result.then((response) => {
        if (response) {
          if (tipo === 'servico') {
            this.removeItemServico(uuid, index);
          } else {
            this.removeItemProduto(uuid, index);
          }
        }
      });
    } else {
      this.showError(
        'Não pode excluir o item, pois a Ordem de Serviço foi finalizada'
      );
    }
  }

  removeItemServico(uuid: string, index: number) {
    if (uuid !== '') {
      this.loading = true;
      this.sub.push(
        this.service.removeItemServico(this.ordemServico.uuid, uuid).subscribe(
          (data) => {
            this.findById(this.ordemServico.uuid);
            this.ordemServico.servicos.splice(index, 1);
            this.loading = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loading = false;
          }
        )
      );
    }
  }

  calculaValorServico() {
    if (
      this.valorInicialServico !== this.itemServico.valor ||
      this.quantidadeInicialServico !== this.itemServico.quantidade
    ) {
      this.valorTotalItemServico = this.calculaQuantidadeTimesValor(
        this.itemServico.quantidade,
        this.itemServico.valor
      );
      this.valorInicialServico = this.itemServico.valor;
      this.quantidadeInicialServico = this.itemServico.quantidade;
    }
  }

  calculaTotalServicos() {
    let total = 0.0;
    this.ordemServico.servicos.forEach((s) => {
      total += s.valor * s.quantidade;
    });
    this.totalServicos = total;
  }

  calculaTotalProdutos() {
    let total = 0.0;
    this.ordemServico.produtos.forEach((s) => {
      total += s.valor * s.quantidade;
    });
    this.totalProdutos = total;
  }

  calculaTotal() {
    let total = 0.0;
    total =
      this.totalProdutos +
      this.totalServicos +
      this.acrescimos -
      this.descontos;
    this.totalGeral;
  }

  openModalServico() {
    this.nomeServicoBusca = '';
    this.listServicos = [];
    this.valorTotalItemServico = 0;
    this.showCadastroServico = false;
    this.showCadastroProduto = false;
  }

  onBuscarProduto() {
    if (this.nomeProdutoBusca.length >= 3) {
      if (this.listProdutos.length === 0) {
        this.loadingProdutoModal = true;
      }
      this.sub.push(
        this.produtoService.findByNome(this.nomeProdutoBusca).subscribe(
          (data) => {
            this.listProdutos = data;
            this.loadingProdutoModal = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loadingProdutoModal = false;
          }
        )
      );
    }
  }

  onSelectProduto(produto: Produto) {
    this.produtoSelecionado = produto;
    this.itemProduto.valor = this.produtoSelecionado.valor;
    this.itemProduto.quantidade = 1;
    this.calculaValorProduto();
    this.showCadastroServico = false;
    this.showCadastroProduto = true;
  }

  incluirProduto() {
    this.loading = true;

    const obj = {
      valor: this.itemProduto.valor,
      quantidade: this.itemProduto.quantidade,
      produto: this.produtoSelecionado.uuid,
      ordemServico: this.ordemServico.uuid,
    };

    this.sub.push(
      this.service.addItemProduto(this.ordemServico.uuid, obj).subscribe(
        (data) => {
          this.findById(this.ordemServico.uuid);
        },
        (error) => {
          this.showError(error.error.message);
          this.loading = false;
        }
      )
    );
    this.loading = false;
  }

  removeItemProduto(uuid: string, index: number) {
    if (uuid !== '') {
      this.loading = true;
      this.sub.push(
        this.service.removeItemProduto(this.ordemServico.uuid, uuid).subscribe(
          (data) => {
            this.findById(this.ordemServico.uuid);
            this.ordemServico.produtos.splice(index, 1);
            this.loading = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loading = false;
          }
        )
      );
    }
  }

  calculaValorProduto() {
    if (
      this.valorInicialProduto !== this.itemProduto.valor ||
      this.quantidadeInicialProduto !== this.itemProduto.quantidade
    ) {
      this.valorTotalItemProduto = this.calculaQuantidadeTimesValor(
        this.itemProduto.quantidade,
        this.itemProduto.valor
      );
      this.valorInicialProduto = this.itemProduto.valor;
      this.quantidadeInicialProduto = this.itemProduto.quantidade;
    }
  }

  openModalProduto() {
    this.nomeProdutoBusca = '';
    this.listProdutos = [];
    this.showCadastroServico = false;
    this.showCadastroProduto = false;
    this.valorTotalItemProduto = 0.0;
  }

  calculaQuantidadeTimesValor(q: number, v: number) {
    return q * v;
  }

  showError(error: string) {
    if (error === '' || error === undefined) {
      error = 'Erro ao tentar realizar a operação. Por favor, tente novamente.';
    }
    this.isErroAlert = true;
    this.errorMessage = error;
  }

  onOpenMovimentacao() {
    this.statusEmMovimentacao = this.ordemServico.status;
    this.showBotoesControle = false;
  }

  fecharOffCanvasFechamento() {
    this.showBotoesControle = true;
  }

  mudarStatus(status: string) {
    if (status === 'FECHADO') {
      this.subtotal = this.totalGeral;
    }
    this.statusEmMovimentacao = status;
  }

  confirmarMovimentacao() {
    this.loading = true;
    this.ordemServico.status = this.statusEmMovimentacao;

    const obj = {
      status: this.statusEmMovimentacao,
    };

    if (obj.status !== 'FECHADO') {
      this.sub.push(
        this.service.updateStatus(this.ordemServico.uuid, obj).subscribe(
          (data) => {
            console.log('Entrou');
            this.loading = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loadingModal = false;
          }
        )
      );
      this.salvar();
    } else {
      const obj = {
        descontos: this.descontos,
        acrescimos: this.acrescimos,
      };
      this.sub.push(
        this.service.finalizarOS(this.ordemServico.uuid, obj).subscribe(
          (data) => {
            this.loading = false;
          },
          (error) => {
            this.showError(error.error.message);
            this.loadingModal = false;
          }
        )
      );
    }
  }

  setaValorDesconto(valor: string) {
    let convert = '0';
    if (valor !== '') {
      convert = valor.replace('.', '').replace(',', '.');
    }
    let dolar = parseFloat(convert);
    this.subtotal = this.subtotal + this.descontos;
    this.descontos = dolar;
    this.subtotal = this.subtotal - this.descontos;
  }

  setaValorAcrescimo(valor: string) {
    let convert = '0';
    if (valor !== '') {
      convert = valor.replace('.', '').replace(',', '.');
    }
    let dolar = parseFloat(convert);
    this.subtotal = this.subtotal - this.acrescimos;
    this.acrescimos = dolar;
    this.subtotal = this.subtotal + this.acrescimos;
  }
}
