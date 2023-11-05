import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVeiculosComponent } from './add-veiculos/add-veiculos.component';
import { ListaVeiculosComponent } from './lista-veiculos/lista-veiculos.component';

const routes: Routes = [
  { path: '', component: ListaVeiculosComponent },
  { path: 'add-veiculos', component: AddVeiculosComponent },
  { path: 'add-veiculos/:uuid', component: AddVeiculosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculosRoutingModule {}
