import os from 'os'
import { existsSync, mkdirSync } from 'fs'
import { store, Stored } from '../entities';
import { createFolderIfNotExists } from './createFolderIfNotExists';

export function resolveDownloadsPath() {
  const homedir = os.homedir()
  const downloadsExists = existsSync(homedir + '/Downloads');
  const vkSaverPath = `${homedir}${downloadsExists ? '/Downloads' : ''}/vk-saver`;
  const domain = store.get(Stored.domain);
  const pathWithDomain = `${vkSaverPath}/${domain}`;

  store.set(Stored.savePath, pathWithDomain);

  createFolderIfNotExists(vkSaverPath);
  createFolderIfNotExists(pathWithDomain);
}