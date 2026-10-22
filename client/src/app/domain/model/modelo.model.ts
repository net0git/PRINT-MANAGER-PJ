export interface Modelo {
    id_modelo: number;
    modelo: string;
    estado: boolean | undefined | null;
    id_marca: number;
    id_tipo_equipo: number;
}