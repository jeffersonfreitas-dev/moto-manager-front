import { AddMarcasComponent } from './add-marcas/add-marcas.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaMarcasComponent } from './lista-marcas/lista-marcas.component';

const routes: Routes = [
  {path:'', component:ListaMarcasComponent},
  {path:'add-marcas', component : AddMarcasComponent},
  {path:'add-marcas/:uuid', component : AddMarcasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcasRoutingModule { }
