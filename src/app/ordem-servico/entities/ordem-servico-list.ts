import { Cliente } from "src/app/clientes/cliente";
import { Veiculo } from "src/app/veiculos/veiculos";

export class OrdemServicoToList {
  uuid: string = '';
  data: string = '';
  codigo: number = 0;
  status: string = '';
  cliente: Cliente = new Cliente();
  veiculo: Veiculo = new Veiculo();
  total: number = 0.0;
}

export type OrdensServicosToList = Array<OrdemServicoToList>;
