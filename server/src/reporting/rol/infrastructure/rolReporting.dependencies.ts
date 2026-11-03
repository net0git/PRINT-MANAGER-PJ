import { GetRolList } from "../application/getRolList";
import { RolReportingController } from "./rolReportingController";
import { RolReportingQueryDB } from "./rolReportingQueryDB";

const query = new RolReportingQueryDB();

const getRolList = new GetRolList(query);

export const rolReportingController = new RolReportingController(getRolList);