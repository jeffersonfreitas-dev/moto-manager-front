import { ComponentsModule } from './../components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrdemServicoRoutingModule } from './ordem-servico-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrdemServicosComponent } from './add-ordem-servicos/add-ordem-servicos.component';
import { ListaOrdemServicosComponent } from './lista-ordem-servicos/lista-ordem-servicos.component';
import { NgxMaskModule } from 'ngx-mask';
import { AttOrdemServicosComponent } from './att-ordem-servicos/att-ordem-servicos.component';

@NgModule({
  declarations: [
    AddOrdemServicosComponent,
    ListaOrdemServicosComponent,
    AttOrdemServicosComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    OrdemServicoRoutingModule,
    FormsModule,
    ComponentsModule,
    NgxMaskModule.forChild(),
  ],
  exports: [NgxPaginationModule],
})
export class OrdemServicoModule {}
