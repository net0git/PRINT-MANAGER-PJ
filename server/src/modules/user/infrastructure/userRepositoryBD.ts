import { User } from "../domain/user";
import { UserCorreo } from "../domain/valueObject/userCorreo";
import { UserTelefono } from "../domain/valueObject/userTelefono";
import { UserUsername } from "../domain/valueObject/userUsername";
import { UserPassword } from "../domain/valueObject/userPassword";
import { UserRepository } from "../domain/port-in/userRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class UserRepositoryBD implements UserRepository {
    mapToUser(row: any): User {
        return new User(
            row.id_usuario,
            row.created_at,
            row.nombre,
            row.ap_paterno,
            row.ap_materno,
            new UserCorreo(row.correo),
            new UserTelefono(row.telefono),
            new UserUsername(row.username),
            new UserPassword(row.password),
            row.id_rol,
            row.estado
        );
    }

    async findById(id_usuario: number): Promise<User | undefined> {
        const query = `SELECT * FROM usuarios WHERE id_usuario = $1`;
        const values = [id_usuario];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToUser(result.rows[0]);
    }

    async findAll(): Promise<User[]> {
        const query = `SELECT * FROM usuarios`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToUser(row));
    }

    async create(user: User): Promise<void> {
        const result = await AuditDb.insert('usuarios', {

            nombre: user.nombre,
            ap_paterno: user.ap_paterno,
            ap_materno: user.ap_materno,
            correo: user.correo.getValue(),
            telefono: user.telefono.getValue(),
            username: user.username.getValue(),
            password: user.password?.getValue(),
            id_rol: user.id_rol,
            estado: user.estado,
            created_at: new Date()
        });
        console.log(result);

    }

    async update(user: User): Promise<void> {
        const result = await AuditDb.update("usuarios", {
            username: user.username.getValue(),
            password: user.password?.getValue(),
            nombre: user.nombre,
            ap_paterno: user.ap_paterno,
            ap_materno: user.ap_materno,
            correo: user.correo.getValue(),
            telefono: user.telefono.getValue(),
            id_rol: user.id_rol,
            estado: user.estado

        }, {
            id_usuario: user.id_usuario
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el usuario");
        }


    }

    async delete(id_usuario: number): Promise<void> {
        const result = await AuditDb.delete("usuarios", {
            id_usuario
        });

        if (result.rowCount === 0) {
            throw new Error("No se pudo eliminar el usuario");
        }
    }

}