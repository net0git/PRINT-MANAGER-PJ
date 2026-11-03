import { Injectable } from '@angular/core';
import { Observable, switchMap, throwError } from 'rxjs';
import { TicketRequest } from '../../domain/dto/ticketRequest.dto';
import { TicketCreate, TicketStatusCreate } from '../../domain/dto/ticketResponse.dto';
import { TicketService } from '../../infrastructure/services/remoto/ticket/ticket.service';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';

@Injectable({
  providedIn: 'root'
})
export class TicketUseCaseService {

  constructor(private ticketService: TicketService) { }

  validarCampos(ticket: TicketRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!ticket.id_modelo || ticket.id_modelo === 0) {
      errores.push({ campo: 'modelo de impresora', mensaje: 'Campo requerido' });
    }
    if (!ticket.id_area || ticket.id_area === 0) {
      errores.push({ campo: 'area', mensaje: 'Campo requerido' });
    }
    if (!ticket.id_tipo_consumible || ticket.id_tipo_consumible === 0) {
      errores.push({ campo: 'tipo de consumible', mensaje: 'Campo requerido' });
    }

    return errores;
  }

  createTicket(ticket: TicketRequest): Observable<TicketCreate> {
    const erroresValidacion = this.validarCampos(ticket);

    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }
    return this.ticketService.createTicket(ticket)

  }

  // createTicketStatus(id_ticket: number): Observable<TicketStatusCreate> {
  //   return this.ticketService.createTicketStatus(id_ticket);
  // }

}
