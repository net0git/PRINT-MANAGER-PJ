import { UserReportingQuery } from "../application/port/userReportinQuery";
import { UserDetailDto } from "../application/dto/userDetail.dto";

import { AuditDb } from "../../../shared/database/audit-db";

export class UserReportingQueryBD
    implements UserReportingQuery {

    async findAll(): Promise<UserDetailDto[]> {

        try {
            const query = `
            SELECT 
                u.id_usuario,
                u.nombre,
                u.ap_paterno,
                u.ap_materno,
                u.username,
                u.correo,
                u.telefono,
                u.estado,
                u.id_rol,
                u.created_at,
                r.rol
            FROM usuarios u
            INNER JOIN rol r
                ON u.id_rol = r.id_rol
        `;

            const result = await AuditDb.onlyquery(query);

            return result.rows;


        } catch (error) {
            console.error("Error obteniendo reporte de usuarios", error);
            throw new Error("Error obteniendo reporte de usuarios");
        }

    }
}