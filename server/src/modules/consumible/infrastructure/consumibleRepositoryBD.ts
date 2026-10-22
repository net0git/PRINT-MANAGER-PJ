import { AuditDb } from "../../../shared/database/audit-db";
import { Consumible } from "../domain/consumible";
import { ConsumibleRepository } from "../domain/port-in/consumibleResository";

export class ConsumibleRepositoryBD implements ConsumibleRepository {
    mapToConsumible(row: any): Consumible {
        return new Consumible(
            row.id_consumible,
            row.created_at,
            row.nro_parte,
            row.id_tipo_consumible,
            row.id_marca
        );
    }

    async findAll(): Promise<Consumible[]> {
        const query = `SELECT * FROM consumible`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToConsumible(row));
    }

    async findById(id_consumible: number): Promise<Consumible | undefined> {
        const query = `SELECT * FROM consumible WHERE id_consumible = $1`;
        const values = [id_consumible];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToConsumible(result.rows[0]);
    }

    async update(consumible: Consumible): Promise<void> {
        const result = await AuditDb.update("consumible", {
            nro_parte: consumible.nro_parte,
            id_tipo_consumible: consumible.id_tipo_consumible,
            id_marca: consumible.id_marca
        }, {
            id_consumible: consumible.id_consumible
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el consumible");
        }
    }

    async create(consumible: Consumible): Promise<void> {
        const result = await AuditDb.insert('consumible', {
            created_at: consumible.created_at,
            nro_parte: consumible.nro_parte,
            id_tipo_consumible: consumible.id_tipo_consumible,
            id_marca: consumible.id_marca
        });
        console.log(result);
    }
}