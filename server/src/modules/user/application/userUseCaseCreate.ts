import { UserRepository } from "../domain/port-in/userRepository";
import { User } from "../domain/user";
import { UserCorreo } from "../domain/valueObject/userCorreo";
import { UserPassword } from "../domain/valueObject/userPassword";
import { UserTelefono } from "../domain/valueObject/userTelefono";
import { UserUsername } from "../domain/valueObject/userUsername";
import { encriptar } from "../../../shared/bcrypt/encryptor";

export class UserUseCaseCreate {

    constructor(private userRepository: UserRepository) { }

    async execute(nombre: string, ap_paterno: string, ap_materno: string, correo: string, telefono: string, username: string, password: string, id_rol: number, estado: boolean): Promise<void> {
        const user = new User( 
                    0,
                    new Date(), 
                    nombre, 
                    ap_paterno, 
                    ap_materno, 
                    new UserCorreo(correo), 
                    new UserTelefono(telefono), 
                    new UserUsername(username), 
                    new UserPassword(await encriptar(password)), 
                    id_rol, 
                    estado);

        await this.userRepository.create(user);
    }
}