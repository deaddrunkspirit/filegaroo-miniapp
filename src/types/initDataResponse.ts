import { InitData } from "./initData";
import { Token } from "./token";
import { User } from "./user";

export type InitDataResponse = {
    user: User;
    token: Token;
    init_data: InitData
}