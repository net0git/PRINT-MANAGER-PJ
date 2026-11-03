import { TicketController } from "./infrastructure/ticketController";
import { TicketRepositoryBD } from "./infrastructure/ticketRepositoryBD";
import { ticketRoutes } from "./infrastructure/ticketRoutes";
import { TicketUseCaseCreate } from "./application/ticketUseCaseCreate";
import { TicketUseCaseFindAll } from "./application/ticketUseCaseFindAll";
import { TicketUseCaseFindById } from "./application/ticketUseCaseFindById";
import { TicketUseCaseUpdate } from "./application/ticketUseCaseUpdate";

export const ticketFactory = () => {
    // Repositories
    const ticketRepository = new TicketRepositoryBD();

    // Application
    const ticketUseCaseCreate = new TicketUseCaseCreate(ticketRepository);
    const ticketUseCaseFindAll = new TicketUseCaseFindAll(ticketRepository);
    const ticketUseCaseFindById = new TicketUseCaseFindById(ticketRepository);
    const ticketUseCaseUpdate = new TicketUseCaseUpdate(ticketRepository);

    // Controllers
    const ticketController = new TicketController(
        ticketUseCaseCreate,
        ticketUseCaseFindAll,
        ticketUseCaseFindById,
        ticketUseCaseUpdate
    );

    // Routes
    const router = ticketRoutes(ticketController);

    return router;

}