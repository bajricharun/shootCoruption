const zapocni = document.getElementById("start-button");
const jugoslavija = document.getElementById("jugoslavija");
const tito = document.getElementById("tito");
const instructions = document.getElementById("instructions");
const zlocinci = [
  "media/bake.jpeg",
  "media/dodara.jpg",
  "media/komso.jpg",
  "media/sefko.jpeg",
  "media/mile.jpg",
  "media/vucko.jpeg"
];
const scoreCounter = document.querySelector("#score span");

zapocni.addEventListener("click", event => {
  playGame();
});

function letTito(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    pucaj();
  }
}

function moveUp() {
  let topPosition = window.getComputedStyle(tito).getPropertyValue("top");
  if (tito.style.top === "0px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 4;
    tito.style.top = position + "px";
  }
}

function moveDown() {
  let topPosition = window.getComputedStyle(tito).getPropertyValue("top");
  if (tito.style.top === "360px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 4;
    tito.style.top = position + "px";
  }
}

function pucaj() {
  let metak = stvoriMetak();
  jugoslavija.appendChild(metak);
  moveMetak(metak);
}

function stvoriMetak() {
  let xPosition = parseInt(
    window.getComputedStyle(tito).getPropertyValue("left")
  );
  let yPosition = parseInt(
    window.getComputedStyle(tito).getPropertyValue("top")
  );
  let newLaser = document.createElement("img");
  newLaser.src = "media/bullet.png";
  newLaser.classList.add("laser");
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;
  return newLaser;
}

function moveMetak(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);
    let monsters = document.querySelectorAll(".monster");
    monsters.forEach(monster => {
      if (checkCollision(laser, monster)) {
        monster.classList.remove("monster");
        monster.classList.add("dead-monster");
        scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100;
      }
    });
    if (xPosition == 900) {
      laser.remove();
    } else {
      laser.style.left = `${xPosition + 4}px`;
    }
  }, 10);
}

function createZlocinac() {
  let newMonster = document.createElement("img");
  let monsterSpriteImg = zlocinci[Math.floor(Math.random() * zlocinci.length)];
  newMonster.src = monsterSpriteImg;
  newMonster.classList.add("monster");
  newMonster.classList.add("monster-transition");
  newMonster.style.right = "3px";
  newMonster.style.top = `${Math.floor(Math.random() * 330) + 30}px`;
  jugoslavija.appendChild(newMonster);
  moveZlocinac(newMonster);
}

function moveZlocinac(monster) {
  let moveMonsterInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(monster).getPropertyValue("left")
    );
    if (xPosition <= 50) {
      if (Array.from(monster.classList).includes("dead-monster")) {
        monster.remove();
      } else {
        gameOver();
      }
    } else {
      monster.style.left = `${xPosition - 4}px`;
    }
  }, 30);
}

function checkCollision(laser, monster) {
  let laserLeft = parseInt(laser.style.left);
  let laserTop = parseInt(laser.style.top);
  let laserBottom = laserTop - 20;
  let monsterTop = parseInt(monster.style.top);
  let monsterBottom = monsterTop - 30;
  let monsterLeft = parseInt(monster.style.left);
  if (laserLeft != 900 && laserLeft + 40 >= monsterLeft) {
    if (laserTop <= monsterTop && laserTop >= monsterBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

function gameOver() {
  window.removeEventListener("keydown", letTito);
  clearInterval(monsterInterval);
  let monsters = document.querySelectorAll(".monster");
  monsters.forEach(monster => monster.remove());
  let lasers = document.querySelectorAll(".laser");
  lasers.forEach(laser => laser.remove());
  setTimeout(() => {
    alert(
      `Nazalost, pioniru, gotov si! Tvoj rezultat je ${scoreCounter.innerText}!`
    );
    tito.style.top = "180px";
    zapocni.style.display = "block";
    scoreCounter.innerText = 0;
  }, 1100);
}

function playGame() {
  zapocni.style.display = "none";
  instructions.style.display = "none";
  window.addEventListener("keydown", letTito);
  monsterInterval = setInterval(() => {
    createZlocinac();
  }, 3100);
}
