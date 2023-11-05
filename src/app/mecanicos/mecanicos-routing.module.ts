import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMecanicosComponent } from './add-mecanicos/add-mecanicos.component';
import { ListaMecanicosComponent } from './lista-mecanicos/lista-mecanicos.component';

const routes: Routes = [
  { path: '', component: ListaMecanicosComponent },
  { path: 'add-mecanicos', component: AddMecanicosComponent },
  { path: 'add-mecanicos/:uuid', component: AddMecanicosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MecanicosRoutingModule {}
