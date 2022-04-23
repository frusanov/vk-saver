import { prompt } from 'enquirer';
import { resolveDownloadsPath } from '../actions/resolveDownloadsPath';
import { api, store, Stored } from '../entities';
import { contentSources } from './content';

interface MainActionInput {
  screenName: string;
}

const availablePageTypes = ['user', 'group'];

export async function mainAction() {
  const userInput: MainActionInput = await prompt({
    type: 'input',
    name: 'screenName',
    message: 'Введите адрес страницы после слэша'
  });

  const response = await api.utils.resolveScreenName({
    screen_name: userInput.screenName
  });

  if (!availablePageTypes.includes(response.type)) {
    throw new Error(`Адрес ${userInput.screenName} не является страницей пользователя или сообществом!`);
  }

  store.set(Stored.domain, userInput.screenName);

  resolveDownloadsPath();
  contentSources();
}