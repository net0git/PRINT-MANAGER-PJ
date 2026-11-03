import { AuthController } from "./infrastructure/AuthController";
import { LoginUser } from "./application/login/LoginUser";
import { BcryptHashService } from "./infrastructure/services/BcryptHashService";
import { JwtService } from "./infrastructure/services/JwtService";
import { pgPool } from "../shared/database/database";
import { PostgresAuthRepository } from "./infrastructure/PosgresAuthRepository";
import { authRoutes } from "./infrastructure/AuthRoutes";

export const authFactory = () => {
    // repository
    const authRepository = new PostgresAuthRepository(pgPool);
    const hashService = new BcryptHashService();
    const jwtService = new JwtService();
    //application
    const loginUser = new LoginUser(authRepository, hashService, jwtService);
    //controller
    const authController = new AuthController(loginUser);
    //routes
    const router = authRoutes(authController);

    return router;
};

