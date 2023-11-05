import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class CrudService<T> {
  constructor(protected http: HttpClient, private API_URL: string) {}

  deleteById(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${uuid}`);
  }

  create(entity: any): Observable<any> {
    return this.http.post<any>(`${this.API_URL}`, entity);
  }

  getById(uuid: string): Observable<T> {
    return this.http.get<T>(`${this.API_URL}/${uuid}`);
  }

  update(uuid: string, entity: any): Observable<T> {
    return this.http.put<T>(`${this.API_URL}/${uuid}`, entity);
  }

  getAll(pgNo: number, size: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${pgNo}/${size}`);
  }

  getStatus(): Observable<string> {
    return this.http.get<string>(`${this.API_URL}/status`);
  }
}
