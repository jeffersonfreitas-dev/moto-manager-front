import { ComponentsModule } from './../components/components.module';
import { ServicosRoutingModule } from './servicos-routing.module';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaServicosComponent } from './lista-servicos/lista-servicos.component';
import { AddServicosComponent } from './add-servicos/add-servicos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ListaServicosComponent, AddServicosComponent],
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    ServicosRoutingModule,
    ComponentsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [ListaServicosComponent, NgxPaginationModule],
})
export class ServicosModule {}
