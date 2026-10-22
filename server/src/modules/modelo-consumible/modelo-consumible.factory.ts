import { ModeloConsumibleController } from "./infrastructure/modeloConsumibleController";
import { ModeloConsumibleRepositoryBD } from "./infrastructure/modeloConsumiblrRepositoryBD";
import { modeloConsumibleRoutes } from "./infrastructure/modeloConsumibleRoutes";
import { ModeloConsumibleUseCaseCreate } from "./application/modeloConsumibleUseCaseCreate";
import { ModeloConsumibleUseCaseFindAll } from "./application/modeloConsumibleUseCaseFindAll";
import { ModeloConsumibleUseCaseFindById } from "./application/modeloConsumibleUseCaseFindById";
import { ModeloConsumibleUseCaseUpdate } from "./application/modeloConsumibleUseCaseUpdate";
import { ModeloConsumibleUseCaseDelete } from "./application/modeloConsumibleUseCaseDelete";

export const modeloConsumibleFactory = () => {
    // Repositories
    const modeloConsumibleRepository = new ModeloConsumibleRepositoryBD();

    // application
    const modeloConsumibleUseCaseCreate = new ModeloConsumibleUseCaseCreate(modeloConsumibleRepository);
    const modeloConsumibleUseCaseFindAll = new ModeloConsumibleUseCaseFindAll(modeloConsumibleRepository);
    const modeloConsumibleUseCaseFindById = new ModeloConsumibleUseCaseFindById(modeloConsumibleRepository);
    const modeloConsumibleUseCaseUpdate = new ModeloConsumibleUseCaseUpdate(modeloConsumibleRepository);
    const modeloConsumibleUseCaseDelete = new ModeloConsumibleUseCaseDelete(modeloConsumibleRepository);

    // controller
    const modeloConsumibleController = new ModeloConsumibleController(
        modeloConsumibleUseCaseCreate,
        modeloConsumibleUseCaseFindAll,
        modeloConsumibleUseCaseFindById,
        modeloConsumibleUseCaseUpdate,
        modeloConsumibleUseCaseDelete
    );

    // routes
    const router = modeloConsumibleRoutes(modeloConsumibleController);
    return router;
};