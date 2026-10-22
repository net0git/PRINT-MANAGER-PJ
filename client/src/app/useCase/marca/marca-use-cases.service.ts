import { Injectable } from '@angular/core';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { Observable, throwError } from 'rxjs';
import { MarcaService } from '../../infrastructure/services/remoto/marca/marca.service';
import { marcaResponseCreate, marcaResponseUpdate } from '../../domain/dto/marcaResponse';
import { Marca } from '../../domain/model/marca.model';


@Injectable({
  providedIn: 'root'
})
export class MarcaUseCasesService {

  constructor(private marcaService: MarcaService) { }

  validarCampos(marca: string): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!marca || marca === '') {
      errores.push({ campo: 'marca', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createMarca(marca: Marca): Observable<marcaResponseCreate> {
    const erroresValidacion = this.validarCampos(marca.marca);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
     return throwError(() => new Error(errorMensaje));
    }

    marca.marca = marca.marca.trim().toUpperCase();
    return this.marcaService.createMarca(marca.marca)
  }

  updateMarca(id_marca: number, marca: Marca): Observable<marcaResponseUpdate> {
    const erroresValidacion = this.validarCampos(marca.marca);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    marca.marca = marca.marca.trim().toUpperCase();
    console.log("marca.marca:", marca);
    return this.marcaService.updateMarca(id_marca, marca)
  }
}
