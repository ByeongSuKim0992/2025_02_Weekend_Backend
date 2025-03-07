const express = require("express");
const cors = require("cors");
const app = express();
const xlsx = require("xlsx");
app.use(cors()); // 다른 url이 들어오도록 허용!
app.use(express.json()); // JSON 요청 본문을 허용!

const coffeeXlsx = xlsx.readFile("coffee.xlsx"); //coffee 엑셀 파일
const firstCoffeeSheetName = coffeeXlsx.SheetNames[0]; // coffee 첫번째 시트
const firstCoffeeSheet = coffeeXlsx.Sheets[firstCoffeeSheetName]; // 시트 이름으로 첫 번째 시트 가져오기
const firstCoffeeJson = xlsx.utils.sheet_to_json(firstCoffeeSheet); // sheet를 json으로 변환
console.log(firstCoffeeJson);

const menu = {
  icecream: [
    { name: "허니크런치", kcal: 264, price: 3000 },
    { name: "민트 초콜릿 칩", kcal: 256, price: 2500 },
    { name: "요거트", kcal: 198, price: 3500 },
    { name: "그린티", kcal: 245, price: 4000 },
  ],
  cake: [
    { name: "잔망루피", kcal: 1380, price: 30000 },
    { name: "골라먹는 큐브", kcal: 1640, price: 29000 },
    { name: "구름이 퐁당퐁당", kcal: 1260, price: 26000 },
  ],
  coffee: [
    { name: "아메리카노", kcal: 5, price: 3000 },
    { name: "카페라떼", kcal: 120, price: 3500 },
    { name: "카페모카", kcal: 20, price: 4000 },
  ],
};

// 클라이언트 <-> 서버 [HTTP(req <-> res)]
// request: get방식(기본), post방식, put방식, patch방식, delete방식
// req.params -> /icecream/:id
// req.query -> /icecream?k=v&k1=v1

app.get("/", (req, res) => {
  res.send("익스프레스 맛보기!");
});

app.get("/icecream", (req, res) => {
  const { minPrice, maxPrice } = req.query;
  console.log({ minPrice, maxPrice });
  if (!minPrice && !maxPrice) res.json(menu.icecream);
  else if (!maxPrice)
    res.json(menu.icecream.filter((v) => v.price >= minPrice));
  else if (!minPrice)
    res.json(menu.icecream.filter((v) => v.price <= maxPrice));
  else
    res.json(
      menu.icecream.filter((v) => v.price >= minPrice && v.price <= maxPrice)
    );
});
app.get("/cake", (req, res) => {
  res.json(menu.cake);
});

app.post("/cake", (req, res) => {
  const newCake = req.body;

  if (!newCake.name || !newCake.price || !newCake.kcal) {
    return res.json({ message: "요청 데이터 오류!" });
  }

  const result = menu.cake.find((v) => v.name == newCake.name);

  if (!!result) {
    return res.json({ message: "이름 중복 오류!" });
  }
  menu.cake.push(newCake);
  res.json({ message: " 케이크 성공" });
});

app.get("/coffee", (req, res) => {
  res.json(menu.coffee);
});

app.post("/coffee", (req, res) => {
  const newCoffee = req.body;

  if (!newCoffee.name || !newCoffee.price || !newCoffee.kcal) {
    return res.json({ message: "요청 데이터 오류!" });
  }

  const result = menu.coffee.find((v) => v.name == newCoffee.name);

  if (!!result) {
    return res.json({ message: "이름 중복 오류!" });
  }

  menu.coffee.push(newCoffee);
  res.json({ message: "커피 성공" });
});

app.listen(3000, () => {
  console.log("서버 실행!");
});
