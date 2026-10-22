import { TipoConsumibleUseCaseCreate } from "./application/tipoConsumibleUseCaseCreate";
import { TipoConsumibleUseCaseFindAll } from "./application/tipoConsumibleUseCaseFindAll";
import { TipoConsumibleUseCaseFindById } from "./application/tipoConsumibleUseCaseFindById";
import { TipoConsumibleUseCaseUpdate } from "./application/tipoConsumibleUseCaseUpdate";
import { TipoConsumibleController } from "./infrastructure/tipoConsumibleController";
import { TipoConsumibleRepositoryBD } from "./infrastructure/tipoConsumibleRepositoryBD";
import { tipoConsumibleRoutes } from "./infrastructure/tipoConsumibleRoutes";

export const tipoConsumibleFactory = () => {
    // repository
    const tipoConsumibleRepository = new TipoConsumibleRepositoryBD();
    //application
    const tipoConsumibleUseCaseCreate = new TipoConsumibleUseCaseCreate(tipoConsumibleRepository);
    const tipoConsumibleUseCaseFindAll = new TipoConsumibleUseCaseFindAll(tipoConsumibleRepository);
    const tipoConsumibleUseCaseFindById = new TipoConsumibleUseCaseFindById(tipoConsumibleRepository);
    const tipoConsumibleUseCaseUpdate = new TipoConsumibleUseCaseUpdate(tipoConsumibleRepository);
    //controller
    const tipoConsumibleController = new TipoConsumibleController(tipoConsumibleUseCaseCreate, tipoConsumibleUseCaseFindAll, tipoConsumibleUseCaseFindById, tipoConsumibleUseCaseUpdate);
    //routes
    const router = tipoConsumibleRoutes(tipoConsumibleController);
    return router;
}   

