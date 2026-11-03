import { TicketCountMesDto } from "../dto/ticketCountMes.dto";
import { TicketCountStatusDto } from "../dto/ticketCountStatus.dto";
import { TicketDetailDto } from "../dto/ticketDetail.dto";

export interface TicketReportingQuery {
    findAll(anio: string, id_usuario: number, id_rol: number): Promise<TicketDetailDto[]>
}

export interface TicketReportingPendientesQuery {
    findAllPendientes(anio: string): Promise<TicketDetailDto[]>
}

export interface TicketReportingAlmacenQuery {
    findAllAlmacen(anio: string): Promise<TicketDetailDto[]>
}

export interface TicketReportingCountStatusQuery {
    findCountStatus(anio: string): Promise<TicketCountStatusDto>
}

export interface TicketReportingCountMesQuery {
    findCountMes(anio: string): Promise<TicketCountMesDto[]>
}

export interface TicketReportingCountStatusQuery {
    findCountStatus(anio: string): Promise<TicketCountStatusDto>
}
