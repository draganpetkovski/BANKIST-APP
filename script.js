"use-strict";

const loginBtn = document.querySelector(".submit-btn");
const userNameInput = document.querySelector(".username");
const pinInput = document.querySelector(".pin");
const welcomeMsg = document.querySelector(".welcome");
const balanceShow = document.querySelector(".balance-show");
const container = document.querySelector(".container");
const reqAmount = document.querySelector(".reqAmount");
const reqProcess = document.querySelector(".transfer-proces1");
const transferProcess = document.querySelector(".transfer-proces");
const receiverAcc = document.querySelector(".receiverAcc");
const senderAmount = document.querySelector(".senderAmount");
const closedAcc = document.querySelector(".account-cl");
const closedPin = document.querySelector(".pin-cl");
const confirm = document.querySelector(".confirm");
let modal = document.getElementById("id01");
const currDate = document.querySelector(".datum");
const logOut = document.querySelector(".log-out");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const account1 = {
  owner: "Nikola Iliev",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Andrej Stoimanov",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

let uname = "";
const userName = function (accountss) {
  accountss.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0];
      })
      .join("");
  });
};

userName(accounts);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((movement) => movement > 0)
    .reduce((acc, curr) => acc + curr, 0);
  document.querySelector("#incomes").textContent = `IN:${incomes}€`;
  document.querySelector("#incomes").style.color = "#39b385";
  const outcomes = Math.abs(
    acc.movements
      .filter((movement) => movement < 0)
      .reduce((acc, curr) => acc + curr, 0)
  );
  document.querySelector("#outcomes").textContent = `OUT:${outcomes}€`;
  document.querySelector("#outcomes").style.color = "#ff585f";

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((mov) => (mov * acc.interestRate) / 100)
    .reduce((acc, cur) => acc + cur, 0);
  document.querySelector("#interest").textContent = `INTEREST:${interest}€`;
  document.querySelector("#interest").style.color = "#39b385";
};

const displayMovements = function (movements) {
  document.querySelector(".insert").innerHTML = " ";

  movements.forEach(function (item, index) {
    let tip = item > 0 ? "DEPOSIT" : "WITHDRAWAL";
    let currentDate = new Date();
    const html = `<tr>
    <td > <div class="tip">${index + 1} ${tip}</div></td>
    <td>${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}</td>
    <td>${item} €</td>
  </tr>`;

    document.querySelector(".insert").insertAdjacentHTML("afterbegin", html);
    if (tip === "DEPOSIT") {
      document.querySelector(".tip").classList.add("tipFirst");
    } else document.querySelector(".tip").classList.add("tipSecond");
  });
};

const calcBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, current) => acc + current, 0);
  balanceShow.textContent = `${acc.balance} €`;
};

/*
  Za sekoj account movement

const calcBalance = function (accountss) {
  accountss.forEach(function (account) {
    account.balance = account.movements.reduce(function (accumulator, current) {
      return accumulator + current;
    }, 0);
    document.getElementById(
      "balance-show"
    ).textContent = `${account.balance} EUROS`;
  });
};
*/
const UpdateSummary = function (account) {
  calcBalance(account);
  displayMovements(account.movements);
  calcDisplaySummary(account);
};

/* IMPLEMENTING LOGIN*/
let currentAccount = "";
document.querySelector(".signupbtn").addEventListener("click", function (e) {
  // e.preventDefault();
  e.preventDefault();
  document.getElementById("id01").style.display = "none";
  const acc = {};
  acc.owner = document.querySelector(".ownerSign").value;
  acc.interestRate = 1.2;
  const pinn = document.querySelector(".registerPin").value;
  console.log(pinn);
  const repeat = document.querySelector(".repeatPin").value;
  console.log(repeat);

  const starterBalance = Number(document.querySelector(".starter").value);
  if (pinn === repeat) {
    acc.movements = [];
    acc.movements.push(starterBalance);
    acc.pin = Number(pinn);
    accounts.push(acc);
    userName(accounts);
  }
});

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("LOGED");
  currentAccount = accounts.find((acc) => acc.username === userNameInput.value);
  console.log(currentAccount);

  if (currentAccount?.pin === Number(pinInput.value)) {
    console.log("SUCCESFUL LOGED");

    container.classList.remove("hidden");

    welcomeMsg.textContent = `WELCOME BACK ${
      currentAccount.owner.split(" ")[0]
    }`;
    calcBalance(currentAccount);
    balanceShow.textContent = `${calcBalance(currentAccount)} EUROS`;
    displayMovements(currentAccount.movements);
    calcBalance(currentAccount);
    calcDisplaySummary(currentAccount);
    document.querySelector(".username").value = document.querySelector(
      ".pin"
    ).value = "";
  }
});

reqProcess.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("sssssss");
  console.log(reqAmount.value);
  console.log(balanceShow.textContent);
  if (Number(reqAmount.value) <= 1000 && Number(reqAmount.value) > 0) {
    currentAccount.movements.push(Number(reqAmount.value));
  }
  UpdateSummary(currentAccount);
});

transferProcess.addEventListener("click", function (e) {
  let receiver;
  const amountt = Number(senderAmount.value);
  e.preventDefault();
  receiver = accounts.find((acc) => acc.username === receiverAcc.value);
  console.log(receiver);
  setTimeout(function () {
    if (
      senderAmount.value > 0 &&
      currentAccount.balance >= senderAmount.value
    ) {
      receiver.movements.push(amountt);
      currentAccount.movements.push(-amountt);
      UpdateSummary(currentAccount);
    } else alert("You dont have enought money");
  }, 3000);
});

//Close Account

confirm.addEventListener("click", function (e) {
  e.preventDefault();
  const index = accounts.findIndex((acc) => acc.username === closedAcc.value);
  if (
    currentAccount.username === closedAcc.value &&
    currentAccount.pin === Number(closedPin.value)
  ) {
    accounts.splice(index, 1);
    console.log(accounts);
    container.classList.add("hidden");
    welcomeMsg.textContent = "Login to continue";
  }
});

//SIGN UP BUTTON
document.querySelector(".ws-btn").addEventListener("click", function (e) {
  e.preventDefault();
});

// LOG OUT BUTTON
logOut.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = "";
  container.classList.add("hidden");
  welcomeMsg.textContent = "Login to continue";
});

let sort = true;
document.querySelector(".sort").addEventListener("click", function (e) {
  e.preventDefault();
  let b = [];
  currentAccount.movements.forEach((elem) => b.push(elem));

  b.sort((a, b) => a - b);
  if (sort === true) displayMovements(b);
  else displayMovements(currentAccount.movements);
  sort = !sort;
});

let date = new Date();
currDate.textContent =
  "As of " +
  date.getDate() +
  "/" +
  (date.getMonth() + 1) +
  "/" +
  date.getFullYear();
console.log(date);

/////// NOT FOR APPLICATION

const calcDogAge = function (arr) {
  const arr2 = arr.map(function (mov) {
    if (mov <= 2) return 2 * mov;
    else return 16 + mov * 4;
  });
  return arr2;
};

const test1 = [1, 2, 3, 4, 5, 6, 4, 12, 9];

const test2 = calcDogAge(test1);

test1.sort();

const calcSum = (a, b) => a + b;

lista = ["goran", "zoran", "petko"];

const list1 = lista.map(function (item) {
  return item[0];
});

const brojki = [1, 2, 3, 4];

const brojki2 = brojki.filter((brojka) => brojka > 2);

const brojka = brojki.find((brojka) => brojka === 2);
console.log(brojka);

let curr = brojki[1];
curr = 5;
console.log(brojki);

const person = {
  name: "john",
  surname: "smith",
};

let second;

second = person;

const as = [1, 2, 3, 4, 5, [6, 7, 8]];

const ac = as.flat(2);

console.log(ac);

let a = [1, 2, 3];

const date1 = new Date(2012, 3, 24);
console.log(date1);

const date2 = Number(date1);
console.log(date2);

setInterval(function () {
  const clock = new Date();
  const hour = clock.getHours();
  const hours = hour < 10 ? "0" + hour : hour;

  const min = clock.getMinutes();
  const minutes = min < 10 ? "0" + min : min;
  const sec = clock.getSeconds();
  const seconds = sec < 10 ? "0" + sec : sec;

  const format = hours + " : " + minutes + " : " + seconds;
  document.querySelector(".clock").textContent = format;
}, 1000);
