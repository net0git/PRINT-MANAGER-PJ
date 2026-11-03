export class TipoConsumible {
    public id_tipo_consumible: number;
    public created_at?: Date;
    public tipo_consumible: string;

    constructor(id_tipo_consumible: number, created_at: Date, tipo_consumible: string) {
        this.id_tipo_consumible = id_tipo_consumible;
        this.created_at = created_at;
        this.tipo_consumible = tipo_consumible;
    }

    toString() {
        return `id_tipo_consumible ${this.id_tipo_consumible}, created_at: ${this.created_at},   tipo_consumible: ${this.tipo_consumible}`;
    }

    public mapToPrimitives() {
        return {
            id_tipo_consumible: this.id_tipo_consumible,
            created_at: this.created_at,
            tipo_consumible: this.tipo_consumible
        };
    }
}