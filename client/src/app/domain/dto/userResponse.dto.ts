export interface UserResponse {
    id_usuario: number;
    username: string;
    password: string;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    correo: string;
    telefono: string;
    estado: boolean;
    created_at: Date;
    id_rol: number; 
    rol: string;
}

export interface UserCreate {
    message: string;
}

export interface UserUpdate {
    message: string;
}

export interface UserDelete {
    message: string;
}

export interface UserReset {
    message: string;
}

export interface UserExist {
    exists: boolean;
}