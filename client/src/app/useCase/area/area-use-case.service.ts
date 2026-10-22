import { Injectable } from '@angular/core';
import { AreaService } from '../../infrastructure/services/remoto/area/area.service';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { AreaCreate, AreaResponse, AreaUpdate } from '../../domain/dto/areaResponse.dto';
import { AreaRequest } from '../../domain/dto/areaRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class AreaUseCaseService {

  constructor(private areaService: AreaService) { }

  validarCampos(area: AreaRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!area.area || area.area === '') {
      errores.push({ campo: 'area', mensaje: 'Campo requerido' });
    }

    return errores;
  }

  createArea(area: AreaRequest): Observable<AreaCreate> {
    const erroresValidacion = this.validarCampos(area);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }
    return this.areaService.createArea(area);
  }

  updateArea(id_area: number, area: AreaRequest): Observable<AreaUpdate> {
    const erroresValidacion = this.validarCampos(area);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }
    return this.areaService.updateArea(id_area, area);
  } 
}
