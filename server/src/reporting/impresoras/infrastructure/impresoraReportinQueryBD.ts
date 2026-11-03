import { AuditDb } from "../../../shared/database/audit-db";
import { ImpresoraReportingQuery } from "../application/port/impresoraReportingQuery";
import { ImpresoraDetailDto } from "../application/dto/impresoraDetail.dto";

export class ImpresoraReportingQueryBD implements ImpresoraReportingQuery {

    async findAll(): Promise<ImpresoraDetailDto[]> {

        try {
            const query = `
                    SELECT
                        m.id_marca,
                        m.marca,
                        m.estado,
                        (
                            SELECT json_agg(
                                json_build_object(
                                    'id_modelo', mo.id_modelo,
                                    'modelo', mo.modelo,
                                    'tipo_equipo',
                                    json_build_object(
                                        'id_tipo_equipo', te.id_tipo_equipo,
                                        'tipo_equipo', te.tipo_equipo
                                    ),
                                    'estado', mo.estado,
                                    'consumibles',
                                    (
                                        SELECT COALESCE(
                                            json_agg(

                                                json_build_object(
                                                    'id_modelo_consumible', mc.id_modelo_consumible,
                                                    'id_consumible', c.id_consumible,
                                                    'nro_parte', c.nro_parte,

                                                    'tipo_consumible',
                                                    json_build_object(
                                                        'id_tipo_consumible',
                                                        tc.id_tipo_consumible,

                                                        'tipo_consumible',
                                                        tc.tipo_consumible
                                                    )
                                                )
                                            ),
                                            '[]'::json
                                        )

                                        FROM modelo_consumible mc

                                        INNER JOIN consumible c
                                            ON mc.id_consumible = c.id_consumible

                                        INNER JOIN tipo_consumible tc
                                            ON c.id_tipo_consumible = tc.id_tipo_consumible

                                        WHERE mc.id_modelo = mo.id_modelo
                                    )
                                )
                            )
                            FROM modelo mo
                            INNER JOIN tipo_equipo te
                                ON mo.id_tipo_equipo = te.id_tipo_equipo
                            WHERE mo.id_marca = m.id_marca
                        ) AS modelos
                    FROM marca m
                    ORDER BY m.marca;
        `;

            const result = await AuditDb.onlyquery(query);
            return result.rows;
        }

        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

    async findOne(id_marca: number, id_modelo: number, id_tipo_consumible:number): Promise<ImpresoraDetailDto> {
        try {

            console.log(id_marca, id_modelo, id_tipo_consumible);
        
            const query = `
                    SELECT
                        m.id_marca,
                        m.marca,
                        m.estado,
                        (
                            SELECT json_agg(
                                json_build_object(
                                    'id_modelo', mo.id_modelo,
                                    'modelo', mo.modelo,
                                    'tipo_equipo',
                                    json_build_object(
                                        'id_tipo_equipo', te.id_tipo_equipo,
                                        'tipo_equipo', te.tipo_equipo
                                    ),
                                    'estado', mo.estado,
                                    'consumibles',
                                    (
                                        SELECT COALESCE(
                                            json_agg(

                                                json_build_object(
                                                    'id_modelo_consumible', mc.id_modelo_consumible,
                                                    'id_consumible', c.id_consumible,
                                                    'nro_parte', c.nro_parte,

                                                    'tipo_consumible',
                                                    json_build_object(
                                                        'id_tipo_consumible',
                                                        tc.id_tipo_consumible,

                                                        'tipo_consumible',
                                                        tc.tipo_consumible
                                                    )
                                                )
                                            ),
                                            '[]'::json
                                        )

                                        FROM modelo_consumible mc

                                        INNER JOIN consumible c
                                            ON mc.id_consumible = c.id_consumible

                                        INNER JOIN tipo_consumible tc
                                            ON c.id_tipo_consumible = tc.id_tipo_consumible

                                        WHERE mc.id_modelo = mo.id_modelo
											AND tc.id_tipo_consumible = $3
                                    )
                                )
                            )
                            FROM modelo mo
                            INNER JOIN tipo_equipo te
                                ON mo.id_tipo_equipo = te.id_tipo_equipo                            
                            WHERE mo.id_marca = $1
                            AND mo.id_modelo = $2
                        ) AS modelos
                    FROM marca m
                    WHERE m.id_marca = $1
                    ORDER BY m.marca;
        `;

            const result = await AuditDb.queryvalue(query, [
                id_marca,
                id_modelo,
                id_tipo_consumible
            ]);
            console.log("result:", result);
            return result.rows[0];
        }

        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }
}