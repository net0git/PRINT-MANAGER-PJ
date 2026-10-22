import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { aniosList, areaCantConsumible, nroParteCant } from '../../../../domain/dto/dashboardResponse.dto';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getAreaCantConsumible(anio: string): Observable<areaCantConsumible[]> {
    return this.http.post<areaCantConsumible[]>(`${ environment.urlApi }/api/dashboard/area-consumible`, {anio});
  }

  getNroParteCant(anio: string): Observable<nroParteCant[]> {
    return this.http.post<nroParteCant[]>(`${ environment.urlApi }/api/dashboard/nro-parte-consumible`, {anio});
  }

  getAniosList(): Observable<aniosList[]> {
    return this.http.get<aniosList[]>(`${ environment.urlApi }/api/dashboard/anios-list`);
  }
}
