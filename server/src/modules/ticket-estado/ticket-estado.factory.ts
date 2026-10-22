import { TicketStatusController } from "./infrastructure/ticket-estadoController";
import { TicketStatusRepositoryBD } from "./infrastructure/ticket-estadoRepositoryBD";
import { ticketEstadoRoutes } from "./infrastructure/ticket-estadoRoutes";
import { TicketStatusUseCaseCreate } from "./application/ticketStatusUseCaseCreate";
import { TicketStatusUseCaseFindAll } from "./application/ticketStatusUseCaseFindAll";
import { TicketStatusUseCaseFindById } from "./application/ticketStatusUseCaseFindById";
import { TicketStatusUseCaseUpdate } from "./application/ticketStatusUseCaseUpdate";

export const ticketEstadoFactory = () => {
    // Repositories
    const ticketStatusRepository = new TicketStatusRepositoryBD();

    // Application
    const ticketStatusUseCaseCreate = new TicketStatusUseCaseCreate(ticketStatusRepository);
    const ticketStatusUseCaseFindAll = new TicketStatusUseCaseFindAll(ticketStatusRepository);
    const ticketStatusUseCaseFindById = new TicketStatusUseCaseFindById(ticketStatusRepository);
    const ticketStatusUseCaseUpdate = new TicketStatusUseCaseUpdate(ticketStatusRepository);

    // Controllers
    const ticketStatusController = new TicketStatusController(
        ticketStatusUseCaseCreate,
        ticketStatusUseCaseFindAll,
        ticketStatusUseCaseFindById,
        ticketStatusUseCaseUpdate
    );

    // Routes
    const router = ticketEstadoRoutes(ticketStatusController);

    return router;

}