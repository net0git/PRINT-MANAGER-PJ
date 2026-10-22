import { Pool } from "pg";
import { AuthUser } from "../domain/AuthUser";
import { AuthRepository } from "../domain/port-in/AuthRepository";

export class PostgresAuthRepository implements AuthRepository {
  constructor(private db: Pool) {}

  private mapToAuthUser(row: any): AuthUser {
    return new AuthUser(
      row.id_usuario,
      row.username,
      row.password,
      row.nombre,
      row.ap_paterno,
      row.ap_materno,
      row.correo,
      row.telefono,
      row.estado,
      row.id_rol,
      row.rol
    );
  }

  async findByName(name: string): Promise<AuthUser | undefined> {
    // const query = "SELECT id_usuario, username, password FROM usuarios WHERE username = $1";
    const query = `SELECT 
                  u.id_usuario, u.username, u.password, u.nombre, 
                  u.ap_paterno, u.ap_materno, u.correo, u.telefono, u.estado,
                  u.id_rol,
                  r.rol 
                  FROM usuarios u
                  INNER JOIN rol r ON u.id_rol = r.id_rol
                  WHERE u.username = $1`;
    const result = await this.db.query(query, [name]);

    if (result.rows.length === 0) {
      return undefined;
    }

    return this.mapToAuthUser(result.rows[0]);
  }
}