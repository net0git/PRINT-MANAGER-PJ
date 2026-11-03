import { AreaCantConsumibleDto } from "../dto/areaCantConsumible.dto";
import { NroParteCantDto } from "../dto/nroParteCant.dto";
import { AniosConsultDto } from "../dto/aniosConsult.dto";

export interface DashboardReportingQuery {
    findAllAniosConsult(): Promise<AniosConsultDto[]>
}

export interface AreaCantConsumibleReportingQuery {
    findAllAreaCant(anio: string): Promise<AreaCantConsumibleDto[]>
}

export interface NroParteCantReportingQuery {
    findAllNroParteCant(anio: string): Promise<NroParteCantDto[]>
}

