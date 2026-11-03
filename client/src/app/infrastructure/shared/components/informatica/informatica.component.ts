import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailHistorialResponse, TicketUpdate } from '../../../../domain/dto/ticketResponse.dto';
import { TicketService } from '../../../services/remoto/ticket/ticket.service';
import { TicketRequest } from '../../../../domain/dto/ticketRequest.dto';
import { LocalStorageUsuarioService } from '../../../services/local/local-storage-usuario.service';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../services/local/notification.service';

@Component({
  selector: 'app-informatica',
  imports: [CommonModule, FormsModule],
  templateUrl: './informatica.component.html',
  styleUrl: './informatica.component.scss'
})
export class InformaticaComponent implements OnInit {
  anio = new Date().getFullYear().toString();

  historialTickets: TicketDetailHistorialResponse[] = []
  historialTicketsTemp: TicketDetailHistorialResponse[] = []

  isModalOpenAprobar = false;
  isModalOpenDetalle = false;
  isModalOpenRechazar = false;

  id_ticket: number = 0;

  menuAbierto: number | null = null;

  dataTicketDetalle: TicketDetailHistorialResponse | null = null;
  mensajeRechazo: string | null = null;

   totalPendentes: number = 0;

  @ViewChild('menuContainer')
  menuContainer!: ElementRef;

  toggleMenu(event: MouseEvent, idTicket: number): void {
    event.stopPropagation();

    this.menuAbierto =
      this.menuAbierto === idTicket ? null : idTicket;
  }

  @HostListener('document:click', ['$event'])
  clickFuera(): void {
    this.menuAbierto = null;
  }

  constructor(private ticketService: TicketService, private localStorageUsuarioService: LocalStorageUsuarioService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllPendientes()
  }

  openModalAprobar() {
    this.isModalOpenAprobar = true;
  }

  closeModalAprobar() {
    this.isModalOpenAprobar = false;
  }

  openModalRechazar() {
    this.mensajeRechazo = null;
    this.isModalOpenRechazar = true;
  }

  closeModalRechazar() {
    this.isModalOpenRechazar = false;
  }

  openModalDetalle(ticket: TicketDetailHistorialResponse) {
    this.isModalOpenDetalle = true;
    this.dataTicketDetalle = ticket;
  }

  closeModalDetalle() {
    this.isModalOpenDetalle = false;
  }


  getAllPendientes() {
    this.ticketService.getAllTicketPendientes(this.anio).subscribe({
      next: (data: TicketDetailHistorialResponse[]) => {
        this.historialTickets = data;
        this.historialTicketsTemp = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllPendientes completo");
        this.obtenerParametrosInformatica();
      }
    });
  }

  buscarEnObjeto(event: any): void {
    const textoBusqueda = event.target.value.toLowerCase().trim();
    this.historialTickets = this.historialTicketsTemp.filter((ticket: TicketDetailHistorialResponse) => {
      const coincideMarca = ticket.impresora.marca.toLowerCase().includes(textoBusqueda);
      const coincideModelo = (ticket.impresora.modelo.toLowerCase().includes(textoBusqueda));
      const coincideConsumible = (ticket.consumible.tipo_consumible.toLowerCase().includes(textoBusqueda));
      const coincideArea = (ticket.area.area.toLowerCase().includes(textoBusqueda));
      const usuario = ticket.usuario.nombre.toLowerCase().includes(textoBusqueda);
      return coincideMarca || usuario || coincideConsumible || coincideArea || coincideModelo;
    });
  }

  MenuRechazar(ticket: TicketDetailHistorialResponse) {
    this.menuAbierto = null;
    this.dataTicketDetalle = ticket;
    this.openModalRechazar();
  }

  detalle(ticket: TicketDetailHistorialResponse) {
    this.openModalDetalle(ticket);
    this.menuAbierto = null;
  }

  aprobarTicket(ticket: TicketDetailHistorialResponse) {
    this.menuAbierto = null;

    const ticketTemp: TicketRequest = {
      estado_general: 'A',
      id_usuario_ti: this.localStorageUsuarioService.getUsuario().id,
      fecha_ti: new Date(),
      estado_ti: true,
    };

    this.ticketService.updateTicket(ticket.id_ticket, ticketTemp).subscribe({
      next: (data: TicketUpdate) => {

        ticket.estado_general = 'A';
        ticket.estado_general_descripcion = 'LISTO PARA ALMACÉN';

        ticket.estado.informatica.id_usuario = this.localStorageUsuarioService.getUsuario().id;
        ticket.estado.informatica.nombre = this.localStorageUsuarioService.getUsuario().nombre;
        ticket.estado.informatica.estado = true;
        ticket.estado.informatica.fecha = new Date();
        ticket.estado.informatica.mensaje = '';

        console.log(data.message);
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
        } else {
          console.error('Error del servidor:', err);
        }
      },complete: () => {
        this.notificationService.decrementar(); }

    });
  }
  // RECHAZAR
  rechazarTicket(ticket: TicketDetailHistorialResponse) {
    const ticketTemp: TicketRequest = {
      estado_general: 'R',
      id_usuario_ti: this.localStorageUsuarioService.getUsuario().id,
      fecha_ti: new Date(),
      estado_ti: false,
      ti_mensaje: this.mensajeRechazo || 'solicitud rechazada',
    };

    this.ticketService.updateTicket(ticket.id_ticket, ticketTemp).subscribe({
      next: (data: TicketUpdate) => {

        ticket.estado_general = 'R';
        ticket.estado_general_descripcion = 'RECHAZADO';

        ticket.estado.informatica.id_usuario = this.localStorageUsuarioService.getUsuario().id;
        ticket.estado.informatica.nombre = this.localStorageUsuarioService.getUsuario().nombre;
        ticket.estado.informatica.estado = false;
        ticket.estado.informatica.fecha = new Date();
        ticket.estado.informatica.mensaje = ticketTemp.ti_mensaje!;

        console.log(data.message);
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
        } else {
          console.error('Error del servidor:', err);
        }
      },
      complete: () => {
        console.log('updateTicket completo');
        this.closeModalRechazar();
        this.closeModalDetalle();
        this.notificationService.decrementar();
      }
    });
  }

 

  obtenerParametrosInformatica() {
    this.totalPendentes = this.historialTicketsTemp.filter(ticket => ticket.estado_general === 'I').length;
    this.notificationService.setState({cantidad: this.totalPendentes, estado: 'I'});
  }



}
