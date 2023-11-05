import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddModelosComponent } from './add-modelos/add-modelos.component';
import { ListaModelosComponent } from './lista-modelos/lista-modelos.component';

const routes: Routes = [
  { path: '', component: ListaModelosComponent },
  { path: 'add-modelos', component: AddModelosComponent },
  { path: 'add-modelos/:uuid', component: AddModelosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelosRoutingModule {}
