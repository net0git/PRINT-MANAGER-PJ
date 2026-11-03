import { Injectable } from '@angular/core';
import { LocalStorageService } from '../../infrastructure/services/local/local-storage.service';
import { LocalStorageUsuarioService } from '../../infrastructure/services/local/local-storage-usuario.service';
import { LoginService } from '../../infrastructure/services/remoto/login/login.service';
import { LoginRequest } from '../../domain/dto/LoginRequest.dto';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { map, Observable, throwError } from 'rxjs';
import { LoginResponse } from '../../domain/dto/LoginResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class LoginUseCasesService {

  constructor(
    private loginService: LoginService,
    private localStorageService: LocalStorageService,
    private localStorageUsuarioService: LocalStorageUsuarioService
  ) { }

  validarCampos(user: LoginRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];

    if (!user.username! || user.username! === '') {
      errores.push({ campo: 'username', mensaje: 'Campo requerido' });
    }
    if (!user.password! || user.password! === '') {
      errores.push({ campo: 'password', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  login(user: LoginRequest): Observable<LoginResponse>{
    const erroresValidacion = this.validarCampos(user);
    let newDate:Date = new Date();
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje}\n`;
      });
      return throwError(() => new Error(errorMensaje));
    } 

    return this.loginService.login(user).pipe(
      map((response:LoginResponse)=>{
        if(response.token){
          this.localStorageService.setToken(response.token);
          this.localStorageService.setDatetimeNewToken(newDate);
          this.localStorageUsuarioService.setUsuario(response.usuario);
          // if(!response.username){
          //   response.codigo = constantes.RES_COD_NO_DATA;
          //   response.descripcion = mensajes.MSG_RESP_NO_DATA;
          // }
        }
         return response;
      })
    );
  }
}
