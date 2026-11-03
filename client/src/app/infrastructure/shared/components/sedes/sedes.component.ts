import { Component, OnInit } from '@angular/core';
import { SedeService } from '../../../services/remoto/sede/sede.service';
import { SedeUseCaseService } from '../../../../useCase/sede/sede-use-case.service';
import { SedeDetails } from '../../../../domain/dto/sedeResponse.dto';
import { SedeCreate, SedeUpdate } from '../../../../domain/dto/sedeResponse.dto';
import { CommonModule } from '@angular/common';
import { SedeRequest } from '../../../../domain/dto/sedeRequest.dto';
import { FormsModule } from '@angular/forms';
import { AreaRequest } from '../../../../domain/dto/areaRequest.dto';
import { AreaResponse, AreaUpdate } from '../../../../domain/dto/areaResponse.dto';
import { AreaUseCaseService } from '../../../../useCase/area/area-use-case.service';
import { AreaCreate } from '../../../../domain/dto/areaResponse.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sedes',
  imports: [CommonModule, FormsModule],
  templateUrl: './sedes.component.html',
  styleUrl: './sedes.component.scss'
})
export class SedesComponent implements OnInit {

  listSedes: SedeDetails[] = [];
  listSedesTemp: SedeDetails[] = [];
  isModalOpenSede = false;
  isActiveSede: boolean = true;
  modificarSede: boolean = false;


  isModalOpenArea = false;
  isActiveArea: boolean = true;
  modificarArea: boolean = false;

  sedeForm: SedeRequest = {
    id_sede: 0,
    sede: '',
    direccion: '',
    estado: null
  };

  areaForm: AreaRequest = {
    area: '',
    referencia: '',
    id_sede: 0,
    estado: null
  };



  constructor(private sedeService: SedeService,
    private sedeUseCaseService: SedeUseCaseService,
    private areaUseCaseService: AreaUseCaseService,
  ) { }

  ngOnInit(): void {
    this.getAllSedes();
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

  openModalSedeCreate() {
    this.isActiveSede = true;
    this.modificarSede = false;
    this.sedeForm = {
      sede: '',
      direccion: '',
      estado: this.isActiveSede
    }
    this.isModalOpenSede = true;
    this.modificarSede = false;
  }

  openModalSedeUpdate(sede: SedeDetails) {
    this.isModalOpenSede = true;
    this.modificarSede = true;
    this.isActiveSede = sede.estado;
    this.sedeForm = {
      id_sede: sede.id_sede,
      sede: sede.sede,
      direccion: sede.direccion,
      estado: this.isActiveSede
    }
  }

  closeModalSede() {
    this.isModalOpenSede = false;
  }

  openModalAreaCreate(sede: SedeDetails) {
    this.isActiveArea = true;
    this.modificarArea = false;
    // this.sedeForm = {
    //   id_sede: sede.id_sede,
    //   sede: sede.sede,
    //   direccion: sede.direccion,
    //   estado: this.isActiveSede
    // }
    this.areaForm = {
      area: '',
      referencia: '',
      id_sede: sede.id_sede,
      estado: this.isActiveArea
    }
    this.isModalOpenArea = true;
    this.modificarArea = false;
  }

  openModalAreaUpdate(sede: SedeDetails, area: AreaResponse) {
    this.isModalOpenArea = true;
    this.modificarArea = true;
    this.isActiveArea = area.estado;
    console.log("sede:", sede, "area:", area);
    this.areaForm = {
      id_area: area.id_area,
      id_sede: sede.id_sede,
      area: area.area,
      referencia: area.referencia,
      estado: this.isActiveArea
    }

  }

  closeModalArea() {
    this.isModalOpenArea = false;
  }

  getAllSedes() {
    this.sedeService.getSedesDetails().subscribe({
      next: (data: SedeDetails[]) => {
        this.listSedes = data;
        this.listSedesTemp = data;
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

  createSede() {
    const sedeTemp: SedeRequest = {
      sede: this.sedeForm.sede,
      direccion: this.sedeForm.direccion,
      estado: this.isActiveSede
    };
    this.sedeUseCaseService.createSede(sedeTemp).subscribe({
      next: (data: SedeCreate) => {
        console.log('Sede creado', data);
        this.getAllSedes();
        this.closeModalSede();
        this.mostrarToast('success', 'Sede creado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        }
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');
      }
    });
  }

  updateSede() {
    const sedeTemp: SedeRequest = {
      id_sede: this.sedeForm.id_sede,
      sede: this.sedeForm.sede,
      direccion: this.sedeForm.direccion,
      estado: this.isActiveSede
    };
    this.sedeUseCaseService.updateSede(sedeTemp.id_sede!, sedeTemp).subscribe({
      next: (data: SedeUpdate) => {
        console.log('Sede actualizado', data.message);
        this.getAllSedes();
        this.closeModalSede();
        this.mostrarToast('success', 'Sede actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        } 
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');
      }
    });

  }

  ActionSede() {
    if (this.modificarSede) {
      this.updateSede();
    } else {
      this.createSede();
    }
  }

  // HANDLER AREA
  CreateArea() {
    const areaTemp: AreaRequest = {
      area: this.areaForm.area,
      referencia: this.areaForm.referencia,
      id_sede: this.areaForm.id_sede,
      estado: this.isActiveArea
    };
    console.log("areaTemp:", areaTemp);
    this.areaUseCaseService.createArea(areaTemp).subscribe({
      next: (data: AreaCreate) => {
        console.log('Area creado', data);
        this.getAllSedes();
        this.closeModalArea();
        this.mostrarToast('success', 'Area creado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        } 
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');
        
      }
    });
  }

  updateArea() {
    const areaTemp: AreaRequest = {
      id_area: this.areaForm.id_area,
      area: this.areaForm.area,
      referencia: this.areaForm.referencia,
      id_sede: this.areaForm.id_sede,
      estado: this.isActiveArea
    };
    this.areaUseCaseService.updateArea(areaTemp.id_area!, areaTemp).subscribe({
      next: (data: AreaUpdate) => {
        console.log('Area actualizado', data.message);
        this.getAllSedes();
        this.closeModalArea();
        this.mostrarToast('success', 'Area actualizado correctamente');
      },
      error: (err) => {
        if (err instanceof Error) {
          console.error('Error de validación:', err.message);
          this.mostrarToast('error', 'Datos incompletos');
          return;
        } 
        console.error('Error del servidor:', err);
        this.mostrarToast('error', 'Error en el servidor');
      }
    });

  }

  ActionArea() {
    if (this.modificarArea) {
      this.updateArea();
    } else {
      this.CreateArea();
    }
  }

  // INDICADORES
  getAreasActivas(): number {
    return this.listSedesTemp.reduce((total, sede) => {
      return total + (sede.areas?.filter(area => area.estado).length || 0);
    }, 0);
  }

  getAreasTotales(): number {
    return this.listSedesTemp.reduce((total, sede) => {
      return total + (sede.areas?.length || 0);
    }, 0);
  }

  // BUSCADOR
  buscarEnObjeto(event: any): void {
    const textoBusqueda = event.target.value.toLowerCase().trim();

    this.listSedes = this.listSedesTemp.filter((sede: any) => {
      const datosSede = `
      ${sede.sede}
      ${sede.direccion}
    `.toLowerCase();

      const coincideArea = sede.areas?.some((area: any) =>
        `${area.area} ${area.referencia ?? ''}`
          .toLowerCase()
          .includes(textoBusqueda)
      );

      return datosSede.includes(textoBusqueda) || coincideArea;
    });
  }
}
