import { AuthUser } from "../AuthUser";

export interface AuthRepository {
    findByName(username: string): Promise<AuthUser | undefined>;
}