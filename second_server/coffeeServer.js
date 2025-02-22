const http = require("http");

const coffeeServer = http.createServer((req, res) => {
  if (req.url == "/") {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    const data = { name: "아메리카노", price: 2500 };
    res.end(JSON.stringify(data));
  } else if (req.url == "/cake") {
    res.statusCode = 200;
    res.setHeader("content-type", "application/json");
    const data = { name: "녹차케이크", price: 6000 };
    res.end(JSON.stringify(data));
  } else {
    res.statusCode = 400;
    res.setHeader("content-type", "text/plain; charset=utf-8");
    res.end("없는 페이지 입니다.");
  }
});

coffeeServer.listen(3000, "127.0.0.1", () => {
  console.log("커피 서버 시작합니다!");
});
