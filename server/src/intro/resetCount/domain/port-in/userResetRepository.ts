import { UserReset } from "../userReset";

export interface UserResetRepository {
    findByUsername(username: string): Promise<UserReset | null>;
    update(userReset: UserReset): Promise<UserReset>;
}