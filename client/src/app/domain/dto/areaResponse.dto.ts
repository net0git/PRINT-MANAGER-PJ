export interface AreaResponse {
    id_area?: number;
    created_at?: Date;
    area: string;
    referencia: string;
    id_sede?: number;
    estado: boolean;
}

export interface AreaCreate {
    message: string;
}

export interface AreaUpdate {
    message: string;
}