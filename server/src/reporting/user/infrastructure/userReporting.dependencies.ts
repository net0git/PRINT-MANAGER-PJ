import { GetUserList } from "../application/getUserList";
import { UserReportingController } from "./userReportingController";
import { UserReportingQueryBD } from "./userReportingQueryBD";

const query = new UserReportingQueryBD();

const getUserList = new GetUserList(query);

export const userReportingController =
    new UserReportingController(getUserList);