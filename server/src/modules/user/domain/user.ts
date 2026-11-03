import { UserTelefono } from "./valueObject/userTelefono";
import { UserCorreo } from "./valueObject/userCorreo";
import { UserUsername } from "./valueObject/userUsername";
import { UserPassword } from "./valueObject/userPassword";



export class User {
    public id_usuario: number;
    public created_at?: Date;
    public nombre: string;
    public ap_paterno: string;
    public ap_materno: string;
    public correo: UserCorreo;
    public telefono: UserTelefono;
    public username: UserUsername;
    public password?: UserPassword;
    public id_rol: number;
    public estado: boolean;

    constructor(id_usuario: number, created_at: Date, nombre: string, ap_paterno: string, ap_materno: string, correo: UserCorreo, telefono: UserTelefono, username: UserUsername, password: UserPassword, id_rol: number, estado: boolean) {
        this.id_usuario = id_usuario;
        this.created_at = created_at;
        this.nombre = nombre;
        this.ap_paterno = ap_paterno;
        this.ap_materno = ap_materno;
        this.correo = correo;
        this.telefono = telefono;
        this.username = username;
        this.password = password;
        this.id_rol = id_rol;
        this.estado = estado;
    }

    toString() {
        return `id_user ${this.id_usuario}, nombre: ${this.nombre}, correo: ${this.correo}, telefono: ${this.telefono.getValue()}, username: ${this.username.getValue()}, password: ${this.password?.getValue()}, id_rol: ${this.id_rol}, estado: ${this.estado}`;
    }

    public mapToPrimitives() {
        return {
            id_usuario: this.id_usuario,
            created_at: this.created_at,
            nombre: this.nombre,
            ap_paterno: this.ap_paterno,
            ap_materno: this.ap_materno,
            correo: this.correo.getValue(),
            telefono: this.telefono.getValue(),
            username: this.username.getValue(),
            password: this.password?.getValue(),
            id_rol: this.id_rol,
            estado: this.estado
        };
    }

}