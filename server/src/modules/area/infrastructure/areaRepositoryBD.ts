import { Area } from "../domain/area";
import { AreaRepository } from "../domain/port-in/areaRepository";
import { AuditDb } from "../../../shared/database/audit-db";

export class AreaRepositoryBD implements AreaRepository {
    mapToArea(row: any): Area {
        return new Area(
            row.id_area,
            row.created_at,
            row.area,
            row.referencia,
            row.id_sede,
            row.estado
        );
    }

    async findAll(): Promise<Area[]> {
        const query = `SELECT * FROM area`;
        const result = await AuditDb.onlyquery(query);
        return result.rows.map((row: any) => this.mapToArea(row));
    }

    async findById(id_area: number): Promise<Area | undefined> {
        const query = `SELECT * FROM area WHERE id_area = $1`;
        const values = [id_area];
        const result = await AuditDb.queryvalue(query, values);
        return this.mapToArea(result.rows[0]);
    }

    async update(area: Area): Promise<void> {
        const result = await AuditDb.update("area", {
            area: area.area,
            referencia: area.referencia,
            id_sede: area.id_sede,
            estado: area.estado
        }, {
            id_area: area.id_area
        })

        if (result.rowCount === 0) {
            throw new Error("No se pudo actualizar el area");
        }
    }

    async create(area: Area): Promise<void> {
        const result = await AuditDb.insert('area', {
            created_at: area.created_at,
            area: area.area,
            referencia: area.referencia,
            id_sede: area.id_sede,
            estado: area.estado
        });
        console.log(result);
    }
}