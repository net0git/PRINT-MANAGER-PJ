import { GetAreaCantiConsumible } from "../application/getAreaCantiConsumible";
import { GetNroParteCant } from "../application/getNroParteCant";
import { GetAnios } from "../application/getAnios";
import { AreaCantConsumibleReportingController } from "./dashboardReportingController";
import { AreaCantConsumibleReportingQueryBD } from "./dashboardReportingQueryBD";


const query = new AreaCantConsumibleReportingQueryBD();
const getAreaCantiConsumible = new GetAreaCantiConsumible(query);
const getNroParteCant = new GetNroParteCant(query);
const getAnios = new GetAnios(query);

export const areaCantConsumibleReportingController = new AreaCantConsumibleReportingController(getAreaCantiConsumible,getNroParteCant,getAnios);
