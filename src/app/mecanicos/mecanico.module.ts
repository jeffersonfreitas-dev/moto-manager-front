import { ComponentsModule } from './../components/components.module';
import { MecanicosRoutingModule } from './mecanicos-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMecanicosComponent } from './add-mecanicos/add-mecanicos.component';
import { ListaMecanicosComponent } from './lista-mecanicos/lista-mecanicos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddMecanicosComponent, ListaMecanicosComponent],
  imports: [
    NgxPaginationModule,
    FormsModule,
    CommonModule,
    MecanicosRoutingModule,
    ComponentsModule,
  ],
  exports: [ListaMecanicosComponent, NgxPaginationModule],
})
export class MecanicoModule {}
