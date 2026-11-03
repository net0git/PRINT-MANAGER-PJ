export interface UserDetailDto {
    id_usuario: number;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    username: string;
    correo: string;
    telefono: string;
    created_at: Date;
    estado: boolean;
    id_rol: number;
    rol: string;
}