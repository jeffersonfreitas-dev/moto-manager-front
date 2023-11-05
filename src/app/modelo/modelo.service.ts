import { Modelo, ModeloDTO } from './modelo';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';
import { GenericPagination } from '../shared/generic.pagination';

const API = environment.apiURL.concat('/modelos');

@Injectable({
  providedIn: 'root',
})
export class ModeloService extends CrudService<Modelo> {
  constructor(protected http: HttpClient) {
    super(http, API);
  }

  filter(nome: string, pagination: GenericPagination): Observable<any> {
    let params = new HttpParams()
      .set('order', pagination.order)
      .set('nome', nome);
    return this.http.get<any>(
      `${API}/f/${pagination.pgNo}/${pagination.size}`,
      {
        params,
      }
    );
  }
}
