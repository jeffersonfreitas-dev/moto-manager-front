import { Observable } from 'rxjs';
import { FaturamentosDTOCharts, Home } from './home';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { CrudService } from '../shared/crud.service';
import { HttpClient } from '@angular/common/http';

const API = environment.apiURL.concat('/home');

@Injectable({
  providedIn: 'root',
})
export class HomeService extends CrudService<Home> {
  constructor(protected http: HttpClient) {
    super(http, API);
  }

  getInfo(): Observable<Home> {
    return this.http.get<Home>(`${API}`);
  }

  getInfoBarChart(): Observable<FaturamentosDTOCharts> {
    return this.http.get<FaturamentosDTOCharts>(`${API}/bar-chart`);
  }
}
