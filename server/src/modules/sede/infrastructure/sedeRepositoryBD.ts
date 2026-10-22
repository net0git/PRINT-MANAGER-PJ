import { Sede } from "../domain/sede";
import { SedeRepository } from "../domain/port-in/sedeRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class SedeRepositoryBD implements SedeRepository {
    mapToSede(row: any): Sede {
        return new Sede(
            row.id_sede,
            row.created_at,
            row.sede,
            row.direccion,
            row.estado
        );
    }

    async findAll(): Promise<Sede[]> {
        const query = `SELECT * FROM sede`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToSede(row));
    }

    async findById(id_sede: number): Promise<Sede | undefined> {
        const query = `SELECT * FROM sede WHERE id_sede = $1`;
        const values = [id_sede];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToSede(result.rows[0]);
    }

    async update(sede: Sede): Promise<void> {
        const result = await AuditDb.update("sede", {
            sede: sede.sede,
            direccion: sede.direccion,
            estado: sede.estado
        }, {
            id_sede: sede.id_sede
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el sede");
        }
    }

    async create(sede: Sede): Promise<void> {
        const result = await AuditDb.insert('sede', {
            created_at: sede.created_at,
            sede: sede.sede,
            direccion: sede.direccion,
            estado: sede.estado
        });
        console.log(result);
    }
}