import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { ModeloConsumibleService } from '../../infrastructure/services/remoto/modeloConsumible/modelo-consumible.service';
import { ModeloConsumibleRequest } from '../../domain/dto/modeloConsumibleRequest.dto';
import { ModeloConsumibleCreate, ModeloConsumibleUpdate } from '../../domain/dto/modeloConsumibleResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class ModeloConsumibleUseCaseService {

  constructor(private modeloConsumibleService: ModeloConsumibleService) { }

  validarCampos(modeloConsumibleData: ModeloConsumibleRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!modeloConsumibleData.id_modelo! || modeloConsumibleData.id_modelo === 0) {
      errores.push({ campo: 'modelo', mensaje: 'Campo requerido' });
    }
    if (!modeloConsumibleData.id_consumible! || modeloConsumibleData.id_consumible === 0) {
      errores.push({ campo: 'consumible', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createModeloConsumible(modeloConsumible: ModeloConsumibleRequest): Observable<ModeloConsumibleCreate> {
    const erroresValidacion = this.validarCampos(modeloConsumible);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    return this.modeloConsumibleService.createModeloConsumible(modeloConsumible);
  }

  updateModeloConsumible(id_modelo_consumible: number, modeloConsumible: ModeloConsumibleRequest): Observable<ModeloConsumibleUpdate> {
    const erroresValidacion = this.validarCampos(modeloConsumible);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    return this.modeloConsumibleService.updateModeloConsumible(id_modelo_consumible, modeloConsumible);
  }
}
