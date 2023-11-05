import { VeiculosRoutingModule } from './veiculos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaVeiculosComponent } from './lista-veiculos/lista-veiculos.component';
import { AddVeiculosComponent } from './add-veiculos/add-veiculos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaVeiculosComponent, AddVeiculosComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    VeiculosRoutingModule,
  ],
  exports: [NgxPaginationModule],
})
export class VeiculosModule {}
