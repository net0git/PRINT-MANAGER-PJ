import { AreaController } from "./infrastructure/areaController";
import { AreaRepositoryBD } from "./infrastructure/areaRepositoryBD";
import { areaRoutes } from "./infrastructure/areaRoutes";
import { AreaUseCaseCreate } from "./application/areaUseCaseCreate";
import { AreaUseCaseFindAll } from "./application/areaUseCaseFindAll";
import { AreaUseCaseFindById } from "./application/areaUseCaseFindById";
import { AreaUseCaseUpdate } from "./application/areaUseCaseUpdate";

export const areaFactory = () => {
    // Repositories
    const areaRepository = new AreaRepositoryBD();

    // application
    const areaUseCaseCreate = new AreaUseCaseCreate(areaRepository);
    const areaUseCaseFindAll = new AreaUseCaseFindAll(areaRepository);
    const areaUseCaseFindById = new AreaUseCaseFindById(areaRepository);
    const areaUseCaseUpdate = new AreaUseCaseUpdate(areaRepository);

    // controller
    const areaController = new AreaController(
        areaUseCaseCreate,
        areaUseCaseFindAll,
        areaUseCaseFindById,
        areaUseCaseUpdate
    );

    // routes
    const router = areaRoutes(areaController);
    return router;
}