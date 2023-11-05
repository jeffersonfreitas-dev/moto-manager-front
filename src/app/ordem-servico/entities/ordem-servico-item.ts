import { OrdemServico } from './ordem-servico';
import { Servico } from "src/app/servicos/servicos";

export class OrdemServicoItem {
  uuid: string = '';
  valor: number = 0;
  quantidade: number = 1;
  servico: Servico = new Servico();
  ordemServico: OrdemServico = new OrdemServico();
}

export type OrdemServicoItens = Array<OrdemServicoItem>;
