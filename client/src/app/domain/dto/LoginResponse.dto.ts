
import { Usuario } from '../model/usuario.model';

export interface UsuarioResponse {
    usuario: Usuario,
}

export interface LoginResponse extends UsuarioResponse {
    token: string,
}
