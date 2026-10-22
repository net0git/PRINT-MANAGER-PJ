import { TipoEquipoUseCaseCreate } from "./application/tipoEquipoUseCaseCreate";
import { TipoEquipoUseCaseFindAll } from "./application/tipoEquipoUseCaseFindAll";
import { TipoEquipoUseCaseFindById } from "./application/tipoEquipoUseCaseFindById";
import { TipoEquipoUseCaseUpdate } from "./application/tipoEquipoUseCaseUpdate";
import { TipoEquipoController } from "./infrastructure/tipoEquipoController";
import { TipoEquipoRepositoryBD } from "./infrastructure/tipoEquipoRepositoryBD";
import { tipoEquipoRoutes } from "./infrastructure/tipoEquipoRoutes";

export const tipoEquipoFactory = () => {
    // repository
    const tipoEquipoRepository = new TipoEquipoRepositoryBD();
    //application
    const tipoEquipoUseCaseCreate = new TipoEquipoUseCaseCreate(tipoEquipoRepository);
    const tipoEquipoUseCaseFindAll = new TipoEquipoUseCaseFindAll(tipoEquipoRepository);
    const tipoEquipoUseCaseFindById = new TipoEquipoUseCaseFindById(tipoEquipoRepository);
    const tipoEquipoUseCaseUpdate = new TipoEquipoUseCaseUpdate(tipoEquipoRepository);
    //controller
    const tipoEquipoController = new TipoEquipoController(tipoEquipoUseCaseCreate, tipoEquipoUseCaseFindAll, tipoEquipoUseCaseFindById, tipoEquipoUseCaseUpdate);
    //routes
    const router = tipoEquipoRoutes(tipoEquipoController);
    return router;
}
