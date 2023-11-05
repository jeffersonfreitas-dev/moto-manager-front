import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaProdutoComponent } from './lista-produto/lista-produto.component';
import { AddProdutoComponent } from './add-produto/add-produto.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ProdutoRoutingModule } from './produto-routing.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListaProdutoComponent, AddProdutoComponent],
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    ProdutoRoutingModule,
    ComponentsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [ListaProdutoComponent, NgxPaginationModule],
})
export class ProdutoModule {}
