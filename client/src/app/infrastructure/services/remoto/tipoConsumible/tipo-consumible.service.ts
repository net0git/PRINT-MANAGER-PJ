import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoConsumibleCreate, TipoConsumibleResponse, TipoConsumibleUpdate } from '../../../../domain/dto/tipoConsumible.dto';

@Injectable({
  providedIn: 'root'
})
export class TipoConsumibleService {

  constructor(private httpClient: HttpClient) { }

  getAllTiposConsumibles(): Observable<TipoConsumibleResponse[]> {
    return this.httpClient.get<any[]>(`${ environment.urlApi }/api/tipo-consumible/list`);
  }

  getTipoConsumibleById(id_tipo_consumible: number): Observable<TipoConsumibleResponse> {
    return this.httpClient.get<TipoConsumibleResponse>(`${ environment.urlApi }/api/tipo-consumible/${id_tipo_consumible}`);
  }

  createTipoConsumible(tipo_consumible: string): Observable<TipoConsumibleCreate> {
    return this.httpClient.post<TipoConsumibleCreate>(`${ environment.urlApi }/api/tipo-consumible`, {tipo_consumible});
  }

  updateTipoConsumible(id_tipo_consumible: number, tipo_consumible: string): Observable<TipoConsumibleUpdate> {
    return this.httpClient.put<TipoConsumibleUpdate>(`${ environment.urlApi }/api/tipo-consumible/${id_tipo_consumible}`, {tipo_consumible});
  }

}
