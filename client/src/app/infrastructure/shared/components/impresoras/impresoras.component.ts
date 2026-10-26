import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoutesEnum } from '../../../core/enum/routes.enum';
import { ImpresoraService } from '../../../services/remoto/impresora/impresora.service';
import { ImpresoraDetailResponse, ModeloDto } from '../../../../domain/dto/impresoraResponse.dto';
import { FormsModule } from '@angular/forms';
import { marcaResponseCreate, marcaResponseUpdate } from '../../../../domain/dto/marcaResponse';
import { Marca } from '../../../../domain/model/marca.model';
import { MarcaUseCasesService } from '../../../../useCase/marca/marca-use-cases.service';
import { ModeloUseCaseService } from '../../../../useCase/modeloUseCase/modelo-use-case.service';
import { ModeloRequest } from '../../../../domain/dto/modeloRequest.dto';
import { ModeloCreate, ModeloUpdate } from '../../../../domain/dto/modeloResponse.dto';
import { TipoEquipoService } from '../../../services/remoto/tipoEquipo/tipo-equipo.service';
import { TipoEquipo } from '../../../../domain/model/tipoEquipo.model';
import { TipoEquipoResponse } from '../../../../domain/dto/tipoEquipoResponse.dto';
import { ConsumibleResponse } from '../../../../domain/dto/consumibleResponse.dto';
import { ConsumibleService } from '../../../services/remoto/consumible/consumible.service';
import { TipoConsumibleService } from '../../../services/remoto/tipoConsumible/tipo-consumible.service';
import { TipoConsumible } from '../../../../domain/model/tipoConsumible.model';
import { ModeloConsumibleUseCaseService } from '../../../../useCase/modeloConsumible/modelo-consumible-use-case.service';
import { ModeloConsumibleRequest } from '../../../../domain/dto/modeloConsumibleRequest.dto';
import { ModeloConsumibleCreate, ModeloConsumibleDelete } from '../../../../domain/dto/modeloConsumibleResponse.dto';
import { ModeloConsumibleService } from '../../../services/remoto/modeloConsumible/modelo-consumible.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-impresoras',
  imports: [CommonModule, FormsModule],
  templateUrl: './impresoras.component.html',
  styleUrl: './impresoras.component.scss'
})
export class ImpresorasComponent implements OnInit {

  constructor(
    private router: Router,
    private marcaUseCaseService: MarcaUseCasesService,
    private impresoraService: ImpresoraService,
    private modeloUseCaseService: ModeloUseCaseService,
    private tipoEquipoService: TipoEquipoService,
    private consumibleService: ConsumibleService,
    private tipoConsumibleService: TipoConsumibleService,
    private modeloConsumibleUseCaseService: ModeloConsumibleUseCaseService,
    private modeloConsumible: ModeloConsumibleService
  ) { }

  isModalOpenMarca = false;
  isActiveMarca = true;
  isModalOpenModelo = false;
  isActiveModelo = true;
  isModalOpenConsumible = false;
  menuAbiertoModeloId: number | null = null;
  listImpresoras: ImpresoraDetailResponse[] = [];
  listConsumibles: ConsumibleResponse[] = [];
  listImpresorasTemp: ImpresoraDetailResponse[] = [];
  tiposEquipo: TipoEquipoResponse[] = [];
  modificarMarca: boolean = false;
  modificarModelo: boolean = false;

  mostrarErrorMarcaForm = false;
  mostrarErrorModeloForm = false;

  tiposConsumible: TipoConsumible[] = [];
  listConsumiblesFiltrado: any[] = [];

  marcalabel: string = "";
  modelolabel: string = "";
  tipoEquipolabel: string = "";

  id_tipo_consumible_selected: number = 0;
  id_consumible_selected: number = 0;
  id_marca_selected: number = 0;
  id_modelo_selected: number = 0;
  id_tipo_equipo_selected: number = 0;

  ConsumibleMessage: string = "seleccione tipo de consumible.";


  marcaForm: Marca = {
    id_marca: 0,
    marca: '',
    estado: false
  };

  modeloForm: ModeloRequest = {
    id_modelo: 0,
    modelo: '',
    id_marca: 0,
    id_tipo_equipo: 0,
    estado: null
  };

  ngOnInit() {
    this.getImpressorasDetails();
    this.ListarConsumibles();
    this.getTipoConsumibles();
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

  openModalMarcaCreate() {
    this.isActiveMarca = true;
    this.marcaForm = {
      id_marca: 0,
      marca: '',
      estado: this.isActiveMarca
    }
    this.isModalOpenMarca = true;
    this.modificarMarca = false;
  }
  openModalMarcaUpdate(marca: ImpresoraDetailResponse) {
    this.isModalOpenMarca = true;
    this.modificarMarca = true;
    this.isActiveMarca = marca.estado;
    this.marcaForm = {
      id_marca: marca.id_marca,
      marca: marca.marca,
      estado: this.isActiveMarca
    }
  }
  closeModalMarca() {
    this.isModalOpenMarca = false;
  }

  openModalModeloCreate(id_marca: number) {
    this.isModalOpenModelo = true;
    this.modificarModelo = false;
    this.getTipoEquipos()
    this.limpiarFormularioModelo();
    this.modeloForm = {
      id_modelo: 0,
      modelo: '',
      estado: this.isActiveModelo,
      id_marca: id_marca,
      id_tipo_equipo: 0
    }
  }

  openModalModeloUpdate(id_marca: number, modelo: ModeloDto) {
    this.getTipoEquipos()
    this.modeloForm = {
      id_modelo: modelo.id_modelo,
      modelo: modelo.modelo,
      estado: modelo.estado,
      id_marca: id_marca,
      id_tipo_equipo: modelo.tipo_equipo.id_tipo_equipo
    }
    this.isModalOpenModelo = true;
    this.modificarModelo = true;
  }

  closeModalModelo() {
    this.isModalOpenModelo = false;
  }


  openModalConsumibleCreate(marca: any, modelo: any) {
    this.listConsumiblesFiltrado = [];
    this.id_consumible_selected = 0;
    this.id_tipo_consumible_selected = 0;
    this.isModalOpenConsumible = true;
    console.log("marca:", marca, "modelo:", modelo);
    this.marcalabel = marca.marca;
    this.modelolabel = modelo.modelo;
    this.tipoEquipolabel = modelo.tipo_equipo.tipo_equipo;

    this.id_marca_selected = marca.id_marca;
    this.id_modelo_selected = modelo.id_modelo;
    this.id_tipo_equipo_selected = modelo.tipo_equipo.id_tipo_equipo;


  }

  closeModalConsumible() {
    this.isModalOpenConsumible = false;
  }

  printConfig() {
    this.router.navigate([
      '/principal',
      RoutesEnum.IMPRESORAS_CONFIG
    ]);
  }

  getImpressorasDetails() {
    this.impresoraService.getAllImpresorasDetail().subscribe({
      next: (data: ImpresoraDetailResponse[]) => {
        this.listImpresoras = data;
        this.listImpresorasTemp = data;
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
  // HANDLER MARCA
  CreateMarca() {
    const marcaTemp: Marca = {
      marca: this.marcaForm.marca,
      estado: this.marcaForm.estado,
      id_marca: 0
    };
    this.marcaUseCaseService.createMarca(marcaTemp).subscribe({
      next: (data: marcaResponseCreate) => {
        console.log('Marca creado', data);
        this.getImpressorasDetails();
        this.closeModalMarca();
        this.mostrarToast('success', 'Marca creada correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarErrorMarcaForm = true;
          setTimeout(() => {
            this.mostrarErrorMarcaForm = false;
          }, 3000);
        } else {
          console.error('Error del servidor:', err);
          this.mostrarToast('error', 'Error en el servidor');
        }
      }
    });
  }

  UpdateMarca() {

    const marca = {
      id_marca: this.marcaForm.id_marca,
      marca: this.marcaForm.marca,
      estado: this.isActiveMarca
    };

    console.log("marca:", marca);
    this.marcaUseCaseService.updateMarca(marca.id_marca, marca).subscribe({
      next: (data: marcaResponseUpdate) => {
        console.log('Marca actualizado', data.message);
        this.getImpressorasDetails();
        this.closeModalMarca();
        this.mostrarToast('success', 'Marca actualizada correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarErrorMarcaForm = true;
          setTimeout(() => {
            this.mostrarErrorMarcaForm = false;
          }, 3000);
        } else {
          console.error('Error del servidor:', err);
          this.mostrarToast('error', 'Error en el servidor');
        }
      }
    });
  }

  actionMarca() {
    if (this.modificarMarca) {
      this.UpdateMarca();
    }
    else {
      this.CreateMarca();
    }
  }

  // HANDLER MODELO

  CreateModelo() {
    const modeloTemp: ModeloRequest = {
      id_marca: this.modeloForm.id_marca,
      modelo: this.modeloForm.modelo,
      estado: this.isActiveModelo,
      id_tipo_equipo: this.modeloForm.id_tipo_equipo
    };

    console.log("modeloTemp:", modeloTemp);
    this.modeloUseCaseService.createModelo(modeloTemp).subscribe({
      next: (data: ModeloCreate) => {
        console.log('Modelo creado', data);
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "error",
            title: "datos incompletos"
          });
          // this.mostrarErrorModeloForm = true;
          // setTimeout(() => {
          //   this.mostrarErrorModeloForm = false;
          // }, 3000);
        } else {
          console.error('Error del servidor:', err);
          Swal.mixin({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          }).fire({
            icon: "error",
            title: "Se perdion la conexión con el servidor"
          });
        }
      },
      complete: () => {
        console.log('createModelo completo');
        this.getImpressorasDetails();
        this.closeModalModelo();
        Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "Modelo creado correctamente"
        });

      }
    });
  }

