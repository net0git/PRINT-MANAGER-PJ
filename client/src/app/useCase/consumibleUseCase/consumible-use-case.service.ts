import { Injectable } from '@angular/core';
import { ConsumibleService } from '../../infrastructure/services/remoto/consumible/consumible.service';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { ConsumibleCreate, ConsumibleUpdate } from '../../domain/dto/consumibleResponse.dto';
import { ConsumibleRequest } from '../../domain/dto/consumibleRequest.dto';


@Injectable({
  providedIn: 'root'
})
export class ConsumibleUseCaseService {

  constructor(private consumibleService: ConsumibleService) { }

  validarCampos(consumibleData: ConsumibleRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!consumibleData.nro_parte! || consumibleData.nro_parte === '') {
      errores.push({ campo: 'nro_parte', mensaje: 'Campo requerido' });
    }
    if (!consumibleData.id_tipo_consumible! || consumibleData.id_tipo_consumible === 0) {
      errores.push({ campo: 'id_tipo_consumible', mensaje: 'Campo requerido' });
    }
    if (!consumibleData.id_marca! || consumibleData.id_marca === 0) {
      errores.push({ campo: 'id_marca', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createConsumible(consumible: ConsumibleRequest): Observable<ConsumibleCreate> {
    const erroresValidacion = this.validarCampos(consumible);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    consumible.nro_parte = consumible.nro_parte.trim().toUpperCase();
    return this.consumibleService.createConsumible(consumible)
  }

  updateConsumible(id_consumible: number, consumible: ConsumibleRequest): Observable<ConsumibleUpdate> {
    const erroresValidacion = this.validarCampos(consumible);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    consumible.nro_parte = consumible.nro_parte.trim().toUpperCase();
    return this.consumibleService.updateConsumible(id_consumible, consumible)
  }
}
