import { Produto } from './produto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';
import { GenericPagination } from '../shared/generic.pagination';

const API = environment.apiURL.concat('/produtos');

@Injectable({
  providedIn: 'root',
})
export class ProdutoService extends CrudService<Produto> {
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

  findByNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${API}/name/` + nome);
  }
}
