const input = document.querySelector("#input");
const button = document.querySelector("#button");

button.addEventListener("click", () => {
  const { value } = input;
  fetch(`http://localhost:3000/icecream?minPrice=${value}`)
    .then((v) => v.json())
    .then((v) => console.log(v));
});
