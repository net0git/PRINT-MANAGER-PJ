import { UserReset } from "../domain/userReset";
import { UserResetRepository } from "../domain/port-in/userResetRepository";
import { encriptar } from "../../../shared/bcrypt/encryptor";

export class UserResetUseCaseUpdate {

    constructor(
        private userResetRepository: UserResetRepository
    ) { }

    async execute(username: string, password: string): Promise<UserReset> {
        const userReset = await this.userResetRepository.findByUsername(username);
        if (!userReset) {
            throw new Error("No existe el usuario");
        }       
        userReset.password = await encriptar(password);
        return this.userResetRepository.update(userReset);
    }
}