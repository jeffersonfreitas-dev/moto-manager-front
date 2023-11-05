import { Veiculos, VeiculoDTO } from './../veiculos/veiculos';

export class ClienteDTO {
  nome: string = '';
  telefone: string = '';
  email: string = '';
  logradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  cep: string = '';
  ativo: boolean = true;
  celular: string = '';
  dataNascimento: string = '';
  veiculos: VeiculoDTO[] = [];
}

export class Cliente {
  uuid: string = '';
  nome: string = '';
  telefone: string = '';
  email: string = '';
  logradouro: string = '';
  bairro: string = '';
  cidade: string = '';
  cep: string = '';
  ativo: boolean = true;
  celular: string = '';
  dataNascimento: string = '';
  veiculos: Veiculos = [];
}

export class ClienteSimples {
  uuid: string = '';
  nome: string = '';
}

export class ClienteFiltro {
  nome: string = '';
  placa: string = '';
}

export type Clientes = Array<Cliente>;

export type ClientesSimples = Array<ClienteSimples>;
