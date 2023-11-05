import { ClienteSimples } from './../../clientes/cliente';
import { OrdemServicoItens } from './ordem-servico-item';
import { Mecanico } from '../../mecanicos/mecanico';
import { Veiculo } from '../../veiculos/veiculos';
import { OrdemProdutoItens } from './ordem-produto-item';

export class OrdemServico {
  uuid: string = '';
  codigo: number = 0;
  defeito: string = '';
  data: string = '';
  pendencias: string = '';
  observacao: string = '';
  cliente: ClienteSimples = new ClienteSimples();
  veiculo: Veiculo = new Veiculo();
  mecanico: Mecanico = new Mecanico();
  status: string = '';
  acrescimos: number = 0;
  descontos: number = 0;
  servicos: OrdemServicoItens = [];
  produtos: OrdemProdutoItens = [];
}

export type OrdensServicos = Array<OrdemServico>;
