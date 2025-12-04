const chatBody = document.getElementById("chatBody");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

let technicalIssueCount = 0; // Para detectar cuándo derivar a soporte humano

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

  // SCENARIO 1 ➤ ASISTENCIA SOBRE FUNCIONES DE LA APP
  if (text.includes("cómo publico") || text.includes("publicar donación") || text.includes("donar objeto")) {
    appendBotMessage(
      "Claro, aquí tienes cómo publicar una donación:\n" +
      "1. Entra a la sección 'Publicar'.\n" +
      "2. Sube una foto del objeto.\n" +
      "3. Agrega título, categoría y una breve descripción.\n" +
      "4. Guarda la publicación.\n\n" +
      "¡Y listo! Tu donación aparecerá para que otros usuarios puedan verla."
    );
    return;
  }

  if (text.includes("intercambio") || text.includes("cómo trueque") || text.includes("cómo intercambiar")) {
    appendBotMessage(
      "Para intercambiar un objeto:\n" +
      "1. Ingresa a la sección 'Trueques'.\n" +
      "2. Busca un objeto que te interese.\n" +
      "3. Presiona 'Proponer intercambio'.\n" +
      "4. Elige qué objeto ofrecer.\n" +
      "5. Espera confirmación del otro usuario.\n\n" +
      "¡Así de simple!"
    );
    return;
  }

  // SCENARIO 2 ➤ RECOMENDACIONES PERSONALIZADAS
  if (text.includes("qué campañas hay") || text.includes("recomiéndame") || text.includes("sugerencias")) {
    appendBotMessage(
      "Puedo recomendarte campañas según tus intereses. Si me dices qué has donado antes o tu distrito, puedo darte opciones mucho más precisas.\n\n" +
      "Por ejemplo: campañas de reciclaje, donación de ropa, intercambio de libros o actividades ecológicas cercanas."
    );
    return;
  }

  if (text.includes("donado") || text.includes("mis intereses")) {
    appendBotMessage(
      "Perfecto, según tu historial de donaciones, te recomendaría:\n" +
      "- Campañas de apoyo comunitario.\n" +
      "- Trueques relacionados con tus categorías donadas.\n" +
      "- Puntos de reciclaje cercanos.\n\n" +
      "Si me dices tu ubicación, puedo afinarlo."
    );
    return;
  }

  // SCENARIO 3 ➤ SOPORTE TÉCNICO
  if (text.includes("no puedo subir foto") || text.includes("no me carga") || text.includes("error") || text.includes("no funciona")) {
    technicalIssueCount++;

    appendBotMessage(
      "Vamos a intentar solucionarlo:\n" +
      "1. Verifica que la app tenga permisos de cámara/galería.\n" +
      "2. Cambia entre Wi-Fi y datos móviles.\n" +
      "3. Cierra y vuelve a abrir la app.\n" +
      "4. Asegúrate de que la imagen pese menos de 5 MB.\n\n" +
      "¿Funcionó?"
    );

    if (technicalIssueCount >= 2) {
      setTimeout(() => {
        appendBotMessage("Parece que el problema continúa. ¿Quieres que derive tu caso a soporte humano?");
      }, 800);
    }

    return;
  }

  // SCENARIO 4 ➤ DERIVAR A SOPORTE HUMANO
  if (text.includes("sí") && technicalIssueCount >= 2) {
    appendBotMessage("Perfecto, enviaré tu caso al equipo de soporte humano. Te responderán lo antes posible. 💚");
    technicalIssueCount = 0;
    return;
  }

  // RESPUESTAS GENERALES (las que ya tenías)
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
    appendBotMessage("ReVive ofrece Donaciones, Trueques y Reciclaje. Todo pensado para promover la sostenibilidad y la economía circular.");
    return;
  }

  if (text.includes("contactar") || text.includes("ayuda") || text.includes("información")) {
    appendBotMessage("Puedes contactarnos desde el formulario en la página principal. Siempre felices de ayudarte.");
    return;
  }

  if (text.includes("hola") || text.includes("buenas")) {
    appendBotMessage("¡Hola! Soy el Asesor ReVive 💚 ¿En qué puedo ayudarte hoy?");
    return;
  }

  // DEFAULT
  appendBotMessage("No estoy seguro de eso, pero puedo ayudarte con donaciones, trueques, reciclaje o soporte técnico. ¿Qué necesitas?");
}
