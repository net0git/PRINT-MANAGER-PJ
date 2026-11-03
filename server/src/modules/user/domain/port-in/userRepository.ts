import { User } from "../user";

export interface UserRepository {
    findById(id_usuario: number): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    create(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id_usuario: number): Promise<void>;
}