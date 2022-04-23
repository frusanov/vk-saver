import { Objects } from "vk-io";
import { api, status, store, Stored } from "../entities";

const count = 100;

export async function collectWall() {
  status.set('Собрка материалов стены');

  let offset = 0;
  let itemsTotal = 1;
  const items: Array<Objects.WallWallpostFull> = [];
  const domain = store.get(Stored.domain) as string;
  
  const getWall = () => api.wall.get({
    domain,
    offset,
    count
  }).then(response => {
    itemsTotal = response.count;
    offset = offset + count;
    items.push(...response.items);
    
    status.set(`Собрка материалов стены: ${items.length} из ${itemsTotal}`);
  })

  while(offset < itemsTotal) {
    await getWall();
  }

  status.next();

  return items;
}