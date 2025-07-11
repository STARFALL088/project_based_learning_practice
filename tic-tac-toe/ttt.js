let pla = [
  {
    val: "X",
    col: "rgb(255, 0, 234)",
    name: "Prantor",
  },
  {
    val: "O",
    col: "rgb(0, 115, 255)",
    name: "Talha",
  },
];
let turn = pla[0];
let last = turn;
let freeze = 0;
let cnt = 0;
document
  .getElementsByClassName("play-again")[0]
  .addEventListener("click", function () {
    play_again();
  });

document.getElementsByClassName(
  "move"
)[0].innerHTML = `${turn.name} To Move 🤔`;
for (let i = 0; i < 9; i++) {
  let cur = document.getElementsByClassName("box")[i];
  cur.addEventListener("click", function () {
    if (freeze == 1) return;
    if (cur.innerHTML.length == 0) {
      cur.innerHTML += turn.val;
      cur.setAttribute("style", `color: ${turn.col};`);

      last = turn;
      turn = pla[pla.indexOf(turn) ^ 1];
      document.getElementsByClassName(
        "move"
      )[0].innerHTML = `${turn.name} To Move 🤔`;
      cnt++;
    }

    if (win()) {
      console.log(`${last.name} wins`);
      document.getElementsByClassName(
        "dash"
      )[0].innerHTML += `${last.name} wins!!`;
      freeze = 1;
    }
    if (cnt == 9 && freeze == 0) {
      document.getElementsByClassName("dash")[0].innerHTML += `It's A Draw!!`;
      freeze = 1;
    }
  });
}
// if(win()){
//   alert()
// }
let check = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function win() {
  let flag = 0;

  for (let arr of check) {
    let fst = document.getElementsByClassName("box")[arr[0]].innerHTML;

    let cnt = 0;
    for (let i = 0; i < 3; i++) {
      if (
        document.getElementsByClassName("box")[arr[i]].innerHTML != fst ||
        document.getElementsByClassName("box")[arr[i]].innerHTML == ""
      )
        break;
      else cnt++;
    }
    if (cnt == 3) {
      //alert("game end");
      return true;
    }
  }
  return false;
}

function clear_board() {
  for (let i = 0; i < 9; i++) {
    let cur = document.getElementsByClassName("box")[i];
    cur.innerHTML = "";
    cur.removeAttribute("style");
  }
  cnt = 0;
}

function play_again() {
  clear_board();
  freeze = 0;
  document.getElementsByClassName("dash")[0].innerHTML = ""; // Clear the message
  turn = pla[0];
  cnt = 0;
}
