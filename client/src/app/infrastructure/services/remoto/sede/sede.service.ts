import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { SedeCreate, SedeResponse, SedeUpdate , SedeDetails} from '../../../../domain/dto/sedeResponse.dto';
import { SedeRequest } from '../../../../domain/dto/sedeRequest.dto';


@Injectable({
  providedIn: 'root'
})
export class SedeService {

  constructor(private http:HttpClient) { }

  getSedeList(): Observable<SedeResponse[]> {
    return this.http.get<SedeResponse[]>(`${ environment.urlApi }/api/sede/list`);
  }

  getSedeById(id_sede: number): Observable<SedeResponse> {
    return this.http.get<SedeResponse>(`${ environment.urlApi }/api/sede/${id_sede}`);
  }

  createSede(sede: SedeRequest): Observable<SedeCreate> {
    return this.http.post<SedeCreate>(`${ environment.urlApi }/api/sede`, sede);
  }

  updateSede(id_sede: number, sede: SedeRequest): Observable<SedeUpdate> {
    return this.http.put<SedeUpdate>(`${ environment.urlApi }/api/sede/${id_sede}`, sede);
  }

  getSedesDetails(): Observable<SedeDetails[]> {
    return this.http.get<SedeDetails[]>(`${ environment.urlApi }/api/sede/list/details`);
  }
}
