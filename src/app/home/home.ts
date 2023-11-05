export class Home {
  total_os: number = 0;
  total_faturamento: number = 0;
  os_abertas: number = 0;
  total_clientes: number = 0;
  total_servicos: number = 0;
  total_produtos: number = 0;
}

export class FaturamentoDTOChart {
  nome: string = "";
  valor: number = 0;
}

export type FaturamentosDTOCharts = Array<FaturamentoDTOChart>;
