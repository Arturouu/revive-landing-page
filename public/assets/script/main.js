const formulario = document.getElementById('contactForm');

formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const apellidos = document.getElementById('apellidos').value;

  //Nombre
  if (nombre === '') {
    alert('Por favor, ingrese su nombre.');
    return;
  }

  if (nombre.length < 3) {
    alert('El nombre debe tener al menos 3 caracteres.');
    return;
  }

  //Apellidos
  if (apellidos === '') {
    alert('Por favor, ingrese sus apellidos.');
    return;
  }

    alert('Información enviada correctamente. ¡Gracias!');
    formulario.reset();

});

const enlaces = document.querySelectorAll('.header a[href^="#"]');

enlaces.forEach(enlace => {
  enlace.addEventListener('click', function(e) {
    e.preventDefault();
    const destino = this.getAttribute('href');
    if (destino && document.querySelector(destino)) {
      document.querySelector(destino).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
