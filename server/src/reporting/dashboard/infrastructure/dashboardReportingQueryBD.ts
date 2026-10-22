import { AreaCantConsumibleReportingQuery } from "../application/port/dashboardReportingQuery";
import { AreaCantConsumibleDto } from "../application/dto/areaCantConsumible.dto";
import { NroParteCantDto } from "../application/dto/nroParteCant.dto";
import { AuditDb } from "../../../shared/database/audit-db";
import { AniosConsultDto } from "../application/dto/aniosConsult.dto";

export class AreaCantConsumibleReportingQueryBD implements AreaCantConsumibleReportingQuery {

    mapToAreaCantConsumible(row: any): AreaCantConsumibleDto {
        return {
            sede: row.sede,
            area: row.area,
            tipo_consumible: row.consumible,
            cantidad: row.cantidad
        };
    }

    mapToNroParteCant(row: any): NroParteCantDto {
        return {
            nro_parte: row.nro_parte,
            tipo_consumible: row.tipo_consumible,
            marca: row.marca,
            cantidad: row.cantidad,
            porcentaje: row.porcentaje
        };
    }
    mapToAniosConsult(row: any): AniosConsultDto {
        return {
            anio: row.anio
        };
    }

    async findAllAreaCant(anio: string): Promise<AreaCantConsumibleDto[]> {

        try {
            const query = `
               SELECT
                    a.area,
                    s.sede,
                    tc.tipo_consumible AS consumible,
                    c.nro_parte,
                    COUNT(t.id_ticket) AS cantidad
                FROM ticket t
                INNER JOIN area a
                    ON a.id_area = t.id_area
                INNER JOIN sede s
                    ON s.id_sede = a.id_sede
                INNER JOIN consumible c
                    ON c.id_consumible = t.id_consumible
                INNER JOIN tipo_consumible tc
                    ON tc.id_tipo_consumible = t.id_tipo_consumible
                WHERE EXTRACT(YEAR FROM t.created_at) = $1
                GROUP BY
                    a.id_area,
                    a.area,
                    s.id_sede,
                    s.sede,
                    tc.id_tipo_consumible,
                    tc.tipo_consumible,
                    c.id_consumible,
                    c.nro_parte
                ORDER BY
                    s.sede,
                    a.area,
                    tc.tipo_consumible,
                    c.nro_parte;
            `;

            const result = await AuditDb.queryvalue(query, [
                anio
            ]);
            console.log("anio:", anio);
            return result.rows.map(this.mapToAreaCantConsumible);
        }

        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

    async findAllNroParteCant(anio: string): Promise<NroParteCantDto[]> {

        try {
            const query = `
               SELECT
                    c.nro_parte,
                    tc.tipo_consumible,
                    m.marca,
                    COUNT(t.id_ticket) AS cantidad,
                    ROUND(
                        COUNT(t.id_ticket) * 100.0 /
                        SUM(COUNT(t.id_ticket)) OVER (),
                        2
                    ) AS porcentaje
                FROM ticket t
                INNER JOIN consumible c
                    ON c.id_consumible = t.id_consumible
                INNER JOIN tipo_consumible tc
                    ON tc.id_tipo_consumible = c.id_tipo_consumible
                INNER JOIN marca m
                    ON m.id_marca = c.id_marca
                WHERE EXTRACT(YEAR FROM t.created_at) = $1
                GROUP BY
                    c.id_consumible,
                    c.nro_parte,
                    tc.id_tipo_consumible,
                    tc.tipo_consumible,
                    m.id_marca,
                    m.marca
                ORDER BY cantidad DESC;
            `;

            const result = await AuditDb.queryvalue(query, [
                anio
            ]);
            console.log("anio:", anio);
            return result.rows.map(this.mapToNroParteCant);
        }

        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

    async findAllAniosConsult(): Promise<AniosConsultDto[]> {
        try {
            const query = `
                SELECT generate_series(
                    EXTRACT(YEAR FROM MAX(created_at))::INTEGER,
                    EXTRACT(YEAR FROM MIN(created_at))::INTEGER,
                    -1
                ) AS anio
                FROM ticket;
            `;
            const result = await AuditDb.onlyquery(query);
            return result.rows.map(this.mapToAniosConsult);
        }
        catch (error) {
            console.error("Error obteniendo reporte de anios", error);
            throw new Error("Error obteniendo reporte de anios");
        }
    }


}