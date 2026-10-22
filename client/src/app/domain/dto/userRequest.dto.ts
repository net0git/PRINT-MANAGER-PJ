export interface UserRequest {
    id_usuario?: number;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    correo: string;
    telefono: string;
    username: string;
    password: string;
    id_rol: number;
    estado: boolean;
}