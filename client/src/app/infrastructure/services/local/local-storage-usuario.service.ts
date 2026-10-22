import { Injectable } from '@angular/core';
import { LoginResponse } from '../../../domain/dto/LoginResponse.dto';
import { constantes } from '../../../constants';
import { Router } from '@angular/router';
import { Usuario } from '../../../domain/model/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageUsuarioService {

  constructor(private route: Router) { }

  public readonly USUARIO = constantes.USUARIO;
  public readonly USUARIO_PERFIL = constantes.USUARIO_PERFIL;

  setUsuario(usuario: Usuario) {
    localStorage.setItem(this.USUARIO, JSON.stringify(usuario))
  }

  getUsuario() {
    let usuarioLocal:string|null =localStorage.getItem(this.USUARIO); 
    if(usuarioLocal) {
        return JSON.parse(usuarioLocal);
    } else {
        return null;
    }
  }

  setPerfil(perfiles: any) {// PERFIL
    localStorage.setItem(this.USUARIO_PERFIL, JSON.stringify(perfiles))
  }

  getPerfil() {
    let usuarioPerfil:string|null =localStorage.getItem(this.USUARIO_PERFIL); 
    if(usuarioPerfil) {
        return JSON.parse(usuarioPerfil);
    } else {
        return null;
    }
  }


  removeUsuario() {
    localStorage.removeItem(this.USUARIO);
    localStorage.removeItem(this.USUARIO_PERFIL);
  }

  removePerfil() {
    localStorage.removeItem(this.USUARIO_PERFIL);
  }

  clear(){
    localStorage.clear(); 
  }

}
