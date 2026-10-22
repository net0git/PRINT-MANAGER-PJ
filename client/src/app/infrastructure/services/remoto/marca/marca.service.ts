import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { marcaResponse, marcaResponseCreate, marcaResponseUpdate } from '../../../../domain/dto/marcaResponse';
import { Observable } from 'rxjs';
import { Marca } from '../../../../domain/model/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  getAllMarcas(): Observable<marcaResponse[]> {
    return this.http.get<marcaResponse[]>(`${ environment.urlApi }/api/marca/list`);
  }

  getMarcaById(id_marca: number): Observable<marcaResponse> {
    return this.http.get<marcaResponse>(`${ environment.urlApi }/api/marca/${id_marca}`);
  }

  createMarca(marca: string): Observable<marcaResponseCreate> {
    return this.http.post<marcaResponseCreate>(`${ environment.urlApi }/api/marca`, { marca });
  }

  updateMarca(id_marca: number, marca_body: Marca): Observable<marcaResponseUpdate> {
    return this.http.put<marcaResponseUpdate>(`${ environment.urlApi }/api/marca/${id_marca}`,  marca_body );
  }
}
  