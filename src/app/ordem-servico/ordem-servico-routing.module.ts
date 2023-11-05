import { AttOrdemServicosComponent } from './att-ordem-servicos/att-ordem-servicos.component';
import { ListaOrdemServicosComponent } from './lista-ordem-servicos/lista-ordem-servicos.component';
import { AddOrdemServicosComponent } from './add-ordem-servicos/add-ordem-servicos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ListaOrdemServicosComponent },
  { path: 'add-ordem-servicos', component: AddOrdemServicosComponent },
  { path: 'lista-ordem-servicos', component: ListaOrdemServicosComponent },
  { path: 'add-ordem-servicos/:uuid', component: AddOrdemServicosComponent },
  { path: 'att-ordem-servicos/:uuid', component: AttOrdemServicosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdemServicoRoutingModule {}
