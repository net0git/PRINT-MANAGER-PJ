import { ImpresoraDetailDto } from "../dto/impresoraDetail.dto";

export interface ImpresoraReportingQuery {
    findAll(): Promise<ImpresoraDetailDto[]>
}

export interface ImpresoraReportingOneQuery {
    findOne(id_marca: number, id_modelo: number,id_tipo_consumible:number): Promise<ImpresoraDetailDto>
}