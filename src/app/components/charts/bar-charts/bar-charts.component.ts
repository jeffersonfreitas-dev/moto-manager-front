import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2022/06', '2022/07', '2022/08', '2022/09', '2022/10', '2022/11', '2022/12'];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartData = [
    {data: [65, 59, 80, 81, 56, 55, 40]}
  ];
}