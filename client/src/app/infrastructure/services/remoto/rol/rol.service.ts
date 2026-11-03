import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { RolResponse } from '../../../../domain/dto/rolResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  constructor(private http: HttpClient) { }

  getRolList(): Observable<RolResponse[]> {
    return this.http.get<RolResponse[]>(`${ environment.urlApi }/api/rol/list`);
  }
}
