export interface FileEntry {
  name: string;
  path: string;
}

export interface Task {
  type: "dir" | "mysql";
}

export interface DirTask extends Task {
  type: "dir";
  path: string;
}

export interface SqlTask extends Task {
  type: "mysql";
  host: string;
  username: string;
  password: string;
  database: string;
}
