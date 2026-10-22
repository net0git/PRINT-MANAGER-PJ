import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImpresoraDetailResponse, impresoraResponseCreate, impresoraResponseUpdate } from '../../../../domain/dto/impresoraResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ImpresoraService {

  constructor(private http:HttpClient) { }

  getAllImpresorasDetail():Observable<ImpresoraDetailResponse[]>{
    return this.http.get<ImpresoraDetailResponse[]>(`${environment.urlApi}/api/impresora/list/details`);
  }

  getOneImpresora(id_marca: number, id_modelo: number, id_tipo_consumible:number): Observable<ImpresoraDetailResponse> {
    return this.http.post<ImpresoraDetailResponse>(`${environment.urlApi}/api/impresora/detail`,{id_marca,id_modelo,id_tipo_consumible});
  }
}
