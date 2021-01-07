import {
  CRON,
  MINIO_ACCESS_KEY,
  MINIO_BUCKET,
  MINIO_ENDPOINT,
  MINIO_SECRET_KEY,
  TASKS,
} from "./env.config";
import { CronJob } from "cron";
import { DirTask, FileEntry, SqlTask } from "./types";
import { dirTask } from "./dirTask";
import * as Minio from "minio";
import { mysqlTask } from "./mysqlTask";

new CronJob(
  CRON,
  () => {
    // We run every tasks
    const files: FileEntry[] = TASKS.map((task) => {
      switch (task.type) {
        case "dir":
          return dirTask(task as DirTask);
        case "mysql":
          return mysqlTask(task as SqlTask);
      }
    });

    // We create our minio client
    const minioClient = new Minio.Client({
      endPoint: MINIO_ENDPOINT,
      accessKey: MINIO_ACCESS_KEY,
      secretKey: MINIO_SECRET_KEY,
    });

    // For each file created by our tasks, we upload them
    for (const file of files) {
      minioClient.fPutObject(MINIO_BUCKET, file.name, file.path, {});
    }
  },
  null,
  true
);
