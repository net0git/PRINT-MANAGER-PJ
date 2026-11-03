import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoEquipoCreate, TipoEquipoResponse, TipoEquipoUpdate } from '../../../../domain/dto/tipoEquipoResponse.dto';
import { TipoEquipoRequest } from '../../../../domain/dto/tipoEquipoRequest.dto';


@Injectable({
  providedIn: 'root'
})
export class TipoEquipoService {

  constructor(private http: HttpClient) { }

  getAllTiposEquipo(): Observable<TipoEquipoResponse[]> {
    return this.http.get<TipoEquipoResponse[]>(`${ environment.urlApi }/api/tipo-equipo/list`);
  }

  getTipoEquipoById(id_tipo_equipo: number): Observable<TipoEquipoResponse> {
    return this.http.get<TipoEquipoResponse>(`${ environment.urlApi }/api/tipo-equipo/${id_tipo_equipo}`);
  }

  createTipoEquipo(tipo_equipo: TipoEquipoRequest): Observable<TipoEquipoCreate> {
    return this.http.post<TipoEquipoCreate>(`${ environment.urlApi }/api/tipo-equipo`, tipo_equipo);
  }

  updateTipoEquipo(id_tipo_equipo: number, tipo_equipo: TipoEquipoRequest): Observable<TipoEquipoUpdate> {
    return this.http.put<TipoEquipoUpdate>(`${ environment.urlApi }/api/tipo-equipo/${id_tipo_equipo}`, tipo_equipo);
  }
}
