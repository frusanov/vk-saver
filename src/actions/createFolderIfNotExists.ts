import { existsSync, mkdirSync } from "fs";

export function createFolderIfNotExists(path: string) {
  if (!existsSync(path)) mkdirSync(path);
}