import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsumibleCreate, ConsumibleDetailResponse, ConsumibleResponse, ConsumibleUpdate } from '../../../../domain/dto/consumibleResponse.dto';
import { ConsumibleRequest } from '../../../../domain/dto/consumibleRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ConsumibleService {

  constructor(private httpClient: HttpClient) { }

  getConsumibleById(id_consumible: number): Observable<ConsumibleDetailResponse> {
    return this.httpClient.get<ConsumibleDetailResponse>(`${ environment.urlApi }/api/consumible/${id_consumible}`);
  }

  createConsumible(consumible: ConsumibleRequest): Observable<ConsumibleCreate> {
    return this.httpClient.post<ConsumibleCreate>(`${ environment.urlApi }/api/consumible`, consumible);
  }

  updateConsumible(id_consumible: number, consumible: ConsumibleRequest): Observable<ConsumibleUpdate> {
    return this.httpClient.put<ConsumibleUpdate>(`${ environment.urlApi }/api/consumible/${id_consumible}`, consumible);
  }

  getConsumiblesDetails(): Observable<ConsumibleDetailResponse[]> {
    return this.httpClient.get<ConsumibleDetailResponse[]>(`${ environment.urlApi }/api/consumible/list/details`);
  }

  getConsumibles(): Observable<ConsumibleResponse[]>{
    return this.httpClient.get<ConsumibleResponse[]>(`${ environment.urlApi }/api/consumible/list`);
  }
}
