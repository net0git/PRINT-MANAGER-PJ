import { Modelo } from "../domain/modelo";
import { ModeloRepository } from "../domain/port-in/modeloRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class ModeloRepositoryBD implements ModeloRepository {
    mapToModelo(row: any): Modelo {
        return new Modelo(
            row.id_modelo,
            row.created_at,
            row.modelo,
            row.estado,
            row.id_marca,
            row.id_tipo_equipo
        );
    }

    async findAll(): Promise<Modelo[]> {
        const query = `SELECT * FROM modelo`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToModelo(row));
    }

    async findById(id_modelo: number): Promise<Modelo | undefined> {
        const query = `SELECT * FROM modelo WHERE id_modelo = $1`;
        const values = [id_modelo];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToModelo(result.rows[0]);
    }

    async update(modelo: Modelo): Promise<void> {
        const result = await AuditDb.update("modelo", {
            modelo: modelo.modelo,
            estado: modelo.estado,
            id_marca: modelo.id_marca,
            id_tipo_equipo: modelo.id_tipo_equipo
        }, {
            id_modelo: modelo.id_modelo
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el modelo");
        }
    }

    async create(modelo: Modelo): Promise<void> {
        const result = await AuditDb.insert('modelo', {
            created_at: modelo.created_at,
            modelo: modelo.modelo,
            estado: modelo.estado,
            id_marca: modelo.id_marca,
            id_tipo_equipo: modelo.id_tipo_equipo
        });
        console.log(result);
    }
}