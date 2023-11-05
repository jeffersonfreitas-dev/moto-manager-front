import { Produto } from '../../produto/produto';
import { OrdemServico } from './ordem-servico';

export class OrdemProdutoItem {
  uuid: string = '';
  valor: number = 0;
  quantidade: number = 1;
  produto: Produto = new Produto();
  ordemServico: OrdemServico = new OrdemServico();
}

export type OrdemProdutoItens = Array<OrdemProdutoItem>;
