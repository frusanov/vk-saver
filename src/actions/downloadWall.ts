import { collectWall } from "./collectWall";
import { downloadWallPost } from "./downloadWallPost";

export async function downloadWall() {
  const wallItems = await collectWall();

  for (const item of wallItems) {
    await downloadWallPost(item);
  }
}