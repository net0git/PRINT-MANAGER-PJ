import { Injectable } from '@angular/core';
import { ErrorValidacion } from '../../domain/dto/ErrorValidacion';
import { UserService } from '../../infrastructure/services/remoto/user/user.service';
import { Observable, switchMap, throwError } from 'rxjs';
import { UserRequest } from '../../domain/dto/userRequest.dto';
import { UserExist, UserReset, UserResponse } from '../../domain/dto/userResponse.dto';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserUseCasesService {

  constructor(private userService: UserService) { }

  validarCampos(user: UserRequest): ErrorValidacion[] {
    let errores: ErrorValidacion[] = [];


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!user.nombre! || user.nombre === '') {
      errores.push({ campo: 'nombre', mensaje: 'Campo requerido' });
    }
    if (!user.ap_paterno! || user.ap_paterno === '') {
      errores.push({ campo: 'ap_paterno', mensaje: 'Campo requerido' });
    }
    if (!user.ap_materno! || user.ap_materno === '') {
      errores.push({ campo: 'ap_materno', mensaje: 'Campo requerido' });
    }
    if (!user.correo! || user.correo === '') {
      errores.push({ campo: 'correo', mensaje: 'Campo requerido' });
    } else if (!emailRegex.test(user.correo)) {

      errores.push({
        campo: 'correo',
        mensaje: 'Correo inválido'
      });
    }
    if (!user.telefono! || user.telefono === '') {
      errores.push({ campo: 'telefono', mensaje: 'Campo requerido' });
    } else if (user.telefono.length !== 9) {

      errores.push({
        campo: 'telefono',
        mensaje: 'El teléfono debe tener 9 dígitos'
      });
    }
    if (!user.id_rol! || user.id_rol === 0) {
      errores.push({ campo: 'rol', mensaje: 'Campo requerido' });
    }
    return errores;
  }

  createUser(user: UserRequest): Observable<UserResponse> {
    const erroresValidacion = this.validarCampos(user);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    user.nombre = user.nombre.trim().toUpperCase();
    user.ap_paterno = user.ap_paterno.trim().toUpperCase();
    user.ap_materno = user.ap_materno.trim().toUpperCase();
    user.correo = user.correo.trim().toLowerCase();
    user.username = user.username.trim().toLowerCase();
    return this.userService.createUser(user)
  }

  updateUser(id_usuario: number, user: UserRequest): Observable<UserResponse> {
    const erroresValidacion = this.validarCampos(user);
    if (erroresValidacion.length > 0) {
      let errorMensaje = '';
      erroresValidacion.forEach(error => {
        errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
      });
      return throwError(() => new Error(errorMensaje));
    }

    user.nombre = user.nombre.trim().toUpperCase();
    user.ap_paterno = user.ap_paterno.trim().toUpperCase();
    user.ap_materno = user.ap_materno.trim().toUpperCase();
    user.correo = user.correo.trim().toLowerCase();
    user.username = user.username.trim().toLowerCase();
    return this.userService.updateUser(id_usuario, user)
  }

async executeResetPassword(username: string, password: string): Promise<UserReset> {
  const exists =  this.userService.findByUsername(username);

  if (!exists) {
    throw new Error("No existe el usuario");
  }

  return await firstValueFrom(
    this.userService.resetPassword(username, password)
  );
}

//  executeAutoRegister(user: UserRequest): Observable<UserResponse> {
//   const exists =  this.userService.findByUsername(user.nombre);

//   if (exists) {
//     throw new Error("El usuario ya existe");
//   }

//   const erroresValidacion = this.validarCampos(user);
//     if (erroresValidacion.length > 0) {
//       let errorMensaje = '';
//       erroresValidacion.forEach(error => {
//         errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje} \n`;
//       });
//       return throwError(() => new Error(errorMensaje));
//     }

//     user.nombre = user.nombre.trim().toUpperCase();
//     user.ap_paterno = user.ap_paterno.trim().toUpperCase();
//     user.ap_materno = user.ap_materno.trim().toUpperCase();
//     user.correo = user.correo.trim().toLowerCase();
//     user.username = user.username.trim().toLowerCase();
//     return this.userService.createUser(user)

// }

executeAutoRegister(user: UserRequest): Observable<UserResponse> {
  return this.userService.findByUsername(user.username).pipe(
    switchMap((response: UserExist) => {
      if (response.exists) {
        return throwError(() => new Error('El usuario ya existe'));
      }

      const erroresValidacion = this.validarCampos(user);

      if (erroresValidacion.length > 0) {
        let errorMensaje = '';

        erroresValidacion.forEach(error => {
          errorMensaje += `Error en el campo "${error.campo}": ${error.mensaje}\n`;
        });

        return throwError(() => new Error(errorMensaje));
      }

      user.nombre = user.nombre.trim().toUpperCase();
      user.ap_paterno = user.ap_paterno.trim().toUpperCase();
      user.ap_materno = user.ap_materno.trim().toUpperCase();
      user.correo = user.correo.trim().toLowerCase();
      user.username = user.username.trim().toLowerCase();

      return this.userService.autoRegister(user);
    })
  );
}
}
