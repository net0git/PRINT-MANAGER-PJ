export class Consumible {
    public id_consumible: number;
    public created_at?: Date;
    public nro_parte: string;
    public id_tipo_consumible: number;
    public id_marca: number;

    constructor(id_consumible: number, created_at: Date, nro_parte: string, id_tipo_consumible: number, id_marca: number) {
        this.id_consumible = id_consumible;
        this.created_at = created_at;
        this.nro_parte = nro_parte;
        this.id_tipo_consumible = id_tipo_consumible;
        this.id_marca = id_marca;
    }

    toString() {
        return `id_consumible ${this.id_consumible}, created_at: ${this.created_at},   nro_parte: ${this.nro_parte}, id_tipo_consumible: ${this.id_tipo_consumible}, id_marca: ${this.id_marca}}`;
    }

    public mapToPrimitives() {
        return {
            id_consumible: this.id_consumible,
            created_at: this.created_at,
            nro_parte: this.nro_parte,
            id_tipo_consumible: this.id_tipo_consumible,
            id_marca: this.id_marca
        };
    }
}