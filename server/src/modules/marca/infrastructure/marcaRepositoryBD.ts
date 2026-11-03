import { Marca } from "../domain/marca";
import { MarcaRepository } from "../domain/port-in/marcaRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class MarcaRepositoryBD implements MarcaRepository {
    mapToMarca(row: any): Marca {
        return new Marca(
            row.id_marca,
            row.created_at,
            row.marca,
            row.estado
        );
    }

    async findAll(): Promise<Marca[]> {
        const query = `SELECT * FROM marca`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToMarca(row));
    }

    async findById(id_marca: number): Promise<Marca | undefined> {
        const query = `SELECT * FROM marca WHERE id_marca = $1`;
        const values = [id_marca];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToMarca(result.rows[0]);
    }

    async update(marca: Marca): Promise<void> {
        const result = await AuditDb.update("marca", {

            marca: marca.marca,
            estado: marca.estado
        }, {
            id_marca: marca.id_marca
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el marca");
        }
    }

    async create(marca: Marca): Promise<void> {
        const result = await AuditDb.insert('marca', {
            created_at: marca.created_at,
            marca: marca.marca,
            estado: marca.estado
        });
        console.log(result);
    }
}