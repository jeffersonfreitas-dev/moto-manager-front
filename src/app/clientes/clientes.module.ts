import { ComponentsModule } from './../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ClientesRoutingModule } from './clientes-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ListaClientesComponent } from './lista-clientes/lista-clientes.component';
import { AddClientesComponent } from './add-clientes/add-clientes.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListaClientesComponent, AddClientesComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    MatFormFieldModule,
    ClientesRoutingModule,
    FormsModule,
    ComponentsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [NgxPaginationModule],
})
export class ClientesModule {}
