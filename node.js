import repl from 'repl';
import WebSocket from 'ws';
import nodeLocalStorage from 'node-localstorage';
const { LocalStorage } = nodeLocalStorage;

import { setWsClass } from 'unnamed-network/conn/ws.js';
setWsClass(WebSocket);

import ConnManager from 'unnamed-network/connManager.js';
import WssConnProvider from 'unnamed-network/connProvider/wss.js';

import { defaultFirstAddr } from './config.js';

import App from './src/index.js';

let [myAddr, storage, port] = process.argv.slice(2);
if (!myAddr) {
  console.log('usage: npm start [myAddr] [storage] [port]');
  console.log(`using default myAddr: ${defaultFirstAddr}`);
  myAddr = defaultFirstAddr.slice(0);
}
if (!port) {
  port = process.env.PORT || (new URL(myAddr)).port || 8000;
  console.log(`using port from myAddr: ${port}`);
}
if (!storage) {
  storage = './.local-storage/default';
  console.log(`using default storage: ${storage}`);
}

const localStorage = new LocalStorage(storage);

const wss = new WebSocket.Server({ port });
const wssConnProvider = new WssConnProvider(wss);

global.cm = new ConnManager(myAddr, wssConnProvider);
console.log(`=> global.cm : connManager`);

(async () => {
  const app = new App(global.cm, { defaultFirstAddr, localStorage });
  Object.keys(app).forEach(methodName => {
    Object.defineProperty(global, methodName, {
      get: () => app[methodName],
    });
    console.log(`=> global.${methodName}`);
  })
})();

const replServer = repl.start({ prompt: '> ' });
