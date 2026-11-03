import { RolReportingQuery } from "../application/port/rolReportingQuery";
import { RolDetailDto } from "../application/dto/rolDetail.dto";

import { AuditDb } from "../../../shared/database/audit-db";

export class RolReportingQueryDB implements RolReportingQuery {

    async findAll(): Promise<RolDetailDto[]> {

        try {
            const query = `
            SELECT 
                id_rol,
                rol
            FROM rol
        `;

            const result = await AuditDb.onlyquery(query);

            return result.rows;


        } catch (error) {
            console.error("Error obteniendo reporte de roles", error);
            throw new Error("Error obteniendo reporte de roles");
        }

    }
}