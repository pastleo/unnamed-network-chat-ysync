import { randomStr } from 'unnamed-network/utils.js';

import ConnManager from 'unnamed-network/connManager.js';
import BrowserConnProvider from 'unnamed-network/connProvider/browser.js';

import { defaultFirstAddr, baseIceServers } from '../config.js';

import App from './index.js';

import './styles.css';

const myAddr = `rtc://${randomStr()}`;

const browserConnProvider = new BrowserConnProvider({
  iceServers: baseIceServers,
});

window.cm = new ConnManager(myAddr, browserConnProvider);
console.log(`=> window.cm : connManager`);

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App(window.cm, { defaultFirstAddr, document, localStorage });
  Object.keys(app).forEach(methodName => {
    Object.defineProperty(window, methodName, {
      get: () => app[methodName],
    });
    console.log(`=> window.${methodName}`);
  });
});
