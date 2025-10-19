import { useEffect } from "react";

export default function useScripts() {
  useEffect(() => {
    /* ----------------- CARRUSEL OFERTAS ----------------- */
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    const carousel = document.querySelector(".ofertas-track");

    if (carousel && btnPrev && btnNext) {
      const item = document.querySelector(".oferta-item");
      if (item) {
        const style = getComputedStyle(item);
        const marginRight = parseInt(style.marginRight);
        const itemWidth = item.offsetWidth + marginRight;

        const visibleItems = 4;
        const totalItems = document.querySelectorAll(".oferta-item").length;
        const maxPosition = -(itemWidth * (totalItems - visibleItems));

        let currentPosition = 0;

        btnNext.addEventListener("click", () => {
          if (currentPosition > maxPosition) {
            currentPosition -= itemWidth;
            if (currentPosition < maxPosition) currentPosition = maxPosition;
            carousel.style.transform = `translateX(${currentPosition}px)`;
          }
        });

        btnPrev.addEventListener("click", () => {
          if (currentPosition < 0) {
            currentPosition += itemWidth;
            if (currentPosition > 0) currentPosition = 0;
            carousel.style.transform = `translateX(${currentPosition}px)`;
          }
        });
      }
    }

    /* ----------------- CARRITO Y MINI EXPLOSION ----------------- */
    const palaBtn = document.querySelector(".pala-btn");
    const carrito = document.createElement("div");
    carrito.id = "carrito";
    document.body.appendChild(carrito);

    const carritoLista = document.createElement("ul");
    carritoLista.id = "carrito-lista";
    carrito.appendChild(carritoLista);

    palaBtn?.addEventListener("click", () => {
      carrito.style.display = carrito.style.display === "block" ? "none" : "block";
    });

    const productos = document.querySelectorAll(".producto, .oferta-item");
    productos.forEach((producto) => {
      producto.addEventListener("click", () => {
        const nombre = producto.querySelector("h3, h4")?.textContent || "Producto";
        const precio = producto.querySelector("p:last-of-type")?.textContent || "";

        const li = document.createElement("li");
        li.classList.add("carrito-item");

        const imgSrc = producto.querySelector("img")?.src || "";
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = nombre;
        img.classList.add("carrito-icono");

        const info = document.createElement("span");
        info.innerHTML = `<strong>${nombre}</strong> - ${precio}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "x";
        btnEliminar.classList.add("eliminar");
        btnEliminar.addEventListener("click", (e) => {
          e.stopPropagation();
          li.remove();
        });

        li.append(img, info, btnEliminar);
        carritoLista.appendChild(li);

        miniExplosion(producto);
      });
    });

    /* ----------------- MINI EXPLOSION ----------------- */
    function miniExplosion(producto) {
      const explosion = document.createElement("img");
      explosion.src =
        "https://i.pinimg.com/originals/9d/1a/9d/9d1a9df0ec27d025b8f3d21a9bf4e561.gif";
      Object.assign(explosion.style, {
        position: "absolute",
        width: "100px",
        height: "50px",
        pointerEvents: "none",
      });

      const rect = producto.getBoundingClientRect();
      explosion.style.top = `${rect.top + window.scrollY}px`;
      explosion.style.left = `${rect.left + window.scrollX}px`;

      document.body.appendChild(explosion);
      setTimeout(() => explosion.remove(), 700);
    }




    const contenido = document.querySelector('.contenido');
    const thumb = document.querySelector('.thumb');
    const track = document.querySelector('.track');

    if (contenido && thumb && track) {

        const updateThumb = () => {
            const scrollHeight = contenido.scrollHeight - contenido.clientHeight;
            const trackHeight = track.clientHeight - thumb.offsetHeight;
            const scrollRatio = scrollHeight ? contenido.scrollTop / scrollHeight : 0;
            thumb.style.top = `${scrollRatio * trackHeight}px`;
        };

        // Scroll con rueda
        contenido.addEventListener('scroll', updateThumb);
        window.addEventListener('resize', updateThumb);

        // Drag del thumb
        let isDragging = false;
        let startY, startTop;

        thumb.addEventListener('mousedown', e => {
            isDragging = true;
            startY = e.clientY;
            startTop = parseFloat(thumb.style.top || 0);
            thumb.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;

            const deltaY = e.clientY - startY;
            const trackHeight = track.clientHeight - thumb.offsetHeight;
            let newTop = Math.min(trackHeight, Math.max(0, startTop + deltaY));
            thumb.style.top = `${newTop}px`;

            const scrollHeight = contenido.scrollHeight - contenido.clientHeight;
            contenido.scrollTop = (newTop / trackHeight) * scrollHeight;
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
            isDragging = false;
            thumb.style.cursor = 'grab';
            document.body.style.userSelect = '';
            }
        });

        // Inicializa thumb
        updateThumb();
    }







    /* ----------------- SONIDOS ----------------- */
    const imgDaves = document.getElementById("img-daves");
    const sonido = document.getElementById("sonido-dave");

    imgDaves?.addEventListener("click", () => {
      if (!sonido) return;
      sonido.currentTime = 0;
      sonido.play();
    });

    const musica = document.getElementById("musica");
    const btn = document.getElementById("btn-musica");
    const icono = document.getElementById("icono-musica");
    const volumen = document.getElementById("volumen");

    btn?.addEventListener("click", () => {
      if (!musica) return;
      if (musica.paused) {
        musica.play();
        icono.src =
          "https://static.wikia.nocookie.net/plantsvszombies/images/9/98/HD_Sun_Shroom.png/revision/latest?cb=20220919173933";
      } else {
        musica.pause();
        icono.src = "src/assets/img/sunshroomapagado (1).png";
      }
    });

    volumen?.addEventListener("input", () => {
      if (musica) musica.volume = volumen.value;
    });

    /* ----------------- BOTÓN DE COMPRA Y MODAL ----------------- */
    const btnComprar = document.createElement("button");
    btnComprar.textContent = "Proceder a la compra";
    Object.assign(btnComprar.style, {
      width: "100%",
      padding: "10px",
      marginTop: "10px",
      backgroundColor: "#4CAF50",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    });
    carrito.appendChild(btnComprar);

    const modalCompra = document.createElement("div");
    modalCompra.id = "modal-compra";
    Object.assign(modalCompra.style, {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "none",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "1000",
    });

    const modalCompraContent = document.createElement("div");
    Object.assign(modalCompraContent.style, {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      width: "90%",
      maxWidth: "400px",
    });

    modalCompraContent.innerHTML = `
      <h3>Formulario de Compra</h3>
      <label>Nombre:</label>
      <input type="text" id="compra-nombre" placeholder="Tu nombre" style="width:100%; margin-bottom:10px; padding:5px;">
      <label>Email:</label>
      <input type="email" id="compra-email" placeholder="Tu email" style="width:100%; margin-bottom:10px; padding:5px;">
      <label>Dirección:</label>
      <input type="text" id="compra-direccion" placeholder="Dirección de envío" style="width:100%; margin-bottom:10px; padding:5px;">
      <button id="enviar-compra" style="width:100%; padding:10px; background:#4CAF50; color:#fff; border:none; border-radius:5px; cursor:pointer;">Enviar Compra</button>
      <button id="cerrar-compra" style="width:100%; padding:10px; margin-top:10px; background:#f44336; color:#fff; border:none; border-radius:5px; cursor:pointer;">Cancelar</button>
    `;

    modalCompra.appendChild(modalCompraContent);
    document.body.appendChild(modalCompra);

    const nombreInput = document.getElementById("compra-nombre");
    const emailInput = document.getElementById("compra-email");
    const direccionInput = document.getElementById("compra-direccion");

    [nombreInput, emailInput, direccionInput].forEach((input) => {
      input.addEventListener("input", () => {
        input.style.borderColor = input.value.trim() === "" ? "red" : "";
      });
      input.addEventListener("blur", () => {
        input.style.borderColor = input.value.trim() === "" ? "red" : "";
      });
    });

    btnComprar.addEventListener("click", () => {
      if (carritoLista.children.length === 0) {
        alert("No hay productos en el carrito");
        return;
      }
      modalCompra.style.display = "flex";
    });

    document.getElementById("cerrar-compra").addEventListener("click", () => {
      modalCompra.style.display = "none";
    });

    document.getElementById("enviar-compra").addEventListener("click", () => {
      const nombre = nombreInput.value;
      const email = emailInput.value;
      const direccion = direccionInput.value;

      // Resetear bordes
      [nombreInput, emailInput, direccionInput].forEach((i) => (i.style.borderColor = ""));

      let valido = true;
      if (!nombre) { nombreInput.style.borderColor = "red"; valido = false; }
      if (!email) { emailInput.style.borderColor = "red"; valido = false; }
      if (!direccion) { direccionInput.style.borderColor = "red"; valido = false; }
      if (!valido) { alert("Completa todos los campos resaltados en rojo"); return; }

      alert(`Compra enviada!\nNombre: ${nombre}\nEmail: ${email}\nDirección: ${direccion}`);
      modalCompra.style.display = "none";
      carritoLista.innerHTML = "";
    });

    /* ----------------- SESIÓN ----------------- */
    let usuarios = [];

    const modalRegistrar = document.getElementById("modal-registrar");
    const modalLogin = document.getElementById("modal-login");

    document.getElementById("btn-registrar")?.addEventListener("click", () => (modalRegistrar.style.display = "block"));
    document.getElementById("btn-login")?.addEventListener("click", () => (modalLogin.style.display = "block"));

    document.querySelectorAll(".close").forEach((span) => {
      span.addEventListener("click", () => (span.parentElement.parentElement.style.display = "none"));
    });

    document.getElementById("registrar")?.addEventListener("click", () => {
      const user = document.getElementById("reg-usuario").value;
      const pass = document.getElementById("reg-pass").value;
      if (user && pass) {
        usuarios.push({ usuario: user, pass: pass });
        alert("Usuario registrado!");
        modalRegistrar.style.display = "none";
      } else {
        alert("Completa todos los campos");
      }
    });

    function loginSuccess() {
      document.getElementById("btn-login").style.display = "none";
      document.getElementById("btn-registrar").style.display = "none";
      document.getElementById("user-icon").style.display = "inline";
    }

    document.getElementById("login")?.addEventListener("click", () => {
      const user = document.getElementById("login-usuario").value;
      const pass = document.getElementById("login-pass").value;
      const encontrado = usuarios.find((u) => u.usuario === user && u.pass === pass);
      if (encontrado) {
        alert("¡Bienvenido " + user + "!");
        modalLogin.style.display = "none";
        loginSuccess();
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });

    window.onclick = (event) => {
      if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
      }
    };
  }, []);
}
