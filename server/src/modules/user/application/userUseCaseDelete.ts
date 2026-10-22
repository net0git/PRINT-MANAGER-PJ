import { UserRepository } from "../domain/port-in/userRepository";

export class UserUseCaseDelete {
    constructor(private userRepository: UserRepository) { }

    async execute(id_usuario: number): Promise<void> {
        await this.userRepository.delete(id_usuario);
    }
}