import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BarChartsComponent } from '../components/charts/bar-charts/bar-charts.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home/bar-char', component:BarChartsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

