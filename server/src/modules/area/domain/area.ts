export class Area {
    id_area: number;
    created_at: Date;
    area: string;
    referencia: string;
    id_sede: number;
    estado: boolean;

    constructor(id_area: number, created_at: Date, area: string, referencia: string, id_sede: number, estado: boolean) {
        this.id_area = id_area;
        this.created_at = created_at;
        this.area = area;
        this.referencia = referencia;
        this.id_sede = id_sede;
        this.estado = estado;
    }

    toString() {
        return `id_area: ${this.id_area}, created_at: ${this.created_at},   area: ${this.area}, referencia: ${this.referencia}, id_sede: ${this.id_sede}, estado: ${this.estado}`;
    }

    public mapToPrimitives() {
        return {
            id_area: this.id_area,
            created_at: this.created_at,
            area: this.area,
            referencia: this.referencia,
            id_sede: this.id_sede,
            estado: this.estado
        };
    }
}