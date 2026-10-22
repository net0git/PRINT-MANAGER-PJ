export class UserReset {
    public id_usuario: number;
    public username: string;
    public password?: string;

    constructor(id_usuario: number, username: string, password: string,) {
        this.id_usuario = id_usuario;
        this.username = username;
        this.password = password;
  
    }

    toString() {
        return `id_user ${this.id_usuario}, password: ${this.password}`;
    }

    public mapToPrimitives() {
        return {
            id_usuario: this.id_usuario,
            username: this.username,
            password: this.password
        };
    }

}