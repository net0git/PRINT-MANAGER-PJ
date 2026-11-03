import { AuditContext } from "./audit-context";

export class AuditProvider {
    private static context: AuditContext;

    public static setContext(context: AuditContext) {
        this.context = context;
    }

    public static getContext(): AuditContext {
        return this.context;
    }
}