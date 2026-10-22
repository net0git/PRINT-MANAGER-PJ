import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { SedeRequest } from '../../domain/dto/sedeRequest.dto';
import { SedeCreate, SedeUpdate } from '../../domain/dto/sedeResponse.dto';
import { SedeService } from '../../infrastructure/services/remoto/sede/sede.service';

@Injectable({
  providedIn: 'root'
})
export class SedeUseCaseService {

  constructor(private sedeService: SedeService) { }

  validarCampos(sede: SedeRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!sede.sede || sede.sede === '') {
      errores.push({ campo: 'sede', mensaje: 'Campo requerido' });
    }
    // if (!sede.direccion || sede.direccion === '') {
    //   errores.push({ campo: 'direccion', mensaje: 'Campo requerido' });
    // }
    return errores;
  }

  createSede(sede: SedeRequest): Observable<SedeCreate> {
    const erroresValidacion = this.validarCampos(sede);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }
    sede.sede = sede.sede.trim().toUpperCase();
    return this.sedeService.createSede(sede);
  }

  updateSede(id_sede: number, sede: SedeRequest): Observable<SedeUpdate> {
    const erroresValidacion = this.validarCampos(sede);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }
    sede.sede = sede.sede.trim().toUpperCase();
    return this.sedeService.updateSede(id_sede, sede);
  }
}
