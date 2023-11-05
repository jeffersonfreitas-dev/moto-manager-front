import { Modelo } from './../modelo/modelo';

export class VeiculoDTO {
  uuid: string = '';
  placa: string = '';
  cor: string = '';
  ano: number = 2022;
  modelo: string = '';
  cliente: string = '';
}

export class Veiculo {
  uuid: string = '';
  placa: string = '';
  cor: string = '';
  ano!: number;
  modelo: Modelo = new Modelo();
  cliente: string = '';
}

export type Veiculos = Array<Veiculo>;
export type VeiculosDTO = Array<VeiculoDTO>;
