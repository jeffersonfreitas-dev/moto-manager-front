import { GenericPagination } from './../shared/generic.pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from 'src/app/marcas/marca';
import { environment } from 'src/environments/environment';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';

const API = environment.apiURL.concat('/marcas');

@Injectable({
  providedIn: 'root',
})
export class MarcasService extends CrudService<Marca> {
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
