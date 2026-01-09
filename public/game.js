const playerHand = document.getElementById("player-hand");
const status = document.getElementById("status");
const playerATPText = document.getElementById("player-atp");
const aiATPText = document.getElementById("ai-atp");

let playerATP = 2;
let aiATP = 2;

// Glycolysis pathway steps
const pathway = [
  "Glucose",
  "G6P",
  "F6P",
  "F1,6BP",
  "Pyruvate"
];

let currentStepIndex = 0;
let isPlayerTurn = true;

// Card definitions (依 PDF 概念：酵素只能在特定步驟用)
const cards = [
  {
    name: "Hexokinase",
    from: "Glucose",
    to: "G6P",
    atpChange: -1
  },
  {
    name: "PFK-1",
    from: "F6P",
    to: "F1,6BP",
    atpChange: -1
  },
  {
    name: "Pyruvate Kinase",
    from: "F1,6BP",
    to: "Pyruvate",
    atpChange: +2
  }
];

function renderHand() {
  playerHand.innerHTML = "";
  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${card.name}</strong><br/>
      <small>${card.from} → ${card.to}</small>`;
    div.onclick = () => playPlayerCard(card);
    playerHand.appendChild(div);
  });
}

function updateStatus(text) {
  status.innerText = text;
  playerATPText.innerText = playerATP;
  aiATPText.innerText = aiATP;
}

function currentStep() {
  return pathway[currentStepIndex];
}

function canPlay(card, atp) {
  return card.from === currentStep() && atp + card.atpChange >= 0;
}

function advanceStep(card) {
  if (pathway[currentStepIndex + 1] === card.to) {
    currentStepIndex++;
  }
}

function playPlayerCard(card) {
  if (!isPlayerTurn) return;

  if (!canPlay(card, playerATP)) {
    updateStatus("❌ Card cannot be played at this step");
    return;
  }

  playerATP += card.atpChange;
  advanceStep(card);

  updateStatus(`You played ${card.name}`);
  isPlayerTurn = false;

  setTimeout(aiTurn, 1000);
}

function aiTurn() {
  const validCards = cards.filter(card =>
    canPlay(card, aiATP)
  );

  if (validCards.length === 0) {
    updateStatus("AI cannot play, your turn");


