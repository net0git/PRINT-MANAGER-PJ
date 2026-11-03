import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginUseCasesService } from '../../../useCase/login/login-use-cases.service'
import { LoginRequest } from '../../../domain/dto/LoginRequest.dto';
import { UiService } from '../../services/local/ui.service';
import { LocalStorageService } from '../../services/local/local-storage.service';
import { LoginResponse } from '../../../domain/dto/LoginResponse.dto';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string="";
  password: string="";

  loginLoad:boolean = false;
  user: LoginRequest={
    username:'',
    password:'',
  };

  constructor(
    private loginUseCasesService: LoginUseCasesService,
    private uiService: UiService,
    private localStorageService: LocalStorageService,
    private router: Router
    
  ) {}

  
  mostarDatos() {
    console.log(this.username);
    console.log(this.password);

    if(this.username=="admin" && this.password=="1234"){
      
    }
    else{
      console.log("Incorrecto");
    }
  }

login(): void {
  this.loginLoad = true;

  if (this.user.username) {
    this.user.username = this.user.username.trim();
  }

  if (this.user.password) {
    this.user.password = this.user.password.trim();
  }

  this.uiService.mostrarCargando(true);

  this.loginUseCasesService.login(this.user).subscribe({
    next: (data: LoginResponse) => {

      if (data.token) {
        this.localStorageService.setToken(data.token);

        this.loginLoad = false;
        this.uiService.mostrarCargando(false);

        this.router.navigate(['/principal/historial']);
      } else {
        this.loginLoad = false;
        this.uiService.mostrarCargando(false);

        Swal.fire(
          'Atención!',
          'Usuario o contraseña incorrectos.',
          'info'
        );
      }
    },

    error: (err) => {
      console.error('error login', err);

      this.loginLoad = false;
      this.uiService.mostrarCargando(false);

      if (err.status === 403) {
        Swal.fire(
          'Usuario inactivo',
          'Tu usuario se encuentra inactivo. No tienes permiso para acceder al sistema.',
          'warning'
        );
        return;
      }

      if (err.status === 401) {
        Swal.fire(
          'Atención!',
          'Usuario o contraseña incorrectos.',
          'info'
        );
        return;
      }

      Swal.fire(
        'Error',
        'Ocurrió un error en el servidor. Inténtalo más tarde.',
        'error'
      );
    }
  });
}
   
}
