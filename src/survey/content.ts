import { prompt } from 'enquirer';
import { collectWall } from '../actions/collectWall';
import { downloadWall } from '../actions/downloadWall';

export enum ContentSources {
  wall = 'wall',
}

interface ContentSourcesInput {
  contentSources: Array<ContentSources>
}

export async function contentSources () {
  const response: ContentSourcesInput = await prompt({
    type: 'multiselect',
    name: 'contentSources',
    message: 'Что хотите сохранить?',
    choices: [
      { name: ContentSources.wall, message: 'Стена' },
    ]
  });
  const sources = response.contentSources;

  if (sources.includes(ContentSources.wall)) {
    await downloadWall()
  }
}