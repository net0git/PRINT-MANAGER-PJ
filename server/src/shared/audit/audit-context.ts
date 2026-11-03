export interface AuditContext {
  c_aud_uid: string;            // nombre de usuario bd 
  c_aud_uidred: string;         // nombre de usuario (aplicación)
  c_aud_pc: string | null;      // nombre de la maquina (aplicación)
  c_aud_ip: string;             // ip del cliente (aplicación)
  c_aud_mac: string | null;     // mac del cliente (aplicación)
}