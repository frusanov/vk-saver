import { WallWallpostFull } from "vk-io/lib/api/schemas/objects";
import { formatISO, fromUnixTime } from 'date-fns'
import { createFolderIfNotExists } from "./createFolderIfNotExists";
import { store, Stored } from "../entities";
import { resolve } from "path";
import { writeFileSync } from "fs";
import { PhotoAttachment } from "vk-io";
import Downloader from "nodejs-file-downloader";



export async function downloadWallPost(post: WallWallpostFull) {
  const date = formatISO(fromUnixTime(post.date as number));
  const savePath = store.get(Stored.savePath) as string;
  const postPath = savePath + `/${date}`;
  
  console.log(postPath);

  createFolderIfNotExists(postPath);

  if (post.text) {
    writeFileSync(postPath + '/text.txt', post.text as string);
  }

  if (post.attachments?.length) {
    for (const attachment of post.attachments) {
      if (attachment.type === 'photo') {
        const big = attachment.photo.sizes.find((size: any) => size.type === 'w');

        if (big) {
          const downloader = new Downloader({
            url: big.url,
            directory: postPath
          });

          await downloader.download();
        }
      }
    }
  }

  
}