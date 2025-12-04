const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keydown", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim();
  if (text === "") return;

  appendUserMessage(text);
  userInput.value = "";
  setTimeout(() => respond(text.toLowerCase()), 500);
}

function appendUserMessage(text) {
  const msg = document.createElement("div");
  msg.className = "user-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function appendBotMessage(text) {
  const msg = document.createElement("div");
  msg.className = "bot-message";
  msg.textContent = text;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function respond(text) {
  if (text.includes("donar") || text.includes("donación") || text.includes("donaciones")) {
    appendBotMessage("Puedes donar ropa, libros, víveres y más. ReVive conecta tus donaciones con organizaciones y personas que realmente las necesitan.");
    return;
  }

  if (text.includes("trueque") || text.includes("intercambiar")) {
    appendBotMessage("El sistema de trueque permite intercambiar objetos que ya no uses por otros que necesites. ¡Es una forma sostenible y divertida de reutilizar!");
    return;
  }

  if (text.includes("reciclar") || text.includes("reciclaje")) {
    appendBotMessage("ReVive te guía para reciclar materiales como papel, vidrio, cartón y más. También mostramos puntos de reciclaje cercanos.");
    return;
  }

  if (text.includes("servicio") || text.includes("qué ofrecen") || text.includes("funciona revive")) {
    appendBotMessage("ReVive ofrece tres servicios principales: Donaciones, Trueques y Reciclaje. Todos pensados para promover la reutilización y reducir desechos.");
    return;
  }

  if (text.includes("contactar") || text.includes("ayuda") || text.includes("información")) {
    appendBotMessage("Puedes contactarnos desde el formulario en la página principal. Estaremos encantados de ayudarte con cualquier duda.");
    return;
  }

  if (text.includes("hola") || text.includes("buenas")) {
    appendBotMessage("¡Hola! ¿En qué puedo ayudarte sobre ReVive?");
    return;
  }

  appendBotMessage("No estoy seguro de eso, pero puedo ayudarte con donaciones, trueques, reciclaje o información general sobre ReVive.");
}