  UpdateModelo() {
    const modelo: ModeloRequest = {
      id_modelo: this.modeloForm.id_modelo,
      id_marca: this.modeloForm.id_marca,
      id_tipo_equipo: this.modeloForm.id_tipo_equipo,
      modelo: this.modeloForm.modelo,
      estado: this.isActiveModelo
    };
    console.log("modelo:", modelo);
    this.modeloUseCaseService.updateModelo(modelo.id_modelo!, modelo).subscribe({
      next: (data: ModeloUpdate) => {
        console.log('Modelo actualizado', data.message);
        this.getImpressorasDetails();
        this.closeModalModelo();
        this.mostrarToast('success', 'Modelo actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', `Error de validación: ${err.message}`);
          return;
        } 
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');
      }
    });
  }

  actionModelo() {
    if (this.modificarModelo) {
      this.UpdateModelo();
    } else {
      this.CreateModelo();
    }
  }

  getTipoEquipos() {
    this.tipoEquipoService.getAllTiposEquipo().subscribe({
      next: (data: TipoEquipo[]) => {
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

  limpiarFormularioModelo() {
    this.modeloForm.id_modelo = 0;
    this.modeloForm.modelo = '';
    this.modeloForm.estado = null;
    this.modeloForm.id_marca = 0;
    this.modeloForm.id_tipo_equipo = 0;
  }

  // HANDER CONSUMIBLE

  ListarConsumibles() {
    this.consumibleService.getConsumibles().subscribe({
      next: (data: ConsumibleResponse[]) => {
        this.listConsumibles = data;
        console.log(this.listConsumibles)
      },
      error: (err) => {
        console.error("error login", err);
      },
      complete: () => {
        console.log("getAllConsumibles completo");
      }
    });
  }

  asociarConsumible() {
    const modeloConsumibleTemp: ModeloConsumibleRequest = {
      id_modelo: this.id_modelo_selected,
      id_consumible: Number(this.id_consumible_selected)
    };

    console.log("modeloConsumibleTemp:", modeloConsumibleTemp);
    this.modeloConsumibleUseCaseService.createModeloConsumible(modeloConsumibleTemp).subscribe({
      next: (data: ModeloConsumibleCreate) => {
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
        Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "error",
          title: "Se perdion la conexión con el servidor"
        });
      },
      complete: () => {
        console.log("getAllConsumibles completo");
        this.getImpressorasDetails();
        this.closeModalConsumible();
        Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "Consumible creado correctamente"
        });
      }
    });

  }

  desasociarConsumible(idModeloConsumible: number) {
    this.modeloConsumible.deleteModeloConsumible(idModeloConsumible).subscribe({
      next: (data: ModeloConsumibleDelete) => {
        console.log(data);
      },
      error: (err) => {
        console.error("error login", err);
        Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "error",
          title: "Se perdion la conexión con el servidor"
        });
      },
      complete: () => {
        console.log("getAllConsumibles completo");
        this.getImpressorasDetails();
        this.closeModalConsumible();
        Swal.mixin({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        }).fire({
          icon: "success",
          title: "Consumible eliminado correctamente"
        });
      }
    });
  }


  filtrarConsumibles(
    idTipoConsumible?: number,
    idMarca?: number,
  ): void {

    this.listConsumiblesFiltrado = this.listConsumibles.filter((consumible: ConsumibleResponse) => {
      return (
        (idTipoConsumible == null || consumible.id_tipo_consumible === idTipoConsumible) &&
        (idMarca == null || consumible.id_marca === idMarca) 
      );
    });


    if (this.listConsumiblesFiltrado.length === 0) {

      this.ConsumibleMessage = "no hay consumibles para este tipo de equipo.";
      setTimeout(() => {
        this.ConsumibleMessage = "seleccione tipo de consumible.";
      }, 3000);

    }

  }

  onTipoConsumibleChange(): void {
    this.filtrarConsumibles(Number(this.id_tipo_consumible_selected), Number(this.id_marca_selected));
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

  // BUSCAR EN OBJETO 
  buscarEnObjeto(event: any): void {
    const textoBusqueda = event.target.value.toLowerCase().trim();
    this.listImpresoras = this.listImpresorasTemp.filter((marca: any) => {
      const coincideMarca = marca.marca.toLowerCase().includes(textoBusqueda);
      const coincideModelo = (marca.modelos ?? []).some((modelo: any) =>
        modelo.modelo.toLowerCase().includes(textoBusqueda)
      );
      const coincideConsumible = (marca.modelos ?? []).some((modelo: any) =>
        (modelo.consumibles ?? []).some((consumible: any) =>
          consumible.nro_parte.toLowerCase().includes(textoBusqueda)
        )
      );
      return coincideMarca || coincideModelo || coincideConsumible;
    });
  }

  getTotalModelos(): number {
    return this.listImpresorasTemp.reduce((total, marca) => {
      return total + (marca.modelos?.length || 0);
    }, 0);
  }

  getTotalSuministros(): number {
    return this.listImpresorasTemp.reduce((totalMarcas, marca) => {
      return totalMarcas + (marca.modelos ?? []).reduce((totalModelos: number, modelo: any) => {
        return totalModelos + (modelo.consumibles?.length || 0);
      }, 0);
    }, 0);
  }

  toggleMenuModelo(idModelo: number, event: Event): void {
    event.stopPropagation();
    this.menuAbiertoModeloId = this.menuAbiertoModeloId === idModelo ? null : idModelo;
  }

  @HostListener('document:click')
  cerrarMenuModelo(): void {
    this.menuAbiertoModeloId = null;
  }
}
