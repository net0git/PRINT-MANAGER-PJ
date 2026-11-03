export class Modelo {
    public id_modelo: number;
    public created_at: Date;
    public estado: boolean;
    public modelo: string;
    public id_marca: number;
    public id_tipo_equipo: number;

    constructor(id_modelo: number, created_at: Date, modelo: string, estado: boolean, id_marca: number, id_tipo_equipo: number) {
        this.id_modelo = id_modelo;
        this.created_at = created_at;
        this.modelo = modelo;
        this.estado = estado;
        this.id_marca = id_marca;
        this.id_tipo_equipo = id_tipo_equipo;
    }

    toString() {
        return `id_modelo ${this.id_modelo}, created_at: ${this.created_at},   modelo: ${this.modelo}, estado: ${this.estado}, id_marca: ${this.id_marca}, id_tipo_equipo: ${this.id_tipo_equipo}`;
    }

    public mapToPrimitives() {
        return {
            id_modelo: this.id_modelo,
            created_at: this.created_at,
            modelo: this.modelo,
            estado: this.estado,
            id_marca: this.id_marca,
            id_tipo_equipo: this.id_tipo_equipo
        };
    }
}