export class Marca {
    public id_marca: number
    public created_at?: Date;
    public estado: boolean;
    public marca: string

    constructor(id_marca: number,created_at: Date, marca: string, estado: boolean) {
        this.id_marca = id_marca;
        this.created_at = created_at;
        this.marca = marca;
        this.estado = estado;
    }

    toString() {
        return `id_marca ${this.id_marca}, created_at: ${this.created_at},   marca: ${this.marca}, estado: ${this.estado}`;
    }

    public mapToPrimitives() {
        return {
            id_marca: this.id_marca,
            created_at: this.created_at,
            marca: this.marca,
            estado: this.estado
        };
    }
}