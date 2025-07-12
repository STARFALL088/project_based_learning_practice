let p = ["rock", "paper", "scissors"];
let computer_score = 0;
let user_score = 0;

const computer = () => {
  let idx = Math.floor(Math.random() * 3);
  return p[idx];
};

const playround = (ele) => {
  let user_choice = ele;
  let computer_choice = computer();

  console.log(
    `You played: ${user_choice}, Computer played: ${computer_choice}`
  );
  update_score(user_choice, computer_choice);
};

const setup = () => {
  for (let ele of p) {
    let cur = document.getElementsByClassName(ele)[0];
    cur.addEventListener("click", function () {
      playround(ele);
    });
  }
};

const update_score = (user_choice, computer_choice) => {
  document.getElementsByClassName(
    "choice"
  )[0].innerHTML = `Player Choose: ${user_choice} <br>  Computer Choose: ${computer_choice} `;
  if (user_choice == computer_choice) {
    document.getElementsByClassName("report")[0].innerHTML = "It's A Draw";
    return;
  }
  if (
    (user_choice == "rock" && computer_choice == "scissors") ||
    (user_choice == "paper" && computer_choice == "rock") ||
    (user_choice == "scissors" && computer_choice == "paper")
  ) {
    user_score++;
    document.getElementsByClassName("report")[0].innerHTML = "User Won!!";
  } else {
    computer_score++;
    document.getElementsByClassName("report")[0].innerHTML = "Computer Won :(";
  }
  score_view();
};

const score_view = () => {
  document.getElementsByClassName(
    "user-score"
  )[0].innerHTML = `Player: ${user_score}`;

  document.getElementsByClassName(
    "computer-score"
  )[0].innerHTML = `Computer: ${computer_score}`;
};

const reset = () => {
  user_score = 0;
  computer_score = 0;

  score_view();
  document.getElementsByClassName("report")[0].innerHTML = "PLAY A MOVE";
  document.getElementsByClassName("choice")[0].innerHTML = "";
};

let cur = document.querySelector(".play-again");
cur.addEventListener("click", function () {
  reset();
});
setup();
