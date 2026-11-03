import { AuditProvider } from "../audit/audit-provider";
import { key } from "../database/key";

export function auditMiddleware(req: any, res: any, next: any) {
     const ipAddressClient = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    AuditProvider.setContext({
        c_aud_uid: key.user,
        c_aud_uidred: req.username,
        c_aud_pc: null,
        c_aud_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        c_aud_mac: null
    });

    console.log("Audit context set:", AuditProvider.getContext(), ipAddressClient);
    

    next();
}