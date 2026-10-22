import { AuditDb } from "../../../shared/database/audit-db";
import { ConsumibleReportingQuery } from "../application/port/consumibleReportingQuery";
import { ConsumibleDetailDto } from "../application/dto/consumibleDetail.dto";

export class ConsumibleReportingQueryBD implements ConsumibleReportingQuery {



    private mapToConsumible(row: any): ConsumibleDetailDto {
       
       
        return {
            id_consumible: row.id_consumible,
            nro_parte: row.nro_parte,

            tipoConsumible: {
                id_tipo_consumible: row.id_tipo_consumible,
                tipo_consumible: row.tipo_consumible
            },

            marca: {
                id_marca: row.id_marca,
                marca: row.marca
            }
        };
    }

    async findAll(): Promise<ConsumibleDetailDto[]> {

        try {
            const query = `
            SELECT 
                c.id_consumible,
                c.nro_parte,
                c.id_tipo_consumible,
                t.tipo_consumible,
                m.id_marca,
                m.marca
            FROM consumible c
            INNER JOIN tipo_consumible t
                ON c.id_tipo_consumible = t.id_tipo_consumible
            INNER JOIN marca m
                ON c.id_marca = m.id_marca
        `;

            const result = await AuditDb.onlyquery(query);

            return result.rows.map(row => this.mapToConsumible(row));

        } catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }

    }
}