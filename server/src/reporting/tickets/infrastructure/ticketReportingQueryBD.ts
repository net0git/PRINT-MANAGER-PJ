import { TicketReportingQuery } from "../application/port/ticketReportingQuery";
import { TicketDetailDto } from "../application/dto/ticketDetail.dto";
import { AuditDb } from "../../../shared/database/audit-db";
import { TicketCountStatusDto } from "../application/dto/ticketCountStatus.dto";
import { TicketCountMesDto } from "../application/dto/ticketCountMes.dto";

export class TicketReportingQueryBD implements TicketReportingQuery {


    mapToTicketDetail(row: any): TicketDetailDto {
        return {
            id_ticket: row.id_ticket,
            codigo: row.codigo,
            created_at: row.created_at,
            descripcion: row.descripcion,
            estado_general: row.estado_general,
            estado_general_descripcion: row.estado_general_descripcion,
            impresora: {
                id_marca: row.impresora.id_marca, 
                id_modelo:row.impresora.id_modelo,
                marca: row.impresora.marca,
                modelo: row.impresora.modelo,
                ip: row.impresora.ip
            },
            consumible: {
                id_consumible: row.consumible.id_consumible,
                nro_parte: row.consumible.nro_parte,
                id_tipo_consumible: row.consumible.id_tipo_consumible,
                tipo_consumible: row.consumible.tipo_consumible
            },
            usuario: {
                id_usuario: row.usuario.id_usuario,
                nombre: row.usuario.nombre,
                ap_paterno: row.usuario.ap_paterno,
                ap_materno: row.usuario.ap_materno,
                correo: row.usuario.correo,
                telefono: row.usuario.telefono,
                id_rol: row.usuario.id_rol,
                rol: row.usuario.rol
            },
            area: {
                id_area: row.area.id_area,
                area: row.area.area,
                sede: row.area.sede
            },
            estado: {
                informatica: {
                    id_usuario: row.estado?.informatica?.id_usuario,
                    nombre: row.estado?.informatica?.nombre,
                    estado: row.estado?.informatica?.estado,
                    mensaje: row.estado?.informatica?.mensaje,
                    fecha: row.estado?.informatica?.fecha
                },
                almacen: {
                    id_usuario: row.estado?.almacen?.id_usuario,
                    nombre: row.estado?.almacen?.nombre,
                    estado: row.estado?.almacen?.estado,
                    mensaje: row.estado?.almacen?.mensaje,
                    fecha: row.estado?.almacen?.fecha
                }
            }

        };
    }

    mapToTicketCountStatus(row: any): TicketCountStatusDto {
        return {
            total_solicitudes: row.total_solicitudes,
            total_pendientes: row.total_pendientes,
            total_almacen: row.total_almacen,
            total_finalizados: row.total_finalizados,
            total_rechazados: row.total_rechazados
        }
    }

    mapToTicketCountMes(row: any): TicketCountMesDto {
        return {
            mes: row.mes,
            cantidad: row.cantidad
        }
    }


    async findAll(anio: string,
        id_usuario: number,
        id_rol: number): Promise<TicketDetailDto[]> {

        try {
            const query = `
            SELECT
                    t.id_ticket,
                    t.codigo,
                    t.created_at,
                    t.descripcion,
                    t.estado_general,
                    CASE t.estado_general
                        WHEN 'I' THEN 'PENDIENTE DE VALIDACIÓN'
                        WHEN 'A' THEN 'LISTO PARA ALMACÉN'
                        WHEN 'F' THEN 'FINALIZADO'
                        WHEN 'R' THEN 'RECHAZADO'
                        ELSE NULL
                    END AS estado_general_descripcion,

                    (
                        SELECT json_build_object(
                            'id_marca', ma.id_marca,
                            'id_modelo', mo.id_modelo,
                            'marca', ma.marca,
                            'modelo', mo.modelo,
                            'ip', COALESCE(t.ip, 'Conexión directa')
                        )
                        FROM modelo mo
                        INNER JOIN marca ma
                            ON mo.id_marca = ma.id_marca
                        WHERE mo.id_modelo = t.id_modelo
                    ) AS impresora,

                    (
						    SELECT json_build_object(
						        'id_consumible', c.id_consumible,
						        'nro_parte', c.nro_parte,
						        'id_tipo_consumible', tc.id_tipo_consumible,
						         'tipo_consumible', tc.tipo_consumible
						        
						    )
						    FROM tipo_consumible tc
						    LEFT JOIN consumible c
						        ON c.id_consumible = t.id_consumible
						    WHERE tc.id_tipo_consumible = t.id_tipo_consumible
						) AS consumible,

                    (
					    SELECT json_build_object(
					        'id_usuario', u.id_usuario,
					        'nombre', u.nombre,
					        'ap_paterno', u.ap_paterno,
					        'ap_materno', u.ap_materno,
					        'correo', u.correo,
					        'telefono', u.telefono,
					        'id_rol', r.id_rol,
					        'rol', r.rol
					    )
					    FROM usuarios u
					    INNER JOIN rol r
					        ON u.id_rol = r.id_rol
					    WHERE u.id_usuario = t.id_usuario
					) AS usuario,
					

                    (
                        SELECT json_build_object(
                            'id_area', a.id_area,
                            'area', a.area,
                            'referencia', a.referencia,
                            'sede',
                            json_build_object(
                                'id_sede', s.id_sede,
                                'sede', s.sede,
                                'direccion', s.direccion
                            )
                        )
                        FROM area a
                        INNER JOIN sede s
                            ON a.id_sede = s.id_sede
                        WHERE a.id_area = t.id_area
                    ) AS area,
				json_build_object(
				    'informatica',
				    json_build_object(
				        'id_usuario', uti.id_usuario,
				        'nombre',
				            CASE
				                WHEN uti.id_usuario IS NULL THEN NULL
				                ELSE CONCAT_WS(' ', uti.nombre, uti.ap_paterno, uti.ap_materno)
				            END,
				        'estado', t.estado_ti,
				        'mensaje', t.ti_mensaje,
						'fecha', t.fecha_ti
				    ),
				
				    'almacen',
				    json_build_object(
				        'id_usuario', ual.id_usuario,
				        'nombre',
				            CASE
				                WHEN ual.id_usuario IS NULL THEN NULL
				                ELSE CONCAT_WS(' ', ual.nombre, ual.ap_paterno, ual.ap_materno)
				            END,
				        'estado', t.estado_al,
				        'mensaje', t.al_mensaje,
						'fecha', t.fecha_al
				    )
				) AS estado

				FROM ticket t

                INNER JOIN usuarios u
				    ON u.id_usuario = t.id_usuario
				
				LEFT JOIN usuarios uti
				    ON uti.id_usuario = t.id_usuario_ti
				
				LEFT JOIN usuarios ual
				    ON ual.id_usuario = t.id_usuario_al
				
				WHERE
				    EXTRACT(YEAR FROM t.created_at) = $1
				    AND (
				        $3 <> 4
				        OR t.id_usuario = $2
				    )
				
				ORDER BY t.created_at DESC;
            `;

            const result = await AuditDb.queryValues(query, [
                anio,
                id_usuario,
                id_rol

            ]);
            // console.log("anio all:", anio, "id_rol:", id_rol, "id_usuario:", id_usuario)
            return result.rows.map((row: any) => this.mapToTicketDetail(row));

        }

        catch (error) {
            console.error("Error obteniendo reporte de tickets", error);
            throw new Error("Error obteniendo reporte de tickets");
        }
    }

    async findAllPendientes(anio: string): Promise<TicketDetailDto[]> {
        try {
            const query = `
                SELECT
                    t.id_ticket,
                    t.codigo,
                    t.created_at,
                    t.descripcion,
                    t.estado_general,
                    CASE t.estado_general
                        WHEN 'I' THEN 'PENDIENTE DE VALIDACIÓN'
                        WHEN 'A' THEN 'LISTO PARA ALMACÉN'
                        WHEN 'F' THEN 'FINALIZADO'
                        WHEN 'R' THEN 'RECHAZADO'
                        ELSE NULL
                    END AS estado_general_descripcion,

                    (
                        SELECT json_build_object(
                            'id_marca', ma.id_marca,
                            'id_modelo', mo.id_modelo,
                            'marca', ma.marca,
                            'modelo', mo.modelo,
                            'ip', COALESCE(t.ip, 'Conexión directa')
                        )
                        FROM modelo mo
                        INNER JOIN marca ma
                            ON mo.id_marca = ma.id_marca
                        WHERE mo.id_modelo = t.id_modelo
                    ) AS impresora,

                    (
						    SELECT json_build_object(
						        'id_consumible', c.id_consumible,
						        'nro_parte', c.nro_parte,
						        'id_tipo_consumible', tc.id_tipo_consumible,
						         'tipo_consumible', tc.tipo_consumible
						        
						    )
						    FROM tipo_consumible tc
						    LEFT JOIN consumible c
						        ON c.id_consumible = t.id_consumible
						    WHERE tc.id_tipo_consumible = t.id_tipo_consumible
						) AS consumible,

                    (
					    SELECT json_build_object(
					        'id_usuario', u.id_usuario,
					        'nombre', u.nombre,
					        'ap_paterno', u.ap_paterno,
					        'ap_materno', u.ap_materno,
					        'correo', u.correo,
					        'telefono', u.telefono,
					        'id_rol', r.id_rol,
					        'rol', r.rol
					    )
					    FROM usuarios u
					    INNER JOIN rol r
					        ON u.id_rol = r.id_rol
					    WHERE u.id_usuario = t.id_usuario
					) AS usuario,
					

                    (
                        SELECT json_build_object(
                            'id_area', a.id_area,
                            'area', a.area,
                            'referencia', a.referencia,
                            'sede',
                            json_build_object(
                                'id_sede', s.id_sede,
                                'sede', s.sede,
                                'direccion', s.direccion
                            )
                        )
                        FROM area a
                        INNER JOIN sede s
                            ON a.id_sede = s.id_sede
                        WHERE a.id_area = t.id_area
                    ) AS area,
				json_build_object(
				    'informatica',
				    json_build_object(
				        'id_usuario', uti.id_usuario,
				        'nombre',
				            CASE
				                WHEN uti.id_usuario IS NULL THEN NULL
				                ELSE CONCAT_WS(' ', uti.nombre, uti.ap_paterno, uti.ap_materno)
				            END,
				        'estado', t.estado_ti,
				        'mensaje', t.ti_mensaje,
						'fecha', t.fecha_ti
				    ),
				
				    'almacen',
				    json_build_object(
				        'id_usuario', ual.id_usuario,
				        'nombre',
				            CASE
				                WHEN ual.id_usuario IS NULL THEN NULL
				                ELSE CONCAT_WS(' ', ual.nombre, ual.ap_paterno, ual.ap_materno)
				            END,
				        'estado', t.estado_al,
				        'mensaje', t.al_mensaje,
						'fecha', t.fecha_al
				    )
				) AS estado

				FROM ticket t

                INNER JOIN usuarios u
				    ON u.id_usuario = t.id_usuario
				
				LEFT JOIN usuarios uti
				    ON uti.id_usuario = t.id_usuario_ti
				
				LEFT JOIN usuarios ual
				    ON ual.id_usuario = t.id_usuario_al
				
				WHERE
                    EXTRACT(YEAR FROM t.created_at) = $1
                    AND t.estado_general = 'I'

                ORDER BY t.created_at DESC;
                
            `;

            const result = await AuditDb.queryValues(query, [
                anio

            ]);
            console.log("anio:", anio)
            return result.rows.map((row: any) => this.mapToTicketDetail(row));

        }

        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

    async findAllAlmacen(anio: string): Promise<TicketDetailDto[]> {
        try {
            const query = `
                SELECT
                    t.id_ticket,
                    t.codigo,
                    t.created_at,
                    t.descripcion,
                    t.estado_general,
                    CASE t.estado_general
                        WHEN 'I' THEN 'PENDIENTE DE VALIDACIÓN'
                        WHEN 'A' THEN 'LISTO PARA ALMACÉN'
                        WHEN 'F' THEN 'FINALIZADO'
                        WHEN 'R' THEN 'RECHAZADO'
                        ELSE NULL
                    END AS estado_general_descripcion,

                    (
                        SELECT json_build_object(
                            'id_marca', ma.id_marca,
                            'id_modelo', mo.id_modelo,
                            'marca', ma.marca,
                            'modelo', mo.modelo,
                            'ip', COALESCE(t.ip, 'Conexión directa')
                        )
                        FROM modelo mo
                        INNER JOIN marca ma
                            ON mo.id_marca = ma.id_marca
                        WHERE mo.id_modelo = t.id_modelo
                    ) AS impresora,

                    (
						    SELECT json_build_object(
						        'id_consumible', c.id_consumible,
						        'nro_parte', c.nro_parte,
						        'id_tipo_consumible', tc.id_tipo_consumible,
						         'tipo_consumible', tc.tipo_consumible
						        
						    )
						    FROM tipo_consumible tc
						    LEFT JOIN consumible c
						        ON c.id_consumible = t.id_consumible
						    WHERE tc.id_tipo_consumible = t.id_tipo_consumible
						) AS consumible,

                    (
					    SELECT json_build_object(
					        'id_usuario', u.id_usuario,
					        'nombre', u.nombre,
					        'ap_paterno', u.ap_paterno,
					        'ap_materno', u.ap_materno,
					        'correo', u.correo,
					        'telefono', u.telefono,
					        'id_rol', r.id_rol,
					        'rol', r.rol
					    )
					    FROM usuarios u
					    INNER JOIN rol r
					        ON u.id_rol = r.id_rol
					    WHERE u.id_usuario = t.id_usuario
					) AS usuario,
					

                    (
                        SELECT json_build_object(
                            'id_area', a.id_area,
                            'area', a.area,
                            'referencia', a.referencia,
                            'sede',
                            json_build_object(
                                'id_sede', s.id_sede,
                                'sede', s.sede,
                                'direccion', s.direccion
                            )
                        )
                        FROM area a
                        INNER JOIN sede s
                            ON a.id_sede = s.id_sede
                        WHERE a.id_area = t.id_area
                    ) AS area,
				json_build_object(
				    'informatica',
				    json_build_object(
				        'id_usuario', uti.id_usuario,
				        'nombre',
				            CASE
				                WHEN uti.id_usuario IS NULL THEN NULL
				                ELSE CONCAT_WS(' ', uti.nombre, uti.ap_paterno, uti.ap_materno)
				            END,
				        'estado', t.estado_ti,
				        'mensaje', t.ti_mensaje,
						'fecha', t.fecha_ti
				    ),
				
				    'almacen',
				    json_build_object(
				        'id_usuario', ual.id_usuario,
				        'nombre',
				            CASE
				                WHEN ual.id_usuario IS NULL THEN NULL
				                ELSE CONCAT_WS(' ', ual.nombre, ual.ap_paterno, ual.ap_materno)
				            END,
				        'estado', t.estado_al,
				        'mensaje', t.al_mensaje,
						'fecha', t.fecha_al
				    )
				) AS estado

				FROM ticket t

                INNER JOIN usuarios u
				    ON u.id_usuario = t.id_usuario
				
				LEFT JOIN usuarios uti
				    ON uti.id_usuario = t.id_usuario_ti
				
				LEFT JOIN usuarios ual
				    ON ual.id_usuario = t.id_usuario_al
				
				WHERE
                    EXTRACT(YEAR FROM t.created_at) = $1
                    AND t.estado_general = 'A'

                ORDER BY t.created_at DESC;
            `;
            const result = await AuditDb.queryValues(query, [
                anio
            ]);
            console.log("anio:", anio)
            return result.rows.map((row: any) => this.mapToTicketDetail(row));
        }
        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

    async findCountStatus(anio: string): Promise<TicketCountStatusDto> {
        console.log("anio:", anio);
        try {
            const query = `
                SELECT
                    COUNT(DISTINCT(t.id_ticket)) AS total_solicitudes,
                    COUNT(DISTINCT(CASE WHEN t.estado_general = 'I' THEN t.id_ticket END)) AS total_pendientes,
                    COUNT(DISTINCT(CASE WHEN t.estado_general = 'A' THEN t.id_ticket END)) AS total_almacen,
                    COUNT(DISTINCT(CASE WHEN t.estado_general = 'F' THEN t.id_ticket END)) AS total_finalizados,
                    COUNT(DISTINCT(CASE WHEN t.estado_general = 'R' THEN t.id_ticket END)) AS total_rechazados
                FROM ticket t
                WHERE EXTRACT(YEAR FROM t.created_at) = $1
            `;
            const result = await AuditDb.queryvalue(query, [
                anio
            ]);
            
            // console.log("result:", result.rows[0]);
            return this.mapToTicketCountStatus(result.rows[0]);
        }
        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

    async findCountMes(anio: string): Promise<TicketCountMesDto[]> {
        console.log("anio:", anio);
        try {
            const query = `
                SELECT
                    CASE m.mes
                        WHEN 1 THEN 'Ene'
                        WHEN 2 THEN 'Feb'
                        WHEN 3 THEN 'Mar'
                        WHEN 4 THEN 'Abr'
                        WHEN 5 THEN 'May'
                        WHEN 6 THEN 'Jun'
                        WHEN 7 THEN 'Jul'
                        WHEN 8 THEN 'Ago'
                        WHEN 9 THEN 'Sep'
                        WHEN 10 THEN 'Oct'
                        WHEN 11 THEN 'Nov'
                        WHEN 12 THEN 'Dic'
                    END AS mes,
                    COALESCE(COUNT(t.id_ticket), 0) AS cantidad
                FROM generate_series(1, 12) AS m(mes)
                LEFT JOIN ticket t
                    ON EXTRACT(MONTH FROM t.created_at) = m.mes
                    AND EXTRACT(YEAR FROM t.created_at) = $1
                GROUP BY m.mes
                ORDER BY m.mes;
            `;
            const result = await AuditDb.queryvalue(query, [
                anio
            ]);
            console.log("anio:", anio)
            return result.rows.map((row: any) => this.mapToTicketCountMes(row));
        }
        catch (error) {
            console.error("Error obteniendo reporte de consumibles", error);
            throw new Error("Error obteniendo reporte de consumibles");
        }
    }

}