import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketDetailHistorialResponse } from '../../../../domain/dto/ticketResponse.dto';
import { TicketService } from '../../../services/remoto/ticket/ticket.service';
import { LocalStorageUsuarioService } from '../../../services/local/local-storage-usuario.service';
import { NotificationService } from '../../../services/local/notification.service';

@Component({
  selector: 'app-historial',
  imports: [CommonModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent implements OnInit {

  historialTickets: TicketDetailHistorialResponse[] = []
  historialTicketsTemp: TicketDetailHistorialResponse[] = []
  constructor(private ticketService: TicketService, private localStorageUsuarioService: LocalStorageUsuarioService, private notificationService: NotificationService) { }

  anio: string = '';
  id_rol: number = 0;
  id_usuario: number = 0;

  isModalOpenDetalle = false;
  dataTicketDetalle: TicketDetailHistorialResponse | null = null;


  totalSolicitudes: number = 0;
  totalPendentes: number = 0;
  totalAlmacen: number = 0;
  totalFinalizados: number = 0;

  ngOnInit(): void {
    this.getUserNameRol();

  }

  openModalDetalle(ticket: TicketDetailHistorialResponse) {
    this.isModalOpenDetalle = true;
    this.dataTicketDetalle = ticket;
  }

  closeModalDetalle() {
    this.isModalOpenDetalle = false;
  }

  getUserNameRol() {
    const user = this.localStorageUsuarioService.getUsuario();
    console.log('usuario encontrado:', user);
    this.id_usuario = user.id;
    this.id_rol = user.rol.id;
    this.anio = new Date().getFullYear().toString();

    console.log('id_usuario:', this.id_usuario);
    console.log('id_rol:', this.id_rol);
    console.log('anio:', this.anio);
    this.obtenerTicketsHistorial(this.anio, this.id_usuario, this.id_rol);
  }

  obtenerTicketsHistorial(anio: string, id_usuario: number, id_rol: number) {
    this.ticketService.getAllTicketsHistorialDetails(anio, id_usuario, id_rol).subscribe({
      next: (data: TicketDetailHistorialResponse[]) => {
        this.historialTickets = data;
        this.historialTicketsTemp = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllTicketsHistorialDetails completo");
        this.obtenerParametros()
      }
    });

  }

  obtenerParametros() {
    this.totalSolicitudes = this.historialTickets.length;
    this.totalPendentes = this.historialTicketsTemp.filter(ticket => ticket.estado_general === 'I').length;
    this.totalAlmacen = this.historialTicketsTemp.filter(ticket => ticket.estado_general === 'A').length;
    this.totalFinalizados = this.historialTicketsTemp.filter(ticket => ticket.estado_general === 'F').length;

    const user = this.localStorageUsuarioService.getUsuario();
    let cantidadNotificaciones = 0;
    let estado: 'I' | 'A' | 'F' | 'R' = 'I';


    switch (user.rol.rol) {

      case 'INFORMATICA': // 
        cantidadNotificaciones = this.totalPendentes;
        estado = 'I';
        break;

      case 'ALMACEN': // 
        cantidadNotificaciones = this.totalAlmacen;
        estado = 'A';
        break;
    }

    this.notificationService.setState({cantidad: cantidadNotificaciones, estado: estado});
  }

  // BUSCAR EN OBJETO 
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

}
