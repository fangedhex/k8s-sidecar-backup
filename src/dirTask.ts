import { DirTask, FileEntry } from "./types";
import { createWriteStream } from "fs";
import { basename } from "path";
import * as archiver from "archiver";

export function dirTask(task: DirTask): FileEntry {
  const filename = `${__dirname}/backup-${basename(task.path)}.zip`;
  const output = createWriteStream(filename);
  const archive = archiver("zip", {
    zlib: { level: 9 }, // Sets the compression level.
  });
  archive.pipe(output);
  archive.directory(task.path, false);
  archive.finalize();

  return {
    name: basename(filename, ".zip"),
    path: filename,
  };
}
