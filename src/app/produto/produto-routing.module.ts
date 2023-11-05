import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { AddProdutoComponent } from './add-produto/add-produto.component';

const routes: Routes = [
  { path: '', component: ListaProdutoComponent },
  { path: 'add-produto', component: AddProdutoComponent },
  { path: 'add-produto/:uuid', component: AddProdutoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
