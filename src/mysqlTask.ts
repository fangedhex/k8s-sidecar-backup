import { FileEntry, SqlTask } from "./types";
import { execSync } from "child_process";
import { basename } from "path";

export function mysqlTask(task: SqlTask): FileEntry {
  const filepath = `backup-mysql-${task.database}.sql`;
  const cmd = `mysqldump -h ${task.host} -u ${task.username} -p ${task.password} -r ${filepath} ${task.database}`;

  execSync(cmd);

  return { name: basename(filepath, ".sql"), path: filepath };
}
