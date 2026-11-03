import { pgPool } from "./database";
import { AuditProvider } from "../audit/audit-provider";

type QueryResult = any;

export class AuditDb {

    private static withAuditContext(data: any) {
        const auditContext = AuditProvider.getContext() ?? {};

        return {
            ...(data ?? {}),
            c_aud_uid: auditContext.c_aud_uid ?? null,
            c_aud_uidred: auditContext.c_aud_uidred ?? null,
            c_aud_pc: auditContext.c_aud_pc ?? null,
            c_aud_ip: auditContext.c_aud_ip ?? null,
            c_aud_mac: auditContext.c_aud_mac ?? null

        };
    }

    static async insert(table: string, data: any): Promise<QueryResult> {
        const finalData = await this.withAuditContext(data);
        console.log("DATA:", finalData);

        const keys = Object.keys(finalData);
        const values = Object.values(finalData);

        const columns = keys.join(", ");
        const params = keys.map((_, i) => `$${i + 1}`).join(", ");

        const query = `
            INSERT INTO ${table} (${columns})
            VALUES (${params})
            RETURNING *
        `;
        console.log("QUERY:", query);

        return pgPool.query(query, values);
    }

    static async update(table: string, data: any, where: any): Promise<QueryResult> {
        const finalData = await this.withAuditContext(data);

        const dataKeys = Object.keys(finalData);
        const dataValues = Object.values(finalData);

        const setClause = dataKeys
            .map((key, i) => `${key} = $${i + 1}`)
            .join(", ");

        const whereKeys = Object.keys(where);
        const whereValues = Object.values(where);

        const whereClause = whereKeys
            .map((key, i) => `${key} = $${i + 1 + dataKeys.length}`)
            .join(" AND ");

        const query = `
            UPDATE ${table}
            SET ${setClause}
            WHERE ${whereClause}
            RETURNING *
        `;

        return pgPool.query(query, [...dataValues, ...whereValues]);
    }

    static async delete(table: string, where: any): Promise<QueryResult> {
        const whereKeys = Object.keys(where);
        const whereValues = Object.values(where);

        const whereClause = whereKeys
            .map((key, i) => `${key} = $${i + 1}`)
            .join(" AND ");

        const query = `
            DELETE FROM ${table}
            WHERE ${whereClause}
        `;

        return pgPool.query(query, whereValues);
    }

    static async queryvalue(query: string, values: any[]) {
        return pgPool.query(query, values);
    }

    static async onlyquery(query: string) {
        return pgPool.query(query);
    }

    static async queryValues(query: string, values: any[]) {
        return pgPool.query(query, values);
    }
}