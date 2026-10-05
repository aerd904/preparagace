/* =========================================================
   PreparaGACE · JS (vanilla, sin dependencias)
   ========================================================= */
(function () {
  "use strict";

  /* ---- Menú móvil ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });

    // Cerrar al pulsar un enlace (navegación por anclas)
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Año dinámico en el footer ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Animación reveal al hacer scroll ---- */
  var revealTargets = document.querySelectorAll(
    ".feature, .step, .plan, .quote, .section-head, .about-text, .about-media, .faq details"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Validación del formulario de contacto ---- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  function setError(field, msg) {
    var input = form.elements[field];
    var small = form.querySelector('.error[data-for="' + field + '"]');
    if (input) input.classList.toggle("invalid", !!msg);
    if (small) small.textContent = msg || "";
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validate() {
    var ok = true;
    var name = form.elements["name"].value.trim();
    var email = form.elements["email"].value.trim();
    var message = form.elements["message"].value.trim();
    var privacy = form.elements["privacy"].checked;

    setError("name", name ? "" : "Dime tu nombre, por favor.");
    if (!name) ok = false;

    if (!email) { setError("email", "Necesito tu email para responderte."); ok = false; }
    else if (!validEmail(email)) { setError("email", "Revisa el formato del email."); ok = false; }
    else { setError("email", ""); }

    setError("message", message ? "" : "Cuéntame brevemente tu situación.");
    if (!message) ok = false;

    if (!privacy) { status.textContent = "Debes aceptar la política de privacidad."; status.className = "form-status err"; ok = false; }

    return ok;
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.textContent = "";
      status.className = "form-status";

      if (!validate()) return;

      var action = form.getAttribute("action") || "";
      var usingPlaceholder = action.indexOf("TU_ID_FORMSPREE") !== -1 ||
                             action.indexOf("your-form-id") !== -1 ||
                             action === "";

      // Si aún no hay backend configurado, simulamos el envío (modo demo)
      if (usingPlaceholder) {
        status.textContent = "¡Gracias! (Demo) El formulario aún no está conectado. Pega tu ID de Formspree en el atributo action para recibir los mensajes.";
        status.className = "form-status ok";
        form.reset();
        return;
      }

      // Envío real vía fetch (p. ej. Formspree)
      var btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            status.textContent = "¡Mensaje enviado! Te responderé en menos de 24 horas.";
            status.className = "form-status ok";
            form.reset();
          } else {
            throw new Error("Respuesta no válida del servidor");
          }
        })
        .catch(function () {
          status.textContent = "No se pudo enviar. Escríbeme a estefania.preparagace@gmail.com mientras lo reviso.";
          status.className = "form-status err";
        })
        .finally(function () {
          if (btn) { btn.disabled = false; btn.textContent = "Enviar y pedir clase de prueba"; }
        });
    });

    // Limpiar error del campo al escribir
    ["name", "email", "message"].forEach(function (f) {
      var input = form.elements[f];
      if (input) input.addEventListener("input", function () { setError(f, ""); });
    });
  }
})();
