export class ModeloConsumible {
    id_modelo_consumible: number;
    created_at: Date;
    id_modelo: number;
    id_consumible: number;

    constructor(id_modelo_consumible: number, created_at: Date, id_modelo: number, id_consumible: number) {
        this.created_at = created_at;
        this.id_modelo_consumible = id_modelo_consumible;
        this.id_modelo = id_modelo;
        this.id_consumible = id_consumible;
    }

    toString() {
        return `id_modelo_consumible: ${this.id_modelo_consumible}, created_at: ${this.created_at}, id_modelo: ${this.id_modelo}, id_consumible: ${this.id_consumible}`;
    }

    public mapToPrimitives() {
        return {
            id_modelo_consumible: this.id_modelo_consumible,
            created_at: this.created_at,
            id_modelo: this.id_modelo,
            id_consumible: this.id_consumible
        };
    }
}