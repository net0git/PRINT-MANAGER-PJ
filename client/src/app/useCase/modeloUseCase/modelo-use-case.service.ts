import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { ModeloService } from '../../infrastructure/services/remoto/modelo/modelo.service';
import { ModeloCreate, ModeloUpdate } from '../../domain/dto/modeloResponse.dto';
import { Modelo } from '../../domain/model/modelo.model';
import { ModeloRequest } from '../../domain/dto/modeloRequest.dto';

@Injectable({
  providedIn: 'root'
})
export class ModeloUseCaseService {

  constructor(private modeloService: ModeloService) { }

  validarCampos(modelo: ModeloRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!modelo.modelo || modelo.modelo === '') {
      errores.push({ campo: 'modelo', mensaje: 'Campo requerido' });
    }
    if (!modelo.id_marca || modelo.id_marca === 0) {
      errores.push({ campo: 'id_marca', mensaje: 'Campo requerido' });
    }
    if (!modelo.id_tipo_equipo || modelo.id_tipo_equipo === 0) {
      errores.push({ campo: 'tipo de equipo', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createModelo(modelo: ModeloRequest): Observable<ModeloCreate> {
    const erroresValidacion = this.validarCampos(modelo);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    modelo.modelo = modelo.modelo.trim().toUpperCase();
    return this.modeloService.createModelo(modelo)
  }

  updateModelo(id_modelo: number, modelo: ModeloRequest): Observable<ModeloUpdate> {
    const erroresValidacion = this.validarCampos(modelo);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    modelo.modelo = modelo.modelo.trim().toUpperCase();
    return this.modeloService.updateModelo(id_modelo, modelo)
  }
}
