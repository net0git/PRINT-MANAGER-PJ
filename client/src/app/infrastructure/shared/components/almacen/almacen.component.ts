import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailHistorialResponse, TicketUpdate } from '../../../../domain/dto/ticketResponse.dto';
import { TicketService } from '../../../services/remoto/ticket/ticket.service';
import { TicketRequest } from '../../../../domain/dto/ticketRequest.dto';
import { LocalStorageUsuarioService } from '../../../services/local/local-storage-usuario.service';
import { FormsModule } from '@angular/forms';
import { ConsumibleDto, ImpresoraDetailResponse } from '../../../../domain/dto/impresoraResponse.dto';
import { ImpresoraService } from '../../../services/remoto/impresora/impresora.service';
import { NotificationService } from '../../../services/local/notification.service';

@Component({
  selector: 'app-almacen',
  imports: [CommonModule, FormsModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements OnInit {
  anio = new Date().getFullYear().toString();

  historialTickets: TicketDetailHistorialResponse[] = []
  historialTicketsTemp: TicketDetailHistorialResponse[] = []
  menuAbierto: number | null = null;

  isModalOpenDetalle = false;
  isModalOpenAprobar = false;
  isModalOpenRechazar = false;
  dataTicketDetalle: TicketDetailHistorialResponse | null = null;

  mensajeRechazo: string | null = null;

  listConsumibles: ConsumibleDto[] = []
  idconsumibleSeleccionada: number | null = null;

    totalAlmacen: number = 0;

  constructor(
    private ticketService: TicketService,
    private localStorageUsuarioService: LocalStorageUsuarioService,
    private impresoraService: ImpresoraService,
    private notificationService: NotificationService) { }

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

  ngOnInit(): void {
    this.getAllAlmacen();
  }

   openModalAprobar(ticket: TicketDetailHistorialResponse) {
    this.idconsumibleSeleccionada = null;
    this.isModalOpenAprobar = true;
    this.dataTicketDetalle = ticket;
    this.obtenerConsumiblesImpresora(ticket.impresora.id_marca, ticket.impresora.id_modelo, ticket.consumible.id_tipo_consumible);

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

  getAllAlmacen() {
    this.ticketService.getAllAlmacen(this.anio).subscribe({
      next: (data: TicketDetailHistorialResponse[]) => {
        this.historialTickets = data;
        this.historialTicketsTemp = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllAlmacen completo");
        this.obtenerParametros();
      }
    });
  }

  buscarEnObjeto(event: any): void {
    const textoBusqueda = event.target.value.toLowerCase().trim();
    this.historialTickets = this.historialTicketsTemp.filter((ticket: TicketDetailHistorialResponse) => {
      const coincideEstado = ticket.estado_general_descripcion.toLowerCase().includes(textoBusqueda);
      const coincideMarca = ticket.impresora.marca.toLowerCase().includes(textoBusqueda);
      const coincideConsumible = (ticket.consumible.tipo_consumible.toLowerCase().includes(textoBusqueda));
      const coincideArea = (ticket.area.area.toLowerCase().includes(textoBusqueda));
      return coincideMarca || coincideEstado || coincideConsumible || coincideArea;
    });
  }

  MenuRechazar(ticket: TicketDetailHistorialResponse) {
    this.menuAbierto = null;
    this.dataTicketDetalle = ticket;
    this.openModalRechazar();
  }


  openModalDetalle(ticket: TicketDetailHistorialResponse) {
    this.isModalOpenDetalle = true;
    this.dataTicketDetalle = ticket;
    console.log(ticket)
    console.log(ticket.impresora.id_marca, ticket.impresora.id_modelo, ticket.consumible.id_tipo_consumible);
    this.obtenerConsumiblesImpresora(ticket.impresora.id_marca, ticket.impresora.id_modelo, ticket.consumible.id_tipo_consumible);
  }

  closeModalDetalle() {
    this.isModalOpenDetalle = false;
  }


  detalle(ticket: TicketDetailHistorialResponse) {
    this.openModalDetalle(ticket);
    this.menuAbierto = null;
  }

  aprobarTicket(ticket: TicketDetailHistorialResponse) {
    this.menuAbierto = null;

    const ticketTemp: TicketRequest = {
      estado_general: 'F',
      id_usuario_al: this.localStorageUsuarioService.getUsuario().id,
      fecha_al: new Date(),
      estado_al: true,
      id_consumible: Number(this.idconsumibleSeleccionada),
    };

    console.log("ticketTemp:", ticketTemp);

    if(ticketTemp.id_consumible === 0){
      alert('Seleccione el componente');
      return;
    }
    this.ticketService.updateTicket(ticket.id_ticket, ticketTemp).subscribe({
      next: (data: TicketUpdate) => {

        ticket.estado_general = 'F';
        ticket.estado_general_descripcion = 'FINALIZADO';
        ticket.estado.almacen.id_usuario = this.localStorageUsuarioService.getUsuario().id;
        ticket.estado.almacen.nombre = this.localStorageUsuarioService.getUsuario().nombre;
        ticket.estado.almacen.estado = true;
        ticket.estado.almacen.fecha = new Date();
        ticket.estado.almacen.mensaje = '';
        ticket.consumible.id_consumible = Number(this.idconsumibleSeleccionada);

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
        this.closeModalAprobar();
        this.closeModalDetalle();
        this.notificationService.decrementar();
      }
    });
  }
  // RECHAZAR
  rechazarTicket(ticket: TicketDetailHistorialResponse) {
    const ticketTemp: TicketRequest = {
      estado_general: 'R',
      id_usuario_al: this.localStorageUsuarioService.getUsuario().id,
      fecha_al: new Date(),
      estado_al: false,
      al_mensaje: this.mensajeRechazo || 'solicitud rechazada',
    };

    this.ticketService.updateTicket(ticket.id_ticket, ticketTemp).subscribe({
      next: (data: TicketUpdate) => {

        ticket.estado_general = 'R';
        ticket.estado_general_descripcion = 'RECHAZADO';
        ticket.estado.almacen.id_usuario = this.localStorageUsuarioService.getUsuario().id;
        ticket.estado.almacen.nombre = this.localStorageUsuarioService.getUsuario().nombre;
        ticket.estado.almacen.estado = false;
        ticket.estado.almacen.fecha = new Date();
        ticket.estado.almacen.mensaje = ticketTemp.ti_mensaje!;

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




  obtenerConsumiblesImpresora(id_marca: number, id_modelo: number, id_tipo_consumible: number) {
    this.impresoraService.getOneImpresora(id_marca, id_modelo, id_tipo_consumible).subscribe({
      next: (data: ImpresoraDetailResponse) => {
        console.log("consumibles:", data.modelos[0].consumibles);
        this.listConsumibles = data.modelos[0].consumibles;
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllImpressoras completo");
      }
    });
  }

   obtenerParametros() {
    let totalAlmacen = this.historialTicketsTemp.filter(ticket => ticket.estado_general === 'A').length;
    console.log('historialTicketsTemp:', this.historialTicketsTemp);
    console.log('totalAlmacen:', totalAlmacen);
    this.notificationService.setState({cantidad: totalAlmacen, estado: 'A'});
  }
}
