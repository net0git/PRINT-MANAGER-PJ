import { Injectable } from '@angular/core';
import { TipoConsumibleService } from '../../infrastructure/services/remoto/tipoConsumible/tipo-consumible.service';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { marcaResponseCreate, marcaResponseUpdate } from '../../domain/dto/marcaResponse';


@Injectable({
  providedIn: 'root'
})
export class TipoConsumibleUseCasesService {

  constructor(private tipoConsumibleService: TipoConsumibleService) { }

  validarCampos(tipoConsumible: string): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!tipoConsumible || tipoConsumible === '') {
      errores.push({ campo: 'tipo_consumible', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createTipoConsumible(tipoConsumible: string): Observable<marcaResponseCreate> {
    const erroresValidacion = this.validarCampos(tipoConsumible);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }
    tipoConsumible = tipoConsumible.trim();
    tipoConsumible = tipoConsumible.charAt(0).toUpperCase() + tipoConsumible.slice(1);
    return this.tipoConsumibleService.createTipoConsumible(tipoConsumible)
  }

  updateTipoConsumible(id_tipo_consumible: number, tipoConsumible: string): Observable<marcaResponseUpdate> {
    const erroresValidacion = this.validarCampos(tipoConsumible);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    tipoConsumible = tipoConsumible.trim();
    tipoConsumible = tipoConsumible.charAt(0).toUpperCase() + tipoConsumible.slice(1);
    return this.tipoConsumibleService.updateTipoConsumible(id_tipo_consumible, tipoConsumible)
  }
}
