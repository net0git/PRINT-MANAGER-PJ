import { UserResetController } from "./resetCount/infrastructure/userResetController";
import { UserResetUseCaseUpdate } from "./resetCount/application/userResetUseCaseUpdate";
import { UserResetUseCaseFindUserName } from "./resetCount/application/userResetUseCaseFindUserName";
import { UserResetRepositoryBD } from "./resetCount/infrastructure/userResetRepositoryBD";
import { userRoutes } from "./resetCount/infrastructure/userResetRoutes";

export const userResetFactory = () => {
    //repository
    const userRepository = new UserResetRepositoryBD();
    //application
    const userResetUseCaseUpdate = new UserResetUseCaseUpdate(userRepository);
    const userResetUseCaseFindUserName = new UserResetUseCaseFindUserName(userRepository);
    //controller
    const userResetController = new UserResetController(userResetUseCaseUpdate, userResetUseCaseFindUserName);

    //routes
    const userResetRoutes = userRoutes(userResetController);

    return userResetRoutes;
}