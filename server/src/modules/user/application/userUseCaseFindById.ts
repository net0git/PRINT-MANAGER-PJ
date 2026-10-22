import { UserRepository } from "../domain/port-in/userRepository";
import { User } from "../domain/user";

export class UserUseCaseFindById {

    constructor(private userRepository: UserRepository) { }

    async execute(id_usuario: number): Promise<User | undefined> {
        return await this.userRepository.findById(id_usuario);
    }
}