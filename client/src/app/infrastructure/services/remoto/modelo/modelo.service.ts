import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ModeloCreate, ModeloResponse, ModeloUpdate } from '../../../../domain/dto/modeloResponse.dto';
import { ModeloRequest } from '../../../../domain/dto/modeloRequest.dto';
import { Modelo } from '../../../../domain/model/modelo.model';

@Injectable({
  providedIn: 'root'
})
export class ModeloService {

  constructor(private http: HttpClient) { }

  getAllModelos(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(`${ environment.urlApi }/api/modelo/list`);
  }

  createModelo(modelo: ModeloRequest): Observable<ModeloCreate> {
    return this.http.post<ModeloCreate>(`${ environment.urlApi }/api/modelo`, modelo);
  }

  updateModelo(id_modelo: number, modelo: ModeloRequest): Observable<ModeloUpdate> {
    return this.http.put<ModeloUpdate>(`${ environment.urlApi }/api/modelo/${id_modelo}`, modelo);
  }
}
