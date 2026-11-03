import { Injectable } from '@angular/core';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { Observable, throwError } from 'rxjs';
import { TipoEquipoCreate, TipoEquipoUpdate } from '../../domain/dto/tipoEquipoResponse.dto';
import { TipoEquipoService } from '../../infrastructure/services/remoto/tipoEquipo/tipo-equipo.service';
import { TipoEquipoRequest } from '../../domain/dto/tipoEquipoRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class TipoEquipoUseCaseService {

  constructor(private tipoEquipoService: TipoEquipoService) { }

  validarCampos(tipoEquipo: TipoEquipoRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!tipoEquipo.tipo_equipo) {
      errores.push({ campo: 'tipo_equipo', mensaje: 'Campo requerido' });
    }
    if (!tipoEquipo.descripcion) {
      errores.push({ campo: 'descripcion', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createTipoEquipo(dataTipoEquipo: TipoEquipoRequest): Observable<TipoEquipoCreate> {
    const erroresValidacion = this.validarCampos(dataTipoEquipo);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    dataTipoEquipo.tipo_equipo =
      dataTipoEquipo.tipo_equipo.trim()
        .charAt(0).toUpperCase() +
      dataTipoEquipo.tipo_equipo.trim()
        .slice(1).toLowerCase();

    dataTipoEquipo.descripcion =
      dataTipoEquipo.descripcion.trim()
        .charAt(0).toUpperCase() +
      dataTipoEquipo.descripcion.trim()
        .slice(1);

    return this.tipoEquipoService.createTipoEquipo(dataTipoEquipo)
  }

  updateTipoEquipo(id_tipo_equipo: number, dataTipoEquipo: TipoEquipoRequest): Observable<TipoEquipoUpdate> {
    const erroresValidacion = this.validarCampos(dataTipoEquipo);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    dataTipoEquipo.tipo_equipo =
      dataTipoEquipo.tipo_equipo.trim()
        .charAt(0).toUpperCase() +
      dataTipoEquipo.tipo_equipo.trim()
        .slice(1).toLowerCase();

    dataTipoEquipo.descripcion =
      dataTipoEquipo.descripcion.trim()
        .charAt(0).toUpperCase() +
      dataTipoEquipo.descripcion.trim()
        .slice(1);
    return this.tipoEquipoService.updateTipoEquipo(id_tipo_equipo, dataTipoEquipo)
  }
}
