import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { AreaCreate, AreaResponse, AreaUpdate } from '../../../../domain/dto/areaResponse.dto';
import { AreaRequest } from '../../../../domain/dto/areaRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private http:HttpClient) { }
  getAllAreas(): Observable<AreaResponse[]> {
    return this.http.get<AreaResponse[]>(`${environment.urlApi}/api/area/list`);
  }

  getAreaById(id_area: number): Observable<AreaResponse> {
    return this.http.get<AreaResponse>(`${environment.urlApi}/api/area/${id_area}`);
  }

  createArea(area: AreaRequest): Observable<AreaCreate> {
    return this.http.post<AreaCreate>(`${environment.urlApi}/api/area`, area);
  }

  updateArea(id_area: number, area: AreaRequest): Observable<AreaUpdate> {
    return this.http.put<AreaUpdate>(`${environment.urlApi}/api/area/${id_area}`, area);
  }
}
