import { AuditDb } from "../../../shared/database/audit-db";
import { SedeReportingQuery } from "../application/port/sedeReportingQuery";
import { SedesDetailDto } from "../application/dto/sedesDetail.dto";

export class SedeReportingQueryBD implements SedeReportingQuery {

    async findAll(): Promise<SedesDetailDto[]> {

        try {
            const query = `
                    SELECT
                        s.id_sede,
                        s.sede,
                        s.direccion,
                        s.estado,
                        (
                            SELECT json_agg(
                                json_build_object(
                                    'id_area', a.id_area,
                                    'area', a.area,
                                    'referencia', a.referencia,
                                    'estado', a.estado
                                )
                            )
                            FROM area a
                            WHERE a.id_sede = s.id_sede
                        ) AS areas
                    FROM sede s
                    ORDER BY s.sede;
        `;

            const result = await AuditDb.onlyquery(query);
            return result.rows;
        }

        catch (error) {
            console.error("Error obteniendo reporte de sedes", error);
            throw new Error("Error obteniendo reporte de sedes");
        }
    }
}