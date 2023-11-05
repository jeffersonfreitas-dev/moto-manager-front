import { ListaServicosComponent } from './lista-servicos/lista-servicos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddServicosComponent } from './add-servicos/add-servicos.component';

const routes: Routes = [
  { path: '', component: ListaServicosComponent },
  { path: 'add-servicos', component: AddServicosComponent },
  { path: 'add-servicos/:uuid', component: AddServicosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicosRoutingModule {}
