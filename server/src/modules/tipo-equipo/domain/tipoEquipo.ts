export class TipoEquipo {
    public id_tipo_equipo: number;
    public created_at?: Date;
    public tipo_equipo: string;
    public descripcion: string;


    constructor(id_tipo_equipo: number, created_at: Date, tipo_equipo: string, descipcion: string) {
        this.id_tipo_equipo = id_tipo_equipo;
        this.created_at = created_at;
        this.tipo_equipo = tipo_equipo;
        this.descripcion = descipcion;
    }

    toString() {
        return `id_tipo_equipo ${this.id_tipo_equipo}, created_at: ${this.created_at},   tipo_equipo: ${this.tipo_equipo}, descipcion: ${this.descripcion}`;
    }

    public mapToPrimitives() {
        return {
            id_tipo_equipo: this.id_tipo_equipo,
            created_at: this.created_at,
            tipo_equipo: this.tipo_equipo,
            descripcion: this.descripcion
        };
    }
}