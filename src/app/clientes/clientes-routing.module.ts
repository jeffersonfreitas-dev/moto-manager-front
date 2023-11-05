import { AddClientesComponent } from './add-clientes/add-clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
// import { AppAuthGuard } from '../utility/app.guard';

const routes: Routes = [
  { path: '', component: ListaClientesComponent },
  { path: 'add-clientes', component: AddClientesComponent },
  {
    path: 'add-clientes/:uuid',
    component: AddClientesComponent,
    // canActivate: [AppAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // providers: [AppAuthGuard],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
