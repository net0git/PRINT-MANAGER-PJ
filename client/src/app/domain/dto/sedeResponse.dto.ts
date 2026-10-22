import { AreaResponse } from "./areaResponse.dto";

export interface SedeDetails {
    id_sede: number;
    sede: string;
    direccion: string;
    estado: boolean;
    areas: AreaResponse[];
}

export interface SedeResponse {
    id_sede: number;
    nombre: string;
    direccion: string;
    estado: boolean;
}

export interface SedeCreate {
    message: string;
}

export interface SedeUpdate {
    message: string;
}

