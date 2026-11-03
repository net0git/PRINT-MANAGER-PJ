export interface AreaDto {
    id_area: number;
    area: string;
    referencia: string;
}

export interface SedesDetailDto {
    id_sede: number;
    sede: string;
    direccion: string;
    estado: boolean;
    areas: AreaDto[]
}