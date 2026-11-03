
import { AuditDb } from "../../../shared/database/audit-db";
import { TipoConsumibleRepository } from "../domain/port-in/tipoConsumibleRepository";
import { TipoConsumible } from "../domain/tipoConsumible";

export class TipoConsumibleRepositoryBD implements TipoConsumibleRepository {
    mapToTipoConsumible(row: any): TipoConsumible {
        return new TipoConsumible(
            row.id_tipo_consumible,
            row.created_at,
            row.tipo_consumible
        );
    }

    async findAll(): Promise<TipoConsumible[]> {
        const query = `SELECT * FROM tipo_consumible`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToTipoConsumible(row));
    }

    async findById(id_tipo_consumible: number): Promise<TipoConsumible | undefined> {
        const query = `SELECT * FROM tipo_consumible WHERE id_tipo_consumible = $1`;
        const values = [id_tipo_consumible];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToTipoConsumible(result.rows[0]);
    }

    async update(tipoConsumible: TipoConsumible): Promise<void> {
        const result = await AuditDb.update("tipo_consumible", {
            tipo_consumible: tipoConsumible.tipo_consumible
        }, {
            id_tipo_consumible: tipoConsumible.id_tipo_consumible
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el tipo de consumible");
        }
    }

    async create(tipoConsumible: TipoConsumible): Promise<void> {
        const result = await AuditDb.insert('tipo_consumible', {
            created_at: tipoConsumible.created_at,            
            tipo_consumible: tipoConsumible.tipo_consumible
        });
        console.log(result);
    }
}