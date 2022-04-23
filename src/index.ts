import 'dotenv/config'
import { CallbackService, API } from 'vk-io';
import { DirectAuthorization, officialAppCredentials } from '@vk-io/authorization';
import { mainAction } from './survey';
import { initApi } from './entities/api';
import { store, Stored } from './entities';

const callbackService = new CallbackService();

const direct = new DirectAuthorization({
	callbackService,

	scope: 'all',

	...officialAppCredentials.android,


	login: process.env.LOGIN,
	password: process.env.PASSWORD,

  apiVersion: '5.131'
});

async function run() {
  initApi(store.get(Stored.token) as string);
  mainAction();
}

run().catch(console.error);