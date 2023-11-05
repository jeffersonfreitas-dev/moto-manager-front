import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud.service';
import { GenericPagination } from '../shared/generic.pagination';
import { Mecanico } from './mecanico';

const API = environment.apiURL.concat('/mecanicos');

@Injectable({
  providedIn: 'root',
})
export class MecanicoService extends CrudService<Mecanico> {
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
