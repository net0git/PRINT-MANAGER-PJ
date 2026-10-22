import { Pool } from "pg";
import { key } from "./key";

export const pgPool = new Pool(key);