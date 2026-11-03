import { UserDetailDto } from "../dto/userDetail.dto";

export interface UserReportingQuery {
    findAll(): Promise<UserDetailDto[]>;
}