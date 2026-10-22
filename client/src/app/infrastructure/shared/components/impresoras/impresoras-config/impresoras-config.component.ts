import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MarcaService } from '../../../../services/remoto/marca/marca.service';
import { MarcaUseCasesService } from '../../../../../useCase/marca/marca-use-cases.service';
import { TipoConsumibleUseCasesService } from '../../../../../useCase/tipoConsumible/tipo-consumible-use-case.service';
import { marcaResponse, marcaResponseCreate, marcaResponseUpdate } from '../../../../../domain/dto/marcaResponse';
import { Marca } from '../../../../../domain/model/marca.model';
import { TipoConsumible } from '../../../../../domain/model/tipoConsumible.model';
import { TipoConsumibleService } from '../../../../services/remoto/tipoConsumible/tipo-consumible.service';
import { TipoEquipoService } from '../../../../services/remoto/tipoEquipo/tipo-equipo.service';
import { TipoEquipoUseCaseService } from '../../../../../useCase/tipoEquipo/tipo-equipo-use-case.service';
import { TipoEquipoRequest } from '../../../../../domain/dto/tipoEquipoRequest.dto';
import { TipoEquipoResponse } from '../../../../../domain/dto/tipoEquipoResponse.dto';
import { TipoEquipoUpdate } from '../../../../../domain/dto/tipoEquipoResponse.dto';
import { TipoEquipo } from '../../../../../domain/model/tipoEquipo.model';
import { ConsumibleCreate, ConsumibleDetailResponse, ConsumibleUpdate } from '../../../../../domain/dto/consumibleResponse.dto';
import { ConsumibleService } from '../../../../services/remoto/consumible/consumible.service';
import { ConsumibleUseCaseService } from '../../../../../useCase/consumibleUseCase/consumible-use-case.service';
import Swal from 'sweetalert2';
import { ConsumibleRequest } from '../../../../../domain/dto/consumibleRequest.dto';

@Component({
  selector: 'app-impresoras-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './impresoras-config.component.html',
  styleUrl: './impresoras-config.component.scss'
})
export class ImpresorasConfigComponent implements OnInit {
  mostrarFormulario: any = {
    marcas: false,
    tiposConsumible: false,
    tiposEquipo: false,
    consumibles: false
  };

  tiposConsumible: TipoConsumible[] = [];



  tiposEquipo: TipoEquipoResponse[] = [];

  marcas: marcaResponse[] = [];


  modificarMarca: boolean = false;
  modificarTipoConsumible: boolean = false;
  modificarTipoEquipo: boolean = false;
  modificarConsumible: boolean = false;

  marcaForm: Marca = {
    marca: '',
    id_marca: 0,
    estado: false
  };

  tipoConsumibleForm: TipoConsumible = {
    id_tipo_consumible: 0,
    tipo_consumible: ''
  };

  tipoEquipoForm: TipoEquipo = {
    id_tipo_equipo: 0,
    tipo_equipo: '',
    descripcion: ''
  };

  
  consumibleForm: ConsumibleRequest = {
    id_consumible: 0,
    nro_parte: '',
    id_tipo_consumible: 0,
    id_marca: 0
  };

  consumibles: ConsumibleDetailResponse[] = [];
  consumibleTemp: ConsumibleDetailResponse[] = [];


  constructor(
    private marcaService: MarcaService,
    private marcaUseCaseService: MarcaUseCasesService,
    private tipoConsumibleService: TipoConsumibleService,
    private tipoConsumibleUseCaseService: TipoConsumibleUseCasesService,
    private tipoEquipoService: TipoEquipoService,
    private tipoEquipoUseCaseService: TipoEquipoUseCaseService,
    private consumibleService: ConsumibleService,
    private consumibleUseCaseService: ConsumibleUseCaseService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.getMarcas();
    this.getTipoConsumibles();
    this.getTipoEquipos();
    this.getConsumiblesDetails();
  }

  private mostrarToast(
    icon: 'success' | 'error' | 'warning' | 'info',
    title: string
  ): void {
    Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    }).fire({
      icon,
      title
    });
  }
  
  toggleFormulario(tipo: string) {
    this.mostrarFormulario[tipo] = !this.mostrarFormulario[tipo];

    if (!this.mostrarFormulario[tipo]) {
      switch (tipo) {
        case 'marcas':
          this.modificarMarca = false;
          this.limpiarFormularioMarca();
          break;

        case 'tiposConsumible':
          this.modificarTipoConsumible = false;
          this.limpiarFormularioTipoConsumible();
          break;

        case 'tiposEquipo':
          this.modificarTipoEquipo = false;
          this.limpiarFormularioTipoEquipo();
          break;

        case 'consumibles':
          this.modificarConsumible = false;
          this.limpiarFormularioConsumible();
          break;
      }
    }
  }

  // MARCAS
  getMarcas() {
    this.marcaService.getAllMarcas().subscribe({
      next: (data: marcaResponse[]) => {
        this.marcas = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllMarcas completo");
      }
    });
  }

  limpiarFormularioMarca() {
    this.marcaForm = {
      marca: '',
      id_marca: 0,
      estado: false
    };
  }

  abrirFormularioMarcaUpdate(marca: Marca) {
    this.modificarMarca = true;
    this.mostrarFormulario['marcas'] = true;
    this.marcaForm = {
      ...marca
    };
  }

  actionMarca() {
    if (this.modificarMarca) {
      this.updateMarca();
    } else {
      this.createMarca();
    }
  }

  createMarca(): void {
    this.marcaUseCaseService.createMarca(this.marcaForm).subscribe({
      next: () => {
        this.getMarcas();
        this.limpiarFormularioMarca();
        this.mostrarToast('success', 'Marca creada correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Se perdió la conexión con el servidor');
      }
    });
  }

  updateMarca(): void {
    const marcaTemp: Marca = {
      marca: this.marcaForm.marca,
      id_marca: this.marcaForm.id_marca,
      estado: this.marcaForm.estado
    };

    this.marcaUseCaseService
      .updateMarca(this.marcaForm.id_marca, marcaTemp)
      .subscribe({
        next: () => {
          this.getMarcas();
          this.toggleFormulario('marcas');
          this.mostrarToast('success', 'Marca actualizada correctamente');
        },
        error: (err) => {
          if (err instanceof Error) {
            console.error('Error de validación:', err.message);
            this.mostrarToast('error', 'Datos incompletos');
            return;
          }

          console.error('Error del servidor:', err);
          this.mostrarToast('error', 'Se perdió la conexión con el servidor');
        }
      });
  }

  // TIPOS CONSUMIBLE
  actionTipoConsumible() {
    if (this.modificarTipoConsumible) {
      this.updateTipoConsumible();
    } else {
      this.createTipoConsumible();
    }
  }

  limpiarFormularioTipoConsumible() {
    this.tipoConsumibleForm = {
      tipo_consumible: '',
      id_tipo_consumible: 0
    }

  }

  getTipoConsumibles() {
    this.tipoConsumibleService.getAllTiposConsumibles().subscribe({
      next: (data: TipoConsumible[]) => {
        this.tiposConsumible = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllTiposConsumibles completo");
      }
    });
  }

  abrirFormularioTipoConsumibleUpdate(tipoConsumible: TipoConsumible) {
    this.modificarTipoConsumible = true;
    this.mostrarFormulario['tiposConsumible'] = true;
    this.tipoConsumibleForm = {
      ...tipoConsumible
    };
  }

  createTipoConsumible() {
    const tipoConsumibleTemp: TipoConsumible = {
      id_tipo_consumible: 0,
      tipo_consumible: this.tipoConsumibleForm.tipo_consumible,
    };

    this.tipoConsumibleUseCaseService
      .createTipoConsumible(tipoConsumibleTemp.tipo_consumible)
      .subscribe({
        next: (data: marcaResponseCreate) => {
          console.log('Tipo consumible creado', data);
          this.getTipoConsumibles();
          this.limpiarFormularioTipoConsumible();
          this.mostrarToast('success', 'Tipo consumible creado correctamente');
        },
        error: (err) => {
          if (err instanceof Error) {
            console.error('Error de validación:', err.message);
            this.mostrarToast('error', 'Datos incompletos');
            return;
          }

          console.error('Error del servidor:', err);
          this.mostrarToast('error', 'Se perdió la conexión con el servidor');
        }
      });
  }

  updateTipoConsumible() {
    const tipoConsumibleTemp: TipoConsumible = {
      tipo_consumible: this.tipoConsumibleForm.tipo_consumible,
      id_tipo_consumible: this.tipoConsumibleForm.id_tipo_consumible
    };

    console.log("tipoConsumibleTemp:", tipoConsumibleTemp.tipo_consumible);

    this.tipoConsumibleUseCaseService.updateTipoConsumible(this.tipoConsumibleForm.id_tipo_consumible, tipoConsumibleTemp.tipo_consumible).subscribe({
      next: (data: marcaResponseUpdate) => {
        console.log('Tipo consumible actualizado', data.message);
        this.getTipoConsumibles();
        this.limpiarFormularioTipoConsumible();
        this.toggleFormulario('tiposConsumible');
        this.mostrarToast('success', 'Tipo consumible actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }

        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Se perdió la conexión con el servidor');
      }
    });

  }

  // TIPOS DE EQUIPO
  getTipoEquipos() {
    this.tipoEquipoService.getAllTiposEquipo().subscribe({
      next: (data: TipoEquipoResponse[]) => {
        this.tiposEquipo = data;
        console.log("tiposEquipo new", data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllTiposEquipo completo");
      }
    });
  }

  actionTipoEquipo() {
    if (this.modificarTipoEquipo) {
      this.updateTipoEquipo();
    } else {
      this.createTipoEquipo();
    }
  }

  abrirFormularioTipoEquipoUpdate(tipoEquipo: TipoEquipo) {
    this.modificarTipoEquipo = true;
    this.mostrarFormulario['tiposEquipo'] = true;
    this.tipoEquipoForm = {
      ...tipoEquipo
    }
    console.log(this.tipoEquipoForm);
  }

  limpiarFormularioTipoEquipo() {
    this.tipoEquipoForm = {
      tipo_equipo: '',
      descripcion: '',
      id_tipo_equipo: 0
    }

  }

  createTipoEquipo() {
    const tipoEquipoTemp: TipoEquipoRequest = {
      tipo_equipo: this.tipoEquipoForm.tipo_equipo,
      descripcion: this.tipoEquipoForm.descripcion
    };

    this.tipoEquipoUseCaseService.createTipoEquipo(tipoEquipoTemp).subscribe({
      next: (data: marcaResponseCreate) => {
        console.log('Tipo equipo creado', data.message);
        this.getTipoEquipos();
        this.limpiarFormularioTipoEquipo();
        this.toggleFormulario('tiposEquipo');
        this.mostrarToast('success', 'Tipo equipo creado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Se perdió la conexión con el servidor');
      }

    });
  }

  updateTipoEquipo() {
    const tipoEquipoTemp: TipoEquipoRequest = {
      tipo_equipo: this.tipoEquipoForm.tipo_equipo,
      descripcion: this.tipoEquipoForm.descripcion
    };
    console.log("tipoEquipoTemp:", tipoEquipoTemp);
    this.tipoEquipoUseCaseService.updateTipoEquipo(this.tipoEquipoForm.id_tipo_equipo, tipoEquipoTemp).subscribe({
      next: (data: TipoEquipoUpdate) => {
        console.log('Tipo equipo actualizado', data.message);
        this.getTipoEquipos();
        this.limpiarFormularioTipoEquipo();
        this.toggleFormulario('tiposEquipo');
        this.mostrarToast('success', 'Tipo equipo actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Se perdió la conexión con el servidor');
      }
    });
  }

  // CONSUMIBLES
  getConsumiblesDetails() {
    this.consumibleService.getConsumiblesDetails().subscribe({
      next: (data: ConsumibleDetailResponse[]) => {
        this.consumibles = data;
        this.consumibleTemp = data;
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllConsumibles completo");
      }
    });
  }

  obtenerDatosConsumible(dataConsumible: ConsumibleDetailResponse) {
    this.consumibleForm.id_consumible = dataConsumible.id_consumible
    this.consumibleForm.nro_parte = dataConsumible.nro_parte
    this.consumibleForm.id_tipo_consumible = dataConsumible.tipoConsumible.id_tipo_consumible
    this.consumibleForm.id_marca = dataConsumible.marca.id_marca
  }

  abrirFormularioConsumibleUpdate(dataConsumible: ConsumibleDetailResponse) {
    this.modificarConsumible = true;
    this.mostrarFormulario['consumibles'] = true;
    this.obtenerDatosConsumible(dataConsumible)
  }

  limpiarFormularioConsumible() {
    this.consumibleForm.id_consumible = 0;
    this.consumibleForm.nro_parte = '';
    this.consumibleForm.id_tipo_consumible = 0;
    this.consumibleForm.id_marca = 0
  }

  createConsumible() {
    this.consumibleUseCaseService.createConsumible(this.consumibleForm).subscribe({
      next: (data: ConsumibleCreate) => {
        console.log(data.message)
        this.getConsumiblesDetails();
        this.limpiarFormularioConsumible();
        this.toggleFormulario('consumibles');
        this.mostrarToast('success', 'Consumible creado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Se perdió la conexión con el servidor');
      }
    })
  }

  updateConsumible() {
    this.consumibleUseCaseService.updateConsumible(Number(this.consumibleForm.id_consumible), this.consumibleForm).subscribe({
      next: (data: ConsumibleUpdate) => {
        console.log('Consumible actualizado', data.message)
        this.getConsumiblesDetails();
        this.limpiarFormularioConsumible();
        this.toggleFormulario('consumibles');
        this.mostrarToast('success', 'Consumible actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Se perdió la conexión con el servidor');
      }
    })
  }

  actionConsumible() {
    if (this.modificarConsumible) {
      this.updateConsumible();
    } else {
      this.createConsumible();
    }
  }

  // OTROS METODOS
  buscarEnObjeto(event: any) {
    // this.p = 1
    const textoBusqueda =
      event.target.value.toLowerCase();

    this.consumibles = this.consumibleTemp.filter(consumible => {

      const nombreCompleto = `
      ${consumible.nro_parte}
      ${consumible.tipoConsumible.tipo_consumible}
      ${consumible.marca.marca}
      
    `.toLowerCase();

      return nombreCompleto.includes(textoBusqueda);
    });
  }

  volver() {
    this.router.navigate(['/principal/impresoras'])
  }
}
