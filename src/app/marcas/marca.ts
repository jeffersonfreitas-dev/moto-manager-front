export class Marca {
  uuid: string = '';
  nome: string = '';
  ativo!: boolean;
}

export type Marcas = Array<Marca>;
