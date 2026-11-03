import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective } from 'ngx-mask';
import { SedeDetails } from '../../../../domain/dto/sedeResponse.dto';
import { SedeService } from '../../../services/remoto/sede/sede.service';
import { ImpresoraService } from '../../../services/remoto/impresora/impresora.service';
import { ConsumibleDto, ImpresoraDetailResponse } from '../../../../domain/dto/impresoraResponse.dto';
import { TipoConsumibleService } from '../../../services/remoto/tipoConsumible/tipo-consumible.service';
import { TipoConsumibleResponse } from '../../../../domain/dto/tipoConsumible.dto';
import { TicketUseCaseService } from '../../../../useCase/ticket/ticket-use-case.service';
import { TicketRequest } from '../../../../domain/dto/ticketRequest.dto';
import { LocalStorageUsuarioService } from '../../../services/local/local-storage-usuario.service';
import { TicketCreate } from '../../../../domain/dto/ticketResponse.dto';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../../core/enum/routes.enum';

@Component({
  selector: 'app-solicitud',
  imports: [FormsModule, CommonModule, NgxMaskDirective],
  templateUrl: './solicitud.component.html',
  styleUrl: './solicitud.component.scss'
})
export class SolicitudComponent implements OnInit {

  listSedes: SedeDetails[] = [];
  listAreasFilter: any[] = [];

  listImpresoras: ImpresoraDetailResponse[] = [];
  listModelosFilter: any[] = [];
  listTiposConsumibles: TipoConsumibleResponse[] = [];

  idSedeSeleccionada: number | null = null;
  idAreaSeleccionada: number | null = null;
  idMarcaSeleccionada: number | null = null;
  idModeloSeleccionada: number | null = null;
  idTipoConsumibleSeleccionada: number | null = null;
  ipSeleccionado: string | null = null;
  descripcion: string | null = null;

  constructor(private tipoConsumibleService: TipoConsumibleService, 
    private SedeService: SedeService, 
    private impresoraService: ImpresoraService,
    private ticketUseCaseService: TicketUseCaseService,
    private localStorageUsuarioService: LocalStorageUsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSedes();
    this.getImpresorasDetails();
    this.getAllTipoConsumibles();
  }

  getAllSedes() {
    this.SedeService.getSedesDetails().subscribe({
      next: (data: SedeDetails[]) => {
        this.listSedes = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllSedes completo");
      }
    })

  }

  onSedeChange(): void {

    const sede = this.listSedes.find(
      (item: any) => item.id_sede === Number(this.idSedeSeleccionada)
    );

    this.listAreasFilter = sede?.areas ?? [];
    console.log("lista de areas", this.listAreasFilter);

    // Reinicia la selección del área
    this.idAreaSeleccionada = null;
  }

  getImpresorasDetails() {
    this.impresoraService.getAllImpresorasDetail().subscribe({
      next: (data: ImpresoraDetailResponse[]) => {
        this.listImpresoras = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllImpressoras completo");
      }
    });
  }

  getAllTipoConsumibles() {
    this.tipoConsumibleService.getAllTiposConsumibles().subscribe({
      next: (data: TipoConsumibleResponse[]) => {
        this.listTiposConsumibles = data;
      },
      error: (err) => { console.error("error login", err); },
      complete: () => { console.log("getAllTiposConsumibles completo"); }
    });
  }

  onModeloChange(): void {
    const marca = this.listImpresoras.find(
      (item: any) => item.id_marca === Number(this.idMarcaSeleccionada)
    );

    this.listModelosFilter = marca?.modelos ?? [];
    // Reinicia la selección del modelo
    this.idModeloSeleccionada = null;
  }

  // HANDLER TICKET

  CreateTicket() {
    const user = this.localStorageUsuarioService.getUsuario();
    const ticketTemp: TicketRequest = {
      id_area: Number(this.idAreaSeleccionada),
      id_modelo: Number(this.idModeloSeleccionada),
      id_usuario: user.id,
      ip: this.ipSeleccionado,
      descripcion: this.descripcion,
      id_tipo_consumible: Number(this.idTipoConsumibleSeleccionada),
    };

    console.log("ticketTemp:", ticketTemp);
    this.ticketUseCaseService.createTicket(ticketTemp).subscribe({
      next: (data: TicketCreate) => {
        console.log('Ticket creado', data);
        // this.ticketUseCaseService.createTicketStatus( data.id_ticket).subscribe({
        //   next: (data: TicketStatusCreate) => {
        //     console.log('Ticket Status creado', data);
        //   },
        //   error: (err) => {
        //     if (err instanceof Error) {
        //       console.error('Error de validación:', err.message);
        //     } else {
        //       console.error('Error del servidor:', err);
        //       alert(err);
        //     }
        //   },
        //   complete: () => {
        //     console.log('createTicketStatus completo');
        //   }
        // });
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
        } else {
          console.error('Error del servidor:', err);
          alert(err);
        }
      },
      complete: () => {
        console.log('createTicket completo');
        this.goToHistorial();
        
    
      }
    });

  }

  cancelTicket() {
    this.idSedeSeleccionada = null;
    this.idAreaSeleccionada = null;
    this.idMarcaSeleccionada = null;
    this.idModeloSeleccionada = null;
    this.idTipoConsumibleSeleccionada = null;
    this.ipSeleccionado = null;
    this.descripcion = null;
  }

  goToHistorial() {
    this.router.navigate([
      '/principal',
      RoutesEnum.HISTORIAL
    ]);
  }

  
}
