import { Marca } from 'src/app/marcas/marca';
export class Modelo {
  uuid: string = '';
  nome: string = '';
  marca: Marca = new Marca();
  ativo: boolean = false;
}

export class ModeloDTO {
  uuid: string = '';
  nome: string = '';
  marca!: string;
  ativo: boolean = false;
}

export type Modelos = Array<Modelo>;
