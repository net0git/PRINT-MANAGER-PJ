import { GetImpresorasDetail } from "../application/getImpresorasDetail";
import { GetImpresoraOne } from "../application/getOneImpresoraDetail";
import { ImpresoraReportingController } from "./impresoraReportingController";
import { ImpresoraReportingQueryBD } from "./impresoraReportinQueryBD";

const query = new ImpresoraReportingQueryBD();
const getImpresorasDetail = new GetImpresorasDetail(query); 
const getOneImpresoraDetail = new GetImpresoraOne(query);

export const impresoraReportingController = new ImpresoraReportingController(getImpresorasDetail,getOneImpresoraDetail);