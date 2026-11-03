import { GetTicketDetail } from "../application/getTicketDetail";
import { TicketReportingQueryBD } from "./ticketReportingQueryBD";
import { TicketReportingController } from "./ticketReportinController";
import { GetTicketPendientes } from "../application/getTicketPendientes";
import { GetTicketAlmacen } from "../application/getTicketAlmacen";
import { GetTicketCountStatus } from "../application/getTicketCountStatus";
import { GetTicketCountMes } from "../application/getTicketCountMes";

const query = new TicketReportingQueryBD();
const getTicketDetail = new GetTicketDetail(query);
const getTicketPendientes = new GetTicketPendientes(query);
const getTicketAlmacen = new GetTicketAlmacen(query);
const getTicketCountStatus = new GetTicketCountStatus(query);
const getTicketCountMes = new GetTicketCountMes(query);

export const ticketReportingController = new TicketReportingController(getTicketDetail,getTicketPendientes,getTicketAlmacen,getTicketCountStatus,getTicketCountMes);