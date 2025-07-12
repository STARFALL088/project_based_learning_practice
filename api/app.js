const URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

let promise = fetch(URL);
console.log(promise);

const getFacts = async () => {
  let promise = await fetch(URL);
  console.log(promise);
};
