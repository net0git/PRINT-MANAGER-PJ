import { AuditDb } from "../../../shared/database/audit-db";
import { TipoEquipoRepository } from "../domain/port-in/tipoEquipoRepository";
import { TipoEquipo } from "../domain/tipoEquipo";

export class TipoEquipoRepositoryBD implements TipoEquipoRepository {
    mapToTipoEquipo(row: any): TipoEquipo {
        return new TipoEquipo(
            row.id_tipo_equipo,
            row.created_at,
            row.tipo_equipo,
            row.descripcion
        );
    }

    async findAll(): Promise<TipoEquipo[]> {
        const query = `SELECT * FROM tipo_equipo`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToTipoEquipo(row));
    }

    async findById(id_tipo_equipo: number): Promise<TipoEquipo | undefined> {
        const query = `SELECT * FROM tipo_equipo WHERE id_tipo_equipo = $1`;
        const values = [id_tipo_equipo];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToTipoEquipo(result.rows[0]);
    }

    async update(tipoEquipo: TipoEquipo): Promise<void> {
        const result = await AuditDb.update("tipo_equipo", {
            tipo_equipo: tipoEquipo.tipo_equipo,
            descripcion: tipoEquipo.descripcion
        }, {
            id_tipo_equipo: tipoEquipo.id_tipo_equipo
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el tipo de equipo");
        }
    }

    async create(tipoEquipo: TipoEquipo): Promise<void> {
        const result = await AuditDb.insert('tipo_equipo', {
            created_at: tipoEquipo.created_at,
            tipo_equipo: tipoEquipo.tipo_equipo,
            descripcion: tipoEquipo.descripcion
        });
        console.log(result);
    }

}