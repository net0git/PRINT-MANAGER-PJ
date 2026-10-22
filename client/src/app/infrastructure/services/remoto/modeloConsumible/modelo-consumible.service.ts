import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloConsumibleResponse, ModeloConsumibleCreate, ModeloConsumibleUpdate, ModeloConsumibleDelete } from '../../../../domain/dto/modeloConsumibleResponse.dto';
import { ModeloConsumibleRequest } from '../../../../domain/dto/modeloConsumibleRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ModeloConsumibleService {

  constructor(private httpClient: HttpClient) { }

  getModeloConsumibleById(id_modelo_consumible: number): Observable<ModeloConsumibleResponse> {
    return this.httpClient.get<ModeloConsumibleResponse>(`${ environment.urlApi }/api/modelo-consumible/${id_modelo_consumible}`);
  }

  createModeloConsumible(modelo_consumidible: ModeloConsumibleRequest): Observable<ModeloConsumibleCreate> {
    return this.httpClient.post<ModeloConsumibleCreate>(`${ environment.urlApi }/api/modelo-consumible`, modelo_consumidible);
  }

  updateModeloConsumible(id_modelo_consumible: number, modelo_consumidible: ModeloConsumibleRequest): Observable<ModeloConsumibleUpdate> {
    return this.httpClient.put<ModeloConsumibleUpdate>(`${ environment.urlApi }/api/modelo-consumible/${id_modelo_consumible}`, modelo_consumidible);
  }

  deleteModeloConsumible(id_modelo_consumible: number): Observable<ModeloConsumibleDelete> {
    return this.httpClient.delete<ModeloConsumibleDelete>(`${ environment.urlApi }/api/modelo-consumible/${id_modelo_consumible}`);
  }

  getModeloConsumibles(): Observable<ModeloConsumibleResponse[]>{
    return this.httpClient.get<ModeloConsumibleResponse[]>(`${ environment.urlApi }/api/modelo-consumible/list`);
  }
}
