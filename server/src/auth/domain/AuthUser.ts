export class AuthUser {
    public id_usuario: string;
    public username: string;
    public password: string;
    public nombre: string;
    public ap_paterno: string;
    public ap_materno: string;
    public correo: string;
    public telefono: string;
    public estado: boolean;
    public id_rol: number;
    public rol: string;

    constructor(id: string, name: string, password: string, nombre: string, ap_paterno: string, ap_materno: string, correo: string, telefono: string, estado: boolean, id_rol: number, rol: string) {
        this.id_usuario = id;
        this.username = name;
        this.password = password;
        this.nombre = nombre;
        this.ap_paterno = ap_paterno;
        this.ap_materno = ap_materno;
        this.correo = correo;
        this.telefono = telefono;
        this.estado = estado;
        this.id_rol = id_rol;        
        this.rol = rol;
        
    }
}