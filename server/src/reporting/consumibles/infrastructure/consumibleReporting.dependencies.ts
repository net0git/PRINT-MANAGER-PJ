import { GetConsumiblesDetail } from "../application/getConsumiblesDetail";
import { ConsumibleReportingController } from "./consumibleReportingConroller";
import { ConsumibleReportingQueryBD } from "./consumibleReportingQueryBD";

const query = new ConsumibleReportingQueryBD();

const getConsumiblesDetail = new GetConsumiblesDetail(query);

export const consumibleReportingController =  new ConsumibleReportingController(getConsumiblesDetail);    