import { encriptar } from "../../../shared/bcrypt/encryptor";
import { UserRepository } from "../domain/port-in/userRepository";
import { User } from "../domain/user";
import { UserCorreo } from "../domain/valueObject/userCorreo";
import { UserPassword } from "../domain/valueObject/userPassword";
import { UserTelefono } from "../domain/valueObject/userTelefono";
import { UserUsername } from "../domain/valueObject/userUsername";

export class UserUseCaseUpdate {

    constructor(private userRepository: UserRepository) { }

    async execute(id_usuario: number, nombre: string, ap_paterno: string, ap_materno: string, correo: string, telefono: string, username: string, password: string, id_rol: number, estado: boolean):
     Promise<void> {
        
        let encryptedPassword: UserPassword ;
         if (password && password.trim() !== '') {
            encryptedPassword = new UserPassword(
                await encriptar(password)
            )
        } else {
            encryptedPassword = new UserPassword(
                await encriptar("123456")
            )
        }

        const user = new User(
            id_usuario,
            new Date(),
            nombre,
            ap_paterno,
            ap_materno,
            new UserCorreo(correo),
            new UserTelefono(telefono),
            new UserUsername(username),
            encryptedPassword,
            id_rol,
            estado
        );
            console.log("userServer", user);
        await this.userRepository.update(user);
    }
}