import { UserRepository } from "../domain/port-in/userRepository";
import { User } from "../domain/user";

export class UserUseCaseFindAll {

    constructor(private userRepository: UserRepository) { }

    async execute(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}