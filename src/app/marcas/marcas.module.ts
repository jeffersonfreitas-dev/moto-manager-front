import { ComponentsModule } from './../components/components.module';
import { AddMarcasComponent } from './add-marcas/add-marcas.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MarcasRoutingModule } from './marcas-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaMarcasComponent } from './lista-marcas/lista-marcas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListaMarcasComponent, AddMarcasComponent],
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    MarcasRoutingModule,
    ComponentsModule,
  ],
  exports: [ListaMarcasComponent, NgxPaginationModule],
})
export class ListaMarcasModule {}
