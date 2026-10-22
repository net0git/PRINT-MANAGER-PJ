import { UserResetRepository } from "../domain/port-in/userResetRepository";

export class UserResetUseCaseFindUserName {

    constructor(
        private userResetRepository: UserResetRepository
    ) { }

    async execute(username: string): Promise<boolean> {
        const userReset = await this.userResetRepository.findByUsername(username);
        return !!userReset;
    }
}