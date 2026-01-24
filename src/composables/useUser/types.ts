import { User } from "../../plugin/types";

export type UserWithExtras<T> = User & T;