import { SedeController } from "./infrastructure/sedeController";
import { SedeRepositoryBD } from "./infrastructure/sedeRepositoryBD";
import { sedeRoutes } from "./infrastructure/sedeRoutes";
import { SedeUseCaseCreate } from "./application/sedeUseCaseCreate";
import { SedeUseCaseFindAll } from "./application/sedeUseCaseFindAll";
import { SedeUseCaseFindById } from "./application/sedeUseCaseFindById";
import { SedeUseCaseUpdate } from "./application/sedeUseCaseUpdate";

export const sedeFactory = () => {
    // Repositories
    const sedeRepository = new SedeRepositoryBD();

    // application
    const sedeUseCaseCreate = new SedeUseCaseCreate(sedeRepository);
    const sedeUseCaseFindAll = new SedeUseCaseFindAll(sedeRepository);
    const sedeUseCaseFindById = new SedeUseCaseFindById(sedeRepository);
    const sedeUseCaseUpdate = new SedeUseCaseUpdate(sedeRepository);

    // controller
    const sedeController = new SedeController(
        sedeUseCaseCreate,
        sedeUseCaseFindAll,
        sedeUseCaseFindById,
        sedeUseCaseUpdate
    );

    // routes
    const router = sedeRoutes(sedeController);
    return router;
};