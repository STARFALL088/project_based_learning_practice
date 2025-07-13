const url = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const excng = document.querySelector(".exchange");

for (let select of dropdowns) {
  for (let [key, val] of Object.entries(countryList)) {
    let newOption = document.createElement("option");
    newOption.innerText = key;
    newOption.value = key;
    if (select.name === "from" && key === "USD")
      newOption.selected = "selected";
    if (select.name === "to" && key === "BDT") newOption.selected = "selected";
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    console.log(evt);
    updateFlag(evt.target);
  });
}

const getChangeRate = async (fromVal, toVal) => {
  const curURL = `${url}/${fromVal}.json`;
  console.log(curURL);
  let response = await fetch(curURL);
  //console.log(response.json());
  let ans = await response.json();
  let rate = await ans[fromVal][toVal];
  return rate;
};

const updateFlag = (ele) => {
  let key = ele.value;
  let val = countryList[key];
  let newSrc = `https://flagsapi.com/${val}/flat/64.png`;
  let img = ele.parentElement.querySelector("img");
  img.src = newSrc;
};

const UpdateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || isNaN(amtVal)) {
    amtVal = 1;
    amount.value = 1;
  }

  msg.innerText = "Getting exchange rate...";
  let fromVal = fromCurr.value.toLowerCase();
  let toVal = toCurr.value.toLowerCase();

  let Rate = await getChangeRate(fromVal, toVal);
  let ans = Rate * amtVal;
  //Rate = Math.floor(Rate * 1000) / 1000;
  console.log(Rate);
  // const toRate = getChangeRate(toVal);

  msg.innerText = `${amtVal} ${fromVal.toUpperCase()} = ${ans.toFixed(
    3
  )} ${toVal.toUpperCase()}`;
  return Rate;
};

const action = () => {
  btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    UpdateExchangeRate();
  });
};
const swapCur = () => {
  excng.addEventListener("click", (evt) => {
    console.log(fromCurr.value, toCurr.value);
    [fromCurr.value, toCurr.value] = [toCurr.value, fromCurr.value];
    console.log(fromCurr.value, toCurr.value);
    updateFlag(fromCurr);
    updateFlag(toCurr);
    UpdateExchangeRate();
  });
};
swapCur();
action();
window.addEventListener("load", () => {
  UpdateExchangeRate();
});
