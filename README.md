# unnamed-network-chat-ysync

This is a chatroom application with youtube sync -- an example of [`unnamed-network`](https://github.com/pastleo/unnamed-network), an experimental p2p network consist of WebRTC and WebSocket.

## Get it running

```sh
git clone https://github.com/pastleo/unnamed-network-chatroom.git
cd unnamed-network-chatroom
cp config.js.example config.js
npm install
```

#### wss node part

```sh
npm start
```

#### browser part for development

```sh
npm run webpack-dev
```

then open http://localhost:8080 on your browser (please see outputs from above command)

#### bundle browser part into static SPA

```sh
npm run webpack
```

result will be at `./dist`
