import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { TicketRequest } from '../../../../domain/dto/ticketRequest.dto';
import { TicketCountMesDto, TicketCountStatusDto, TicketCreate, TicketDetailHistorialResponse, TicketDetailResponse, TicketResponse, TicketStatusCreate, TicketUpdate } from '../../../../domain/dto/ticketResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private httpClient: HttpClient) { }

  // getAllTickets(): Observable<TicketDetailResponse[]> {
  //   return this.httpClient.get<TicketDetailResponse[]>(`${ environment.urlApi }/api/ticket/list`);
  // }

  // getTicketById(id_ticket: number): Observable<TicketDetailResponse> {
  //   return this.httpClient.get<TicketDetailResponse>(`${ environment.urlApi }/api/ticket/${id_ticket}`);
  // }

  createTicket(ticket: TicketRequest): Observable<TicketCreate> {
    return this.httpClient.post<TicketCreate>(`${ environment.urlApi }/api/ticket`, ticket);
  }
  createTicketStatus(id_ticket: number): Observable<TicketStatusCreate> {
    return this.httpClient.post<TicketStatusCreate>(`${ environment.urlApi }/api/ticket-estado`, {id_ticket});
  }

  updateTicket(id_ticket: number, ticket: TicketRequest): Observable<TicketUpdate> {
    return this.httpClient.put<TicketUpdate>(`${ environment.urlApi }/api/ticket/${id_ticket}`, ticket);
  }

  getAllTicketsHistorialDetails(anio:string,id_usuario: number, id_rol: number): Observable<TicketDetailHistorialResponse[]> {
    return this.httpClient.post<TicketDetailHistorialResponse[]>(`${ environment.urlApi }/api/ticket/list`, {anio,id_usuario,id_rol});
  }

  getAllTicketPendientes(anio:string): Observable<TicketDetailHistorialResponse[]>{
    return this.httpClient.post<TicketDetailHistorialResponse[]>(`${ environment.urlApi }/api/ticket/list/pendientes`, {anio})
  }

  getAllAlmacen(anio:string): Observable<TicketDetailHistorialResponse[]>{
    return this.httpClient.post<TicketDetailHistorialResponse[]>(`${ environment.urlApi }/api/ticket/list/almacen`, {anio})
  }

  getCountStatus(anio:string): Observable<TicketCountStatusDto>{
    return this.httpClient.post<TicketCountStatusDto>(`${ environment.urlApi }/api/ticket/count-status`, {anio})
  }

  getCountMes(anio:string): Observable<TicketCountMesDto[]>{
    return this.httpClient.post<TicketCountMesDto[]>(`${ environment.urlApi }/api/ticket/count-mes`, {anio})
  }
}
