const http = require("http");

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("Hello world!!!~~~!!!");
});

server.listen(3001, "127.0.0.1", () => {
  console.log("Server 실행중!");
});
