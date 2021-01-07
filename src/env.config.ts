import { get } from "env-var";
import { Task } from "./types";

export const CRON = get("CRON").required().default("0 2 * * *").asString();
export const TASKS = get("TASKS").required().asJsonArray() as Task[];

export const MINIO_ENDPOINT = get("MINIO_ENDPOINT").required().asString();
export const MINIO_ACCESS_KEY = get("MINIO_ACCESS_KEY").required().asString();
export const MINIO_SECRET_KEY = get("MINIO_SECRET_KEY").required().asString();
export const MINIO_BUCKET = get("MINIO_BUCKET").required().asString();
