console.log("GAME JS UPDATED");
// ===== Basic Glycolysis Card Game (Playable Demo Version) =====

// Game State
let playerATP = 2;
let currentStep = 0;
let currentTurn = "player";

let players = [];
let currentPlayerIndex = 0;

// Simplified glycolysis steps
const pathway = [
  "Hexokinase",
  "Phosphoglucose Isomerase",
  "PFK-1",
  "Aldolase",
  "Pyruvate Kinase"
];

// Player starting hand
let playerHand = [
  { name: "Hexokinase", cost: 1 },
  { name: "Phosphoglucose Isomerase", cost: 0 },
  { name: "PFK-1", cost: 1 },
  { name: "Aldolase", cost: 0 },
  { name: "Pyruvate Kinase", gain: 2 }
];

// DOM elements
const playerATPText = document.getElementById("player-atp");
const aiATPText = document.getElementById("ai-atp");
const pathwayText = document.getElementById("pathway");
const handDiv = document.getElementById("player-hand");
const statusText = document.getElementById("status");

// Initial render
renderAll();

function renderAll() {
  playerATPText.textContent = playerATP;
  aiATPText.textContent = aiATP;
  pathwayText.textContent = `Current step: ${pathway[currentStep]}`;
  statusText.textContent = `Turn: ${currentTurn}`;
  renderHand();
}

// Render player hand
function renderHand() {
  handDiv.innerHTML = "";
  playerHand.forEach((card, index) => {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card";
    cardDiv.textContent = card.name;
    cardDiv.onclick = () => playCard(index);
    handDiv.appendChild(cardDiv);
  });
}

// Play card
function playCard(index) {
  if (currentTurn !== "player") return alert("Not your turn!");

  const card = playerHand[index];

  if (card.name !== pathway[currentStep]) {
    alert("Wrong step in glycolysis!");
    return;
  }

  if (card.cost && playerATP < card.cost) {
    alert("Not enough ATP!");
    return;
  }

  // Apply effects
  if (card.cost) playerATP -= card.cost;
  if (card.gain) playerATP += card.gain;

  // Advance pathway
  currentStep++;
  playerHand.splice(index, 1);

  if (currentStep >= pathway.length) {
    alert("Glycolysis complete! 🎉");
    currentStep = 0;
  }

  currentTurn = "ai";
  renderAll();

  setTimeout(aiTurn, 1000);
}

// Simple AI turn
function aiTurn() {
  aiATP += 1; // simple gain
  currentTurn = "player";
  renderAll();
}
function startGame(playerCount) {
  // 隱藏選人畫面，顯示遊戲畫面
  document.getElementById("player-select-screen").style.display = "none";
  document.getElementById("game-screen").style.display = "block";

  players = [];

  // 建立玩家
  for (let i = 0; i < playerCount; i++) {
    players.push({
      name: `Player ${i + 1}`,
      isAI: false,
      hand: []
    });
  }

  // AI 補位到 4 人
  for (let i = playerCount; i < 4; i++) {
    players.push({
      name: `AI ${i + 1}`,
      isAI: true,
      hand: []
    });
  }

  currentPlayerIndex = 0;

  console.log("Players:", players);

  // 之後會在這裡發牌、開始第一回合
}




