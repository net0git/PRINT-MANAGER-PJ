import { UserReset } from "../domain/userReset";
import { UserResetRepository } from "../domain/port-in/userResetRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class UserResetRepositoryBD implements UserResetRepository {
    mapToUserReset(row: any): UserReset {
        return new UserReset(
            row.id_usuario,
            row.username,
            row.password
        );
    }

    async findByUsername(username: string): Promise<UserReset | null> {
    const query = `SELECT * FROM usuarios WHERE username = $1`;
    const values = [username];

    const result = await AuditDb.queryvalue(query, values);

    if (result.rows.length === 0) {
        return null;
    }

    return this.mapToUserReset(result.rows[0]);
    }

    async update(userReset: UserReset): Promise<UserReset> {
        const query = `
        UPDATE usuarios
        SET password = $1
        WHERE username = $2
        AND username <> 'admin'
        RETURNING *
        `;

        const result = await AuditDb.queryvalue(query, [
            userReset.password,
            userReset.username
        ]);

        if (result.rows.length === 0) {
            throw new Error(
                userReset.username === 'admin'
                    ? 'El usuario admin no puede ser modificado'
                    : 'No se pudo actualizar el usuario'
            );
        }

        return this.mapToUserReset(result.rows[0]);
    }
}