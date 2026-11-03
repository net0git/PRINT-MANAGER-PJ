import { UserUseCaseCreate } from "./application/userUseCaseCreate";
import { UserUseCaseFindAll } from "./application/userUseCaseFindAll";
import { UserUseCaseFindById } from "./application/userUseCaseFindById";
import { UserUseCaseUpdate } from "./application/userUseCaseUpdate";
import { UserUseCaseDelete } from "./application/userUseCaseDelete";
import { UserController } from "./infrastructure/userController";
import { UserRepositoryBD } from "./infrastructure/userRepositoryBD";
import { userRoutes } from "./infrastructure/userRoutes";

export const userFactory = () => {
    // repository
    const userRepository = new UserRepositoryBD();
    //application
    const userUseCaseCreate = new UserUseCaseCreate(userRepository);
    const userUseCaseFindAll = new UserUseCaseFindAll(userRepository);
    const userUseCaseFindById = new UserUseCaseFindById(userRepository);
    const userUseCaseUpdate = new UserUseCaseUpdate(userRepository);
    const userUseCaseDelete = new UserUseCaseDelete(userRepository);
    //controller
    const userController = new UserController(userUseCaseCreate, userUseCaseFindAll, userUseCaseFindById, userUseCaseUpdate, userUseCaseDelete);
    //routes
    const router = userRoutes(userController);
    return router;
}