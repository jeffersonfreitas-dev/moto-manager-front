import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud.service';
import { GenericPagination } from '../shared/generic.pagination';
import { OrdemServico } from './entities/ordem-servico';
import { OrdemServicoFiltro } from './entities/ordem-servico-filtro';

const API = environment.apiURL.concat('/os');

@Injectable({
  providedIn: 'root',
})
export class OrdemServicoService extends CrudService<OrdemServico> {
  constructor(protected http: HttpClient) {
    super(http, API);
  }

  filter(
    osfiltro: OrdemServicoFiltro,
    pagination: GenericPagination
  ): Observable<any> {
    pagination.order = 'desc';

    let params = new HttpParams()
      .set('status', osfiltro.status)
      .set('codigo', osfiltro.codigo)
      .set('nome', osfiltro.nome)
      .set('placa', osfiltro.placa)
      .set('dataInicial', osfiltro.datainicial)
      .set('dataFinal', osfiltro.datafinal)
      .set('fieldOrder', pagination.filedOrder)
      .set('order', pagination.order);
    return this.http.get<any>(`${API}/${pagination.pgNo}/${pagination.size}`, {
      params,
    });
  }

  addItemServico(uuid: string, item: any): Observable<any> {
    return this.http.put<any>(`${API}/${uuid}/servico`, item);
  }

  removeItemServico(os: string, uuid: string): Observable<any> {
    return this.http.delete<any>(`${API}/${os}/servico/${uuid}`);
  }

  addItemProduto(uuid: string, item: any): Observable<any> {
    return this.http.put<any>(`${API}/${uuid}/produto`, item);
  }

  removeItemProduto(os: string, uuid: string): Observable<any> {
    return this.http.delete<any>(`${API}/${os}/produto/${uuid}`);
  }

  updateStatus(uuid: string, status: any): Observable<any> {
    return this.http.patch<any>(`${API}/${uuid}/status`, status);
  }

  finalizarOS(uuid: string, valor: any): Observable<any> {
    return this.http.put<any>(`${API}/${uuid}/finish`, valor);
  }
}
