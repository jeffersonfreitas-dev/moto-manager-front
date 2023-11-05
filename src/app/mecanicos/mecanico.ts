export class Mecanico {
  uuid: string = '';
  nome: string = '';
  ativo!: boolean;
}

export type Mecanicos = Array<Mecanico>;
