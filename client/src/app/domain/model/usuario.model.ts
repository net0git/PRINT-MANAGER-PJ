import { Rol } from './rol.model';
export interface Usuario {
    id?: number | undefined | null,
    username: string,
    nombre: string,
    ap_paterno: string,
    ap_materno: string,
    correo: string,
    telefono: string,
    estado: boolean | undefined | null,
    rol: Rol,
}