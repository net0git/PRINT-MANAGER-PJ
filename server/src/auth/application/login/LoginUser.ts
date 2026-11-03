import { AuthRepository } from "../../domain/port-in/AuthRepository";
import { HashService } from "../services/HashService";
import { JwtService } from "../services/JwtService";


export class LoginUser {

    constructor(
        private authRepository: AuthRepository,
        private hashService: HashService,
        private jwtService: JwtService
    ) { }

    async execute(name: string, password: string) {
        // 1. Buscar usuario
        const user = await this.authRepository.findByName(name);
        console.log("USER COMPLETO:", user);

        if (!user) {
            throw new Error("User not found");
        }

        // 2. Validar estado del usuario
        if (user.estado === false) {
            throw new Error("Usuario inactivo");
        }

        // 3. Validar password
        const isValid = await this.hashService.compare(
            password,
            user.password
        );

        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        // 4. Generar token
        const token = this.jwtService.sign({
            id_usuario: user.id_usuario,
            username: user.username,
            rol: user.rol
        });

        return {
            token: token,
            usuario: {
                id: user.id_usuario,
                username: user.username,
                nombre: user.nombre,
                ap_paterno: user.ap_paterno,
                ap_materno: user.ap_materno,
                correo: user.correo,
                telefono: user.telefono,
                estado: user.estado,
                rol: {
                    id: user.id_rol,
                    rol: user.rol
                }
            }
        };
    }
}