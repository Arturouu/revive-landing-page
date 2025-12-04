
const formulario = document.getElementById('contactForm');

formulario.addEventListener('submit', function (event) {
  event.preventDefault();

  const data = {
    nombre: document.getElementById('nombre').value.trim(),
    apellidos: document.getElementById('apellidos').value.trim(),
    email: document.getElementById('email').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    rol: document.getElementById('rol').value,
    edad: document.getElementById('edad').value,
    privacidad: document.getElementById('validacion1').checked,
    publicidad: document.getElementById('validacion2').checked
  };

  if (data.nombre.length < 3) return showError("El nombre debe tener al menos 3 caracteres.");
  if (data.apellidos === "") return showError("Por favor, ingrese sus apellidos.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return showError("Por favor, ingrese un email válido.");
  if (!/^[0-9]{7,}$/.test(data.telefono)) return showError("El teléfono debe tener al menos 7 dígitos y solo números.");
  if (data.rol === "") return showError("Por favor, seleccione su ocupación.");
  if (data.edad === "") return showError("Por favor, seleccione su edad.");
  if (!data.privacidad || !data.publicidad) return showError("Debe aceptar la política de privacidad y el uso de datos personales.");

  fetch("http://localhost:3000/formulario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    showSuccess("Información enviada correctamente. ¡Gracias por unirte a ReVive!");
    formulario.reset();
  })
  .catch(err => {
    console.error("Error al enviar datos:", err);
    showError("No se pudo conectar con el servidor.");
  });
});

function showError(text) {
  const msg = document.getElementById('formMessage');
  msg.style.display = 'block';
  msg.className = "form-message error";
  msg.textContent = text;
}

function showSuccess(text) {
  const msg = document.getElementById('formMessage');
  msg.style.display = 'block';
  msg.className = "form-message success";
  msg.textContent = text;
}

const enlaces = document.querySelectorAll('.header a[href^="#"]');

enlaces.forEach((enlace) => {
  enlace.addEventListener('click', function (e) {
    e.preventDefault();
    const destino = this.getAttribute('href');
    if (destino && document.querySelector(destino)) {
      document.querySelector(destino).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
