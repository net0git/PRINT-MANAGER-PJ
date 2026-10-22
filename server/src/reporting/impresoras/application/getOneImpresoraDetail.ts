import { ImpresoraDetailDto } from "./dto/impresoraDetail.dto";
import  { ImpresoraReportingOneQuery } from "./port/impresoraReportingQuery";

export class GetImpresoraOne {

    constructor(
        private query: ImpresoraReportingOneQuery
    ) {}

    async execute(id_marca: number, id_modelo: number, id_tipo_consumible:number): Promise<ImpresoraDetailDto> {
        return this.query.findOne(id_marca, id_modelo, id_tipo_consumible);
    }
}