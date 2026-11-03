export interface ModeloConsumibleResponse {
    id_modelo_consumible: number;
    created_at: Date;
    id_modelo: number;
    id_consumible: number;
}

export interface ModeloConsumibleCreate {
    message: string;
}

export interface ModeloConsumibleUpdate {
    message: string;
}

export interface ModeloConsumibleDelete {
    message: string;
}