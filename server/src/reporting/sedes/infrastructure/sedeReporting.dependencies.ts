import { GetSedesDetail } from "../application/getSedesDetail";
import { SedeReportingController } from "./sedeReportingController";
import { SedeReportingQueryBD } from "./sedeReportingQueryBD";

const query = new SedeReportingQueryBD();

const getSedesDetail = new GetSedesDetail(query);

export const sedeReportingController = new SedeReportingController(getSedesDetail);