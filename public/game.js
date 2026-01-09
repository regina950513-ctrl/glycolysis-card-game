const playerHand = document.getElementById("player-hand");
const status = document.getElementById("status");

const cards = [
  { name: "Hexokinase", effect: "Glucose → G6P" },
  { name: "PFK-1", effect: "F6P → F1,6BP" },
  { name: "Pyruvate Kinase", effect: "PEP → Pyruvate" }
];

function renderHand() {
  playerHand.innerHTML = "";
  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<strong>${card.name}</strong><br/><small>${card.effect}</small>`;
    div.onclick = () => playCard(card.name);
    playerHand.appendChild(div);
  });
}

function playCard(name) {
  status.innerText = `You played ${name}`;
}

renderHand();
