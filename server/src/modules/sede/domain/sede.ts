export class Sede {
    id_sede: number;
    created_at: Date;
    sede: string;
    direccion: string;
    estado: boolean

    constructor(id_sede: number, created_at: Date, sede: string, direccion: string, estado: boolean) {
        this.id_sede = id_sede;
        this.created_at = created_at;
        this.sede = sede;
        this.direccion = direccion;
        this.estado = estado;
    }

    toString() {
        return `id_sede: ${this.id_sede}, created_at: ${this.created_at},   sede: ${this.sede}, direccion: ${this.direccion}, estado: ${this.estado}`;
    }

    public mapToPrimitives() {
        return {
            id_sede: this.id_sede,
            created_at: this.created_at,
            sede: this.sede,
            direccion: this.direccion,
            estado: this.estado
        };
    }

}
