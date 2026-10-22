import { ModeloConsumible } from "../domain/modelo-consumible";
import { ModeloConsumibleRepository } from "../domain/port-in/modelo-consumibleRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class ModeloConsumibleRepositoryBD implements ModeloConsumibleRepository {
    mapToModeloConsumible(row: any): ModeloConsumible {
        return new ModeloConsumible(
            row.id_modelo_consumible,
            row.created_at,
            row.id_modelo,
            row.id_consumible
        );
    }

    async findAll(): Promise<ModeloConsumible[]> {
        const query = `SELECT * FROM modelo_consumible`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToModeloConsumible(row));
    }

    async findById(id_modelo_consumible: number): Promise<ModeloConsumible | undefined> {
        const query = `SELECT * FROM modelo_consumible WHERE id_modelo_consumible = $1`;
        const values = [id_modelo_consumible];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToModeloConsumible(result.rows[0]);
    }

    async create(modelo_consumible: ModeloConsumible): Promise<void> {
        const result = await AuditDb.insert('modelo_consumible', {
            created_at: modelo_consumible.created_at,
            id_modelo: modelo_consumible.id_modelo,
            id_consumible: modelo_consumible.id_consumible
        });
        console.log(result);
    }

    async update(modelo_consumible: ModeloConsumible): Promise<void> {
        const result = await AuditDb.update("modelo_consumible", {
            id_modelo: modelo_consumible.id_modelo,
            id_consumible: modelo_consumible.id_consumible
        }, 
        {
            id_modelo_consumible: modelo_consumible.id_modelo_consumible
        })
    }

    async delete(id_modelo_consumible: number): Promise<void> {
        const query = `DELETE FROM modelo_consumible WHERE id_modelo_consumible = $1`;
        const values = [id_modelo_consumible];
        await AuditDb.queryvalue(query, values);
        
    }
}