import { MarcaUseCaseCreate } from "./application/marcaUseCaseCreate";
import { MarcaUseCaseFindAll } from "./application/marcaUseCaseFindAll";
import { MarcaUseCaseFindById } from "./application/marcaUseCaseFindById";
import { MarcaUseCaseUpdate } from "./application/marcaUseCaseUpdate";
import { MarcaController } from "./infrastructure/marcaController";
import { MarcaRepositoryBD } from "./infrastructure/marcaRepositoryBD";
import { marcaRoutes } from "./infrastructure/marcaRoutes";

export const marcaFactory = () => {
    // repository
    const marcaRepository = new MarcaRepositoryBD();
    //application
    const marcaUseCaseCreate = new MarcaUseCaseCreate(marcaRepository);
    const marcaUseCaseFindAll = new MarcaUseCaseFindAll(marcaRepository);
    const marcaUseCaseFindById = new MarcaUseCaseFindById(marcaRepository);
    const marcaUseCaseUpdate = new MarcaUseCaseUpdate(marcaRepository);
    //controller
    const marcaController = new MarcaController(marcaUseCaseCreate, marcaUseCaseFindAll, marcaUseCaseFindById, marcaUseCaseUpdate);
    //routes
    const router = marcaRoutes(marcaController);
    return router;
}