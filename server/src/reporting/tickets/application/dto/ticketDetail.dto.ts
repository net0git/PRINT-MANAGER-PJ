export interface Impresora {
    id_marca: number,
    id_modelo: number,
    marca: string,
    modelo: string,
    ip: string,
}

export interface Consumible {
    id_consumible: number,
    nro_parte: string,
    id_tipo_consumible: number,
    tipo_consumible: string,
}

export interface Usuario {
    id_usuario: number,
    nombre: string,
    ap_paterno: string,
    ap_materno: string,
    correo: string,
    telefono: string,
    id_rol: number,
    rol: string,
}

export interface Area {
    id_area: number,
    area: string,
    sede: string,
}

export interface Estado{
    informatica : {
        id_usuario : number,
        nombre : string, 
        estado : boolean,
        mensaje : string,
        fecha : Date
        }, 
    almacen : {
        id_usuario : number,
        nombre : string, 
        estado : boolean,
        mensaje : string,
        fecha : Date
    }
}

export interface TicketDetailDto {
    id_ticket: number,
    codigo: string,
    created_at: Date,
    descripcion: string,
    estado_general: string,
    estado_general_descripcion: string,
    impresora: Impresora,
    consumible: Consumible,
    usuario: Usuario,
    area: Area,
    estado: Estado
    
}