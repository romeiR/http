'use strict';
const http = require('http');
const router = require ('/lib/router');
const server = http.createServer((req,res) => {
  const now = Date.now();
  res.setHeader('Set-Cookie',`last_access=${now};`);
  const date = new Date();
  const Address = req.connection.remoteAddress;
  console.info(`[${date}] IP address is ${Address}`);
  res.writeHead(200,{
    'Content-Type': 'text/plain; charset=utf-8'
  });
  const last_access_time = req.headers.cookie ? parseInt(req.headers.cookie.split('last_access=')[1]) : now;
  //parseInt は文字列を数字に変換
  //split は一部だけ切り取る
  //toString は数字を文字列に変換
  res.end(new Date(last_access_time).toString());
}).on('error', e => {
  console.error(`[${new Date()}] Server error`,e);
}).on('clientError',e => {
  console.error(`[${new Date()}] Client error`,e);
});

const port = 8000;
server.listen(port,() => {
  console.info(`ポート ${port} でサーバーを起動しました。`);
});