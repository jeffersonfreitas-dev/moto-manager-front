import { HomeService } from './home.service';
// import { KeycloakService } from 'keycloak-angular';
import { Component } from '@angular/core';
import { FaturamentoDTOChart, Home } from './home';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  home: Home = new Home();
  servicos: number = 0;
  faturamentos: FaturamentoDTOChart[] = [];
  nomes: string[] = [];
  valores: number[] = [];

  public pieChartLabels: string[] = [] ;
  public pieChartData: number[] = [] ;
  public pieChartType = "'pie'";
  public pieChartColors: any[] = [
    {
      backgroundColor:["#FF7360", "#6FC8CE", "#FAFFF2", "#FFFCC4", "#B9E8E0"]
    }];


    public barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels: string[] = [];
    public barChartType = 'bar';
    public barChartLegend = false;
    public barChartData = [
      {data: this.valores}
    ];



  constructor(private homeService: HomeService) {
    this.getServicos();
    this.getBarCharts();
  }


  public getServicos(): void {
    console.log("Mahoi")
    this.homeService.getInfo().subscribe(
      (data) => {
        console.log("Mahoi2")
        console.log(data);
        this.home = data;
        this.servicos = this.home.total_servicos;
        this.pieChartLabels = ['Serviços', 'Produtos'];
        this.pieChartData = [this.home.total_servicos, data.total_produtos];
      },
      (error) => {
        console.log('Erro! ' + error.error.message);
      }
    );
  }

  public getBarCharts(): void {
    this.homeService.getInfoBarChart().subscribe(
      (data) => {
        this.faturamentos = data;
        console.log(this.faturamentos);
        this.faturamentos.forEach((f) => {this.nomes.push(f.nome); this.valores.push(f.valor)});
        this.barChartLabels = this.nomes;

        // this.pieChartData = [this.home.total_servicos, data.total_produtos];
      },
      (error) => {
        console.log('Erro! ' + error.error.message);
      }
    );
  }
}
