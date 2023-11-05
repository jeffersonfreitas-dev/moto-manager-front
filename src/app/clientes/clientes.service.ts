import { Veiculo } from 'src/app/veiculos/veiculos';
import { VeiculoDTO } from './../veiculos/veiculos';
import { Cliente, ClienteFiltro, ClienteSimples } from './cliente';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { Observable } from 'rxjs';
import { GenericPagination } from '../shared/generic.pagination';

const API = environment.apiURL.concat('/clientes');

@Injectable({
  providedIn: 'root',
})
export class ClientesService extends CrudService<Cliente> {
  constructor(protected http: HttpClient) {
    super(http, API);
  }

  filter(
    filtro: ClienteFiltro,
    pagination: GenericPagination
  ): Observable<any> {
    let params = new HttpParams()
      .set('order', pagination.order)
      .set('nome', filtro.nome)
      .set('placa', filtro.placa);
    return this.http.get<any>(
      `${API}/f/${pagination.pgNo}/${pagination.size}`,
      {
        params,
      }
    );
  }

  getVeiculosByCliente(cliente: string): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(`${API}/${cliente}/veiculos`);
  }

  addVeiculo(cliente: string, veiculo: VeiculoDTO): Observable<void> {
    return this.http.put<void>(`${API}/${cliente}/veiculo`, veiculo);
  }

  deleteVeiculoById(cliente: string, veiculo: string): Observable<void> {
    return this.http.delete<void>(`${API}/${cliente}/veiculo/${veiculo}`);
  }

  findByNome(nome: string): Observable<ClienteSimples[]> {
    return this.http.get<ClienteSimples[]>(`${API}/nome/` + nome);
  }
}
