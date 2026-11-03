import { ModeloController } from "./infrastructure/modeloController";
import { ModeloRepositoryBD } from "./infrastructure/modeloRepositoryBD";
import { modeloRoutes } from "./infrastructure/modeloRoutes";
import { ModeloUseCaseCreate } from "./application/modeloUseCaseCreate";
import { ModeloUseCaseFindAll } from "./application/modeloUseCaseFindAll";
import { ModeloUseCaseFindById } from "./application/modeloUseCaseFindById";
import { ModeloUseCaseUpdate } from "./application/modeloUseCaseUpdate";

export const modeloFactory = () => {
    // repository
    const modeloRepository = new ModeloRepositoryBD();
    //application
    const modeloUseCaseCreate = new ModeloUseCaseCreate(modeloRepository);
    const modeloUseCaseFindAll = new ModeloUseCaseFindAll(modeloRepository);
    const modeloUseCaseFindById = new ModeloUseCaseFindById(modeloRepository);
    const modeloUseCaseUpdate = new ModeloUseCaseUpdate(modeloRepository);
    //controller
    const modeloController = new ModeloController(modeloUseCaseCreate, modeloUseCaseFindAll, modeloUseCaseFindById, modeloUseCaseUpdate);
    //routes
    const router = modeloRoutes(modeloController);
    return router;
}