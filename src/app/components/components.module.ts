import { FormsModule } from '@angular/forms';
import { BtnActionTableComponent } from './btn-action-table/btn-action-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component';
import { MovimentacaoComponent } from './movimentacao/movimentacao.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';
import { AlertMessageSuccessComponent } from './alert-message-success/alert-message-success.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartsComponent } from './charts/bar-charts/bar-charts.component';
import { PieChartsComponent } from './charts/pie-charts/pie-charts.component';

@NgModule({
  declarations: [
    BtnActionTableComponent,
    LoadingComponent,
    ModalDeleteComponent,
    MovimentacaoComponent,
    AlertMessageComponent,
    AlertMessageSuccessComponent,
    BarChartsComponent,
    PieChartsComponent,
  ],
  imports: [CommonModule, FormsModule, ChartsModule],
  exports: [
    BtnActionTableComponent,
    LoadingComponent,
    ModalDeleteComponent,
    MovimentacaoComponent,
    AlertMessageComponent,
    AlertMessageSuccessComponent,
    BarChartsComponent,
    PieChartsComponent
  ],
})
export class ComponentsModule {}
