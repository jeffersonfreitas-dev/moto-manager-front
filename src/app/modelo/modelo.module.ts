import { ComponentsModule } from './../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ModelosRoutingModule } from './modelo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaModelosComponent } from './lista-modelos/lista-modelos.component';
import { AddModelosComponent } from './add-modelos/add-modelos.component';

@NgModule({
  declarations: [ListaModelosComponent, AddModelosComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ModelosRoutingModule,
    ComponentsModule,
    FormsModule,
  ],
  exports: [NgxPaginationModule],
})
export class ModeloModule {}
