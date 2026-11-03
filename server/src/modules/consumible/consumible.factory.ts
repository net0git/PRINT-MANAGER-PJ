import { ConsumibleUseCaseCreate } from "./application/consumibleUseCaseCreate";
import { ConsumibleUseCaseFindAll } from "./application/consumibleUseCaseFindAll";
import { ConsumibleUseCaseFindById } from "./application/consumibleUseCaseFindById";
import { ConsumibleUseCaseUpdate } from "./application/consumibleUseCaseUpdate";
import { ConsumibleController } from "./infrastructure/consumibleController";
import { ConsumibleRepositoryBD } from "./infrastructure/consumibleRepositoryBD";
import { consumibleRoutes } from "./infrastructure/consumibleRoutes";

export const consumibleFactory = () => {
    // repository
    const consumibleRepository = new ConsumibleRepositoryBD();
    //application
    const consumibleUseCaseCreate = new ConsumibleUseCaseCreate(consumibleRepository);
    const consumibleUseCaseFindAll = new ConsumibleUseCaseFindAll(consumibleRepository);
    const consumibleUseCaseFindById = new ConsumibleUseCaseFindById(consumibleRepository);
    const consumibleUseCaseUpdate = new ConsumibleUseCaseUpdate(consumibleRepository);
    //controller
    const consumibleController = new ConsumibleController(consumibleUseCaseCreate, consumibleUseCaseFindAll, consumibleUseCaseFindById, consumibleUseCaseUpdate);
    //routes
    const router = consumibleRoutes(consumibleController);
    return router;
}