import { Component, Input, OnInit } from '@angular/core';
import { Home } from 'src/app/home/home';

@Component({
  selector: 'app-pie-charts',
  templateUrl: './pie-charts.component.html',
  styleUrls: ['./pie-charts.component.css']
})
export class PieChartsComponent implements OnInit {

  @Input() home!: Home;

  constructor() { }

  ngOnInit(): void {
  }

  public pieChartLabels = ['Serviços', 'Produtos'];
  public pieChartData = [this.home.total_servicos, 1];
  public pieChartType = "'pie'";

}
