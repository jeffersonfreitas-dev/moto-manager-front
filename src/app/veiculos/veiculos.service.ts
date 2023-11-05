import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Veiculo } from './veiculos';

const API = environment.apiURL.concat('/veiculos');

@Injectable({
  providedIn: 'root',
})
export class VeiculosService extends CrudService<Veiculo> {
  constructor(protected http: HttpClient) {
    super(http, API);
  }

  findAllByCliente(uuid: string): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${API}/cliente/${uuid}`);
  }
}
