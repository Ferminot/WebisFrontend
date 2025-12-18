import React, { useRef, useState, useEffect } from "react";
import './App.css';
import './assets/css/estilos.css';
import './assets/css/maceteros.css';
import './assets/css/servicios.css';
import useScripts from "./assets/js/useScripts";
import './assets/css/cart.css';
import Carrito from "./assets/js/Carrito";
import Login from "./assets/js/Login";
import Register from "./assets/js/Register";
import { obtenerPlantas } from "./assets/js/plantaService";
import { obtenerMacetas } from "./assets/js/macetaService";
import { obtenerServicios } from "./assets/js/servicioService";



// Canciones por sección
const canciones = {
  plantas: "src/assets/Audio/15. Main Music 09.mp3",
  maceteros: "src/assets/Audio/17. Main Music 11.mp3",
  servicios: "src/assets/Audio/12. Main Music 06.mp3",
};

function App() {
  useScripts();
  const musicaRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const thumbRef = useRef(null);

  // Estados
  const [volumen] = useState(1);
  const [seccionActiva, setSeccionActiva] = useState("plantas");
  const [animando, setAnimando] = useState(false);
  const [open, setOpen] = useState(false);
  const [plantas, setPlantas] = useState([]);
  const [maceteros, setMaceteros] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [cart, setCart] = useState([]);

  // Cambiar sección
  const cambiarSeccion = (seccion) => {
    if (seccion === seccionActiva) return;
    setAnimando(true);
    setTimeout(() => {
      setSeccionActiva(seccion);
      setAnimando(false);
    }, 300);
  };

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("auth_currentUser") || null
  );
  const isAdmin = currentUser === "ADMIN";
  console.log("currentUser:", currentUser);
  console.log("isAdmin:", isAdmin);

  const handleLogin = (username) => {
    setCurrentUser(username);
    localStorage.setItem("auth_currentUser", username);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("auth_currentUser");
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
  };
    

  // Scroll personalizado
  useEffect(() => {
    const container = scrollContainerRef.current;
    const thumb = thumbRef.current;
    if (!container || !thumb) return;

    const handleScroll = () => {
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrollTop = container.scrollTop;
      const thumbHeight = Math.max(
        (container.clientHeight / container.scrollHeight) * container.clientHeight,
        30
      );
      thumb.style.height = `${thumbHeight}px`;
      const thumbTop = (scrollTop / scrollHeight) * (container.clientHeight - thumbHeight);
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Reproducir música automáticamente según la sección
  useEffect(() => {
    const audio = musicaRef.current;
    if (!audio) return;

    audio.src = canciones[seccionActiva];
    audio.volume = volumen;
    audio.loop = true;
    audio.play().catch(() => {});
  }, [seccionActiva, volumen]);

  // Función para agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    const productoNormalizado = {
      ...producto,
      valor: Number(producto.valor ?? 0), // 🔒 SIEMPRE número
    };

    setCart((prev) => [...prev, productoNormalizado]);
  };


  const guardarPrecioPlanta = async (id, nuevoValor) => {
  try {
    const resp = await fetch(
      `http://localhost:8080/plantas/${id}/precio`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ valor: nuevoValor })
      }
    );

    if (!resp.ok) {
      alert("Error al guardar el precio");
      return;
    }

    alert("Precio actualizado correctamente");
  } catch (e) {
    alert("Error de conexión");
  }
};

  const guardarPrecioMaceta = async (id, nuevoValor) => {
  try {
    const token = localStorage.getItem("auth_token");

    const resp = await fetch(`http://localhost:8080/macetas/${id}/precio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        valor: Number(nuevoValor),
      }),
    });

    if (!resp.ok) {
      alert("Error al guardar el precio de la maceta");
      return;
    }

    setMaceteros((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, valor: Number(nuevoValor) } : m
      )
    );

    alert("Precio de maceta actualizado correctamente");
  } catch (error) {
    console.error(error);
    alert("Error de conexión");
  }
};


  const guardarPrecioServicio = async (id, nuevoValor) => {
  try {
    const token = localStorage.getItem("auth_token");

    const resp = await fetch(`http://localhost:8080/servicios/${id}/precio`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        valor: Number(nuevoValor),
      }),
    });

    if (!resp.ok) {
      alert("Error al guardar el precio del servicio");
      return;
    }

    setServicios((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, valor: Number(nuevoValor) } : s
      )
    );

    alert("Precio de servicio actualizado correctamente");
  } catch (error) {
    console.error(error);
    alert("Error de conexión");
  }
};



  // Función para eliminar productos del carrito
  const eliminarDelCarrito = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };


  //Traer Plantas BackEnd
  useEffect(() => {
  const fetchPlantas = async () => {
    try {
      const data = await obtenerPlantas(); 
      setPlantas(data); 
    } catch (error) {
      console.error("Error cargando plantas:", error);
    }
  };

  fetchPlantas();
  }, []);

    //traer macetas del backend
  useEffect(() => {
    const cargarMaceteros = async () => {
      const datos = await obtenerMacetas();
      setMaceteros(datos);
    };
    cargarMaceteros();
  }, []);

    //servicios backend
  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const data = await obtenerServicios();
        setServicios(data);
      } catch (error) {
        console.error("Error al cargar servicios:", error);
      }
    };

    cargarServicios();
  }, []);

  useEffect(() => {
    const cargarDatos = async () => {
      setPlantas(await obtenerPlantas());
      setMaceteros(await obtenerMacetas());
      setServicios(await obtenerServicios());
    };
    cargarDatos();
  }, []);

  


  // Navbar
  const Navbar = () => (
    <section id="navbar-pvz" style={{ left: 0, width: "100%", zIndex: 1000 }}>
      <div id="navbar-content">
        <div className="logo">
          <img src="src/assets/img/WebisWabos.png" alt="Logo" />
          <span className="logo-text" style={{ color: "white", fontSize: "35px" }}>
            Webi's Wabos
          </span>
        </div>

        {/* Botón del carrito */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            right: "35px",
            zIndex: 2000,
          }}
        >
          <img
            src="src/assets/img/Shop2.webp"
            alt="Carrito"
            onClick={() => setOpen(!open)}
            style={{
              width: "75px",
              height: "75px",
              cursor: "pointer",
              transition: "transform 0.2s, filter 0.2s",
              filter: "drop-shadow(0 0 5px rgba(255,255,255,0.3))",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.filter = "drop-shadow(0 0 10px rgba(255,255,255,0.6))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.filter = "drop-shadow(0 0 5px rgba(255,255,255,0.3))";
            }}
          />
        </div>

        <div className="plantas-wrapper">
          <div className="plantas-container">
            <div className="planta-card" onClick={() => cambiarSeccion("plantas")}>
              <img
                src="https://plantsvszombies.wiki.gg/images/0/0e/Plant_Food2.png?ca3363"
                alt="Plantas"
              />
              <div className="planta-precio">Plantas</div>
            </div>
            <div className="planta-card" onClick={() => cambiarSeccion("maceteros")}>
              <img src="src/assets/img/Maceta_hd_pvz2.webp" height="85px" alt="Maceteros" />
              <div className="planta-precio">Maceteros</div>
            </div>
            <div className="planta-card" onClick={() => cambiarSeccion("servicios")}>
              <img src="src/assets/img/pngegg.png" height="86px" alt="Servicios" />
              <div className="planta-precio">Servicios</div>
            </div>
          </div>
        </div>

        {/* Botones de Register y Login al lado del carrito */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            position: "absolute",
            top: "20px",
            right: "150px",
            zIndex: 2000,
          }}
        >
          {!currentUser && (
            <>
              <button className="btn-navbar" onClick={() => setShowRegister(true)}>Register</button>
              <button className="btn-navbar" onClick={() => setShowLogin(true)}>Login</button>
            </>
          )}
          {currentUser && (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <img
                src="src/assets/plantas/Nueva carpeta/TalkingHead_CrazyDave.png" 
                alt="Perfil"
                style={{ width: "80px", height: "90px", borderRadius: "50%", transform: "translateY(-9px)" }}
              />
              <button className="btn-navbar" onClick={handleLogout}>
                Cerrar sesion ({currentUser.username || currentUser})
              </button>
            </div>
          )}
        </div>
      </div>   
    </section>
  );



  // ----------------- CARRUSEL DE OFERTAS -----------------
  useEffect(() => {
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector(".btn-next");
    const carousel = document.querySelector(".ofertas-track");

    if (carousel && btnPrev && btnNext) {
      const item = document.querySelector(".oferta-item");
      if (!item) return;

      const style = getComputedStyle(item);
      const marginRight = parseInt(style.marginRight);
      const itemWidth = item.offsetWidth + marginRight;

      const visibleItems = 4; 
      const totalItems = document.querySelectorAll(".oferta-item").length;
      const maxPosition = -(itemWidth * (totalItems - visibleItems));

      let currentPosition = 0;

      const nextHandler = () => {
        if (currentPosition > maxPosition) {
          currentPosition -= itemWidth;
          if (currentPosition < maxPosition) currentPosition = maxPosition;
          carousel.style.transform = `translateX(${currentPosition}px)`;
        }
      };

      const prevHandler = () => {
        if (currentPosition < 0) {
          currentPosition += itemWidth;
          if (currentPosition > 0) currentPosition = 0;
          carousel.style.transform = `translateX(${currentPosition}px)`;
        }
      };

      btnNext.addEventListener("click", nextHandler);
      btnPrev.addEventListener("click", prevHandler);

      // Cleanup al desmontar
      return () => {
        btnNext.removeEventListener("click", nextHandler);
        btnPrev.removeEventListener("click", prevHandler);
      };
    }
  }, [seccionActiva]); 




  return (
    <>
      
      <div className="scroll-container" id="contenido" ref={scrollContainerRef}>
        <Navbar />
            <section
              className={`seccion ${animando ? "fade-out" : "fade-in"}`}
            >
              {seccionActiva === "plantas" && (
                <section id="PlantasVista">
          

                  <section id="LocosDaves">
                    <div className="contenido">


                      {/* Gif */}
                      <div className="gif">
                        <div className="gif-container">
                          <img 
                            src="src/assets/img/110hz7t_th.webp" 
                            alt="Gif Locos Daves" 
                            className="gif-daves" 
                          />
                        </div>
                      </div>

                      {/* Texto */}
                      <div className="texto">
                        <h2 className="davescolor">Locos Daves</h2>
                        <p>
                          "En Webi's Wabos, no solo vendemos plantas y maceteros, ¡te ayudamos a que tu hogar crezca con estilo, vida y un toque de locura verde!"
                        </p>
                      </div>

                      {/* Imagen */}
                      <div className="imagen">
                        <img 
                          id="img-daves" 
                          src="src/assets/img/Crazydavebody2.webp" 
                          height="500px" 
                          alt="Locos_Daves" 
                        />
                      </div>

                    </div>

                    {/* Audio extra */}
                    <audio id="sonido-dave" src="src/assets/Audio/Voices crazydaveshort1.mp3"></audio>
                  </section>


                  <section id="Plantas-mid">
                     
                    <div className="productos-container">
                      {plantas.length === 0 ? (
                        <p>Cargando plantas...</p>
                      ) : (
                        plantas.map((producto, index) => (
                          <div
                            key={index}
                            className="producto"
                            onClick={() =>
                              agregarAlCarrito({
                                nombre: producto.nombre,
                                valor: producto.valor,
                                img: producto.img_principal,
                              })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <div className="imagen-hover">
                              <img
                                src={producto.img_principal}   // <-- exacto
                                alt={producto.nombre}
                                className="img-principal"
                              />
                              <img
                                src={producto.img_hover}       // <-- exacto
                                alt={`${producto.nombre} Alternativa`}
                                className="img-hover"
                              />
                            </div>
                            <div className="info-producto">
                              <h3>{producto.nombre}</h3>
                              <p className="descripcion">{producto.descripcion}</p>
                              {isAdmin ? (
                                <>
                                  <input
                                    type="number"
                                    value={producto.valor}
                                    onChange={(e) =>
                                      setPlantas(prev =>
                                        prev.map(p =>
                                          p.id === producto.id
                                            ? { ...p, valor: Number(e.target.value)  }
                                            : p
                                        )
                                      )
                                    }
                                  />

                                  {/* 🔹 BOTÓN GUARDAR */}
                                  <button
                                    onClick={() =>
                                      guardarPrecioPlanta(producto.id, producto.valor)
                                    }
                                    style={{ color: "gold", marginTop: "6px" }}
                                  >
                                    Guardar
                                  </button>
                                </>
                              ) : (
                                <p style={{ color: "gold", fontWeight: "bold" }}>
                                  ☀️ ${producto.valor}
                                </p>
                              )}


                            </div>
                          </div>
                        ))
                      )}
                    </div>


                  </section>


                  {/* Ofertas seccion */}
                  <section class="ofertas-section">
                      <h2>Ofertas</h2>
                      <div class="ofertas-container">
                          <button class="btn-prev">&lt;</button>
                          <div class="ofertas-carousel">
                              
                            <div className="ofertas-track">
                              {[
                                {
                                  nombre: "Sun-shroom",
                                  precio: 1000,
                                  img: "https://i.pinimg.com/originals/6e/2c/7f/6e2c7f05abede7e66d5cd488506cb314.png",
                                  descripcion: "Pequeño hongo comestible de sombrero redondo y tallo corto."
                                },
                                {
                                  nombre: "Amanita",
                                  precio: 500,
                                  img: "src/assets/img/PuffShroomPvZ1.webp",
                                  descripcion: "Hongo de intenso color rojo con manchas blancas VENENOSO, perfecto para decoración o coleccionistas."
                                },
                                {
                                  nombre: "Cortinarius violaceus",
                                  precio: 790,
                                  img: "src/assets/img/Scaredy-shroom.webp",
                                  descripcion: "Hongo morado con manchas oscuras, visualmente único y decorativo, pero no comestible."
                                },
                                {
                                  nombre: "Tylopilus alboater",
                                  precio: 1000,
                                  img: "src/assets/img/Doom-shroom-hd.webp",
                                  descripcion: "Hongo de sombrero negro aterciopelado, visualmente impactante y decorativo, pero no apto para consumo."
                                },
                                {
                                  nombre: "emperor webcap",
                                  precio: 1000,
                                  img: "src/assets/img/HumosetaHDPvz2.webp",
                                  descripcion: "Hongo de gran tamaño con sombrero morado, decorativo y llamativo, pero no comestible."
                                },
                                {
                                  nombre: "Clathrus archeri",
                                  precio: 1000,
                                  img: "src/assets/img/SetaCongeladaHD.webp",
                                  descripcion: 'Hongo con tentáculos rojos que emergen de un "huevo", creando una apariencia única y llamativa.'
                                },
                                {
                                  nombre: "puffballs",
                                  precio: 1000,
                                  img: "src/assets/img/ComepiedrasASS.webp",
                                  descripcion: "Hongo redondo que libera esporas al tocarlo, decorativo y curioso, pero no comestible en estado salvaje."
                                },
                                {
                                  nombre: "Purple Emperor",
                                  precio: 1000,
                                  img: "src/assets/img/Hipnoseta_HD.webp",
                                  descripcion: "Hongo de sombrero morado brillante y tallo glutinoso, decorativo y llamativo, pero no comestible."
                                },
                              ].map((oferta, index) => (
                                <div
                                  key={index}
                                  className="oferta-item"
                                  onClick={() =>
                                    agregarAlCarrito({
                                      nombre: oferta.nombre,
                                      precio: oferta.precio,
                                      img: oferta.img,
                                    })
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  <img src={oferta.img} alt={oferta.nombre} />
                                  <div className="info-oferta">
                                    <h4>{oferta.nombre}</h4>
                                    <p className="oferta-descripcion">{oferta.descripcion}</p>
                                    <p>☀️ ${oferta.precio.toLocaleString()}</p>
                                  </div>
                                </div>
                              ))}
                            </div>



                          <button class="btn-next">&gt;</button>
                          </div>
                      </div>
                  </section>

                  
                  <section id="Macetas">
                    <h2>Maceteros Destacados</h2>
                    <div className="productos-container">
                      {[
                        {
                          nombre: "Macetera",
                          precio: 3000,
                          imgPrincipal: "src/assets/img/Maceta_hd_pvz2.webp",
                          imgHover: "https://huertosalma.cl/wp-content/uploads/2021/02/Macetero-Terracota-HUertos-Alma-600x559.png",
                          descripcion: "Elegante maceta de terracota, perfecta para tus plantas favoritas."
                        },
                        {
                          nombre: "Maceta Beige",
                          precio: 4500,
                          imgPrincipal: "src/assets/img/Maceta_con_sol.webp",
                          imgHover: "src/assets/img/Maceterorustico.png",
                          descripcion: "Ideal para decorar balcones y espacios altos con estilo."
                        },
                        {
                          nombre: "Maceta Moderna",
                          precio: 5000,
                          imgPrincipal: "src/assets/img/pvz_2_china_flower_pot_nutriente__1_png_by_hugoofficiazd_dggq88w-pre.png",
                          imgHover: "src/assets/img/Maceteromoderno.png",
                          descripcion: "Diseño minimalista y elegante, perfecto para interiores modernos."
                        },
                      ].map((maceta, index) => (
                        <div
                          key={index}
                          className="producto"
                          onClick={() =>
                            agregarAlCarrito({
                              nombre: maceta.nombre,
                              precio: maceta.precio,
                              img: maceta.imgPrincipal,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div className="imagen-hover">
                            <img
                              src={maceta.imgPrincipal}
                              alt={maceta.nombre}
                              className="img-principal"
                            />
                            <img
                              src={maceta.imgHover}
                              alt={`${maceta.nombre} Alternativa`}
                              className="img-hover"
                            />
                          </div>
                          <div className="info-producto">
                            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <img
                                src={maceta.imgPrincipal}
                                alt={maceta.nombre}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                              {maceta.nombre}
                            </h3>
                            <p className="descripcion">{maceta.descripcion}</p>
                            <p>☀️ ${maceta.precio.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                  </section>


                  {/* Tail de la página */}
                  <section className="Tail-Pagina">
                    <div className="opiniones">
                      <h2>🌱 Opiniones de Compradores</h2>
                      <div className="carrusel" id="carrusel">
                        <div className="opinion">
                          <img
                            src="src/assets/img/iconozombie.png"
                            alt="Perfil 1"
                            className="perfil-opinion"
                          />
                          <p>"Ah llegado super bien empaquetado!!! Recomiendo no ponerlo en sus jardines."</p>
                          <div className="estrellas">⭐⭐⭐⭐⭐</div>
                        </div>

                        <div className="opinion">
                          <img
                            src="src/assets/img/zombieMedio.png"
                            alt="Perfil 2"
                            className="perfil-opinion"
                          />
                          <p>"Si las compro todas, ya no tendran defensas!!! 😁"</p>
                          <div className="estrellas">⭐⭐⭐⭐</div>
                        </div>

                        <div className="opinion">
                          <img
                            src="src/assets/img/33-333626_plants-vs-zombies-png-transparent-png (1).png"
                            alt="Perfil 3"
                            className="perfil-opinion"
                          />
                          <p>"La Nuez sabe bastante bien, podria estar un hora comiendola. 🧟"</p>
                          <div className="estrellas">⭐⭐⭐⭐</div>
                        </div>
                      </div>
                    </div>

                    <div className="banner">
                      <div className="logo">
                        <img src="src/assets/img/Pcap.webp" alt="PvZ Logo" />
                        <span>PopCap Games - Electronic Arts</span>
                      </div>

                      <div className="info">
                        <p>📧 Contacto: soporte@popcap.com</p>
                        <p>Ubicado en: Pomaire, Los Rosales 6969</p>
                        <p>© 2009 - 2025 PopCap Games, Electronic Arts Inc. Todos los derechos reservados.</p>
                        <p>Lesli Gonzalez - Benjamin Cornejo</p>
                      </div>

                      <div className="social">
                        <a href="#">📘 Facebook</a>
                        <a href="#">🐦 Twitter</a>
                        <a href="#">📸 Instagram</a>
                        <a href="#">▶️ YouTube</a>
                      </div>

                      <div className="pegi">
                        <img src="src/assets/img/PEGI_7.webp" alt="PEGI 7" />
                      </div>
                    </div>
                  </section>
                </section>
              )}







              

              {/*vista Maceteros*/}







              
              {seccionActiva === "maceteros" && (
                <section id="Macetas">





                  {/* Solo maceteros, sección completa */}
                  <section id="HeadIntroduccion">

                    <img 
                      src="src/assets/img/static-assets-upload15956106363148005451.webp" 
                      alt="Decoración izquierdaa"
                      className="decoracion-izquierdaa"
                    />
                    <img 
                      src="src/assets/img/Ballon_zombie_idle.webp" 
                      alt="Decoración derechaa"
                      className="decoracion-derechaa"
                    />

                    {/* Texto de introducción */}
                    <div className="text-container">
                      <h1 className="title">¡Prepárate para plantar!</h1>
                      <p className="subtitle">
                        Estos maceteros están listos para defender tu jardín contra cualquier zombie. Elige tu favorito.
                      </p>
                    </div>

                    {/* Espacio para imágenes */}
                    <div className="images-row top-row">
                      {[
                        {
                          nombre: "Macetero Izquierda",
                          img: "src/assets/img/Macetero1.png",
                          precio: 12000,
                        },
                        {
                          nombre: "Macetero 3",
                          img: "src/assets/img/maceta13.png",
                          precio: 18000,
                          style: { width: "210px" },
                        },
                      ].map((item, index) => (
                        <img
                          key={index}
                          src={item.img}
                          alt={item.nombre}
                          className="macetero-image"
                          style={item.style}
                          onClick={() =>
                            agregarAlCarrito({
                              nombre: item.nombre,
                              img: item.img,
                              precio: item.precio,
                            })
                          }
                        />
                      ))}
                    </div>

                    <div className="images-row bottom-row">
                      {[
                        {
                          nombre: "Macetero Abajo 1",
                          img: "src/assets/img/MaceteroChino.png",
                          precio: 15000,
                          style: { width: "230px" },
                        },
                        {
                          nombre: "Macetero Abajo 2",
                          img: "src/assets/img/Maceteroazul.png",
                          precio: 14000,
                        },
                      ].map((item, index) => (
                        <img
                          key={index}
                          src={item.img}
                          alt={item.nombre}
                          className="macetero-image"
                          style={item.style}
                          onClick={() =>
                            agregarAlCarrito({
                              nombre: item.nombre,
                              img: item.img,
                              precio: item.precio,
                            })
                          }
                        />
                      ))}
                    </div>

                    
                  </section>







                  <section id="maceteros_mid">
                    <div className="texto-container">
                      <h1 className="titulos-maceteros">Maceteros Mortales</h1>
                      <p className="subtitulo-maceteros">
                        Pon tus plantas aquí… si no, los zombies lo harán por ti.
                      </p>
                    </div>

                    <div className="maceteros-grid">
                      {maceteros.length === 0 ? (
                        <p>Cargando maceteros...</p>
                      ) : (
                        maceteros.map((macetero, index) => (
                          <div
                            key={index}
                            className="macetero-item"
                            onClick={() =>
                              agregarAlCarrito({
                                nombre: macetero.nombre,
                                valor: macetero.valor,
                                img: macetero.imgPrincipal, // o macetero.img si es estático
                              })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <img src={macetero.imgPrincipal || macetero.img} alt={macetero.nombre} />
                            <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                              <img
                                src={macetero.imgPrincipal || macetero.img}
                                alt={macetero.nombre}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                              {macetero.nombre}
                            </h3>
                            {isAdmin ? (
                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                <input
                                  type="number"
                                  value={macetero.valor}
                                  onChange={(e) =>
                                    setMaceteros((prev) =>
                                      prev.map((m, i) =>
                                        i === index
                                          ? { ...m, valor: Number(e.target.value) }
                                          : m
                                      )
                                    )
                                  }
                                  style={{
                                    width: "80px",
                                    color: "gold",
                                    fontWeight: "bold",
                                  }}
                                />

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation(); // evita agregar al carrito
                                    guardarPrecioMaceta(macetero.id, macetero.valor);
                                  }}
                                >
                                  Guardar
                                </button>
                              </div>
                            ) : (
                              <p>
                                ☀️ $
                                {(macetero.valor ?? macetero.precio)?.toLocaleString()}
                              </p>
                            )}

                          </div>
                        ))
                      )}
                    </div>
                  </section>


                  







                </section>
              )}



              {seccionActiva === "servicios" && (
                <section id="servicios">

                  <section id="HeadServicios">

                    <img 
                      src="src/assets/img/PvZC_Zomboss%403x.webp" 
                      alt="Decoración izquierda"
                      className="decoracion-izquierda"
                    />
                    <img 
                      src="src/assets/img/161-1614734_zombie-transparent-png-plants-vs-zombies.png" 
                      alt="Decoración derecha"
                      className="decoracion-derecha"
                    />
                    <section className="servicio-potenciador">
                      <h2 className="titulo-potenciador">Acelerador de crecimiento Maxium 5000</h2>
                      <img
                        src="src/assets/img/nutriente.webp"
                        alt="Potenciador de crecimiento"
                        className="imagen-potenciador"
                        onClick={() =>
                          agregarAlCarrito({
                            nombre: "Potenciador de crecimiento",
                            img: "src/assets/img/nutriente.webp",
                            precio: 13000,
                          })
                        }
                      />

                      <p className="descripcion-potenciador">
                        Haz que tus plantas crezcan más rápido y se fortalezcan.
                      </p>
                      <p className="precio-potenciador">
                        $13.000
                      </p>
                    </section>

                  </section>

              
                  <section id="MantenimientoJardin">
                    <div className="mantenimiento-container">
                      <div className="mantenimiento-texto">
                        <h2>Mantenimiento del Jardín Nocturno</h2>
                        <p>
                          Repara tus maceteros, restaura la energía de tus plantas y deja tu jardín
                          listo para resistir otra noche llena de desafíos. Nuestro equipo trabaja
                          bajo la luz de la luna para mantener todo en perfecto equilibrio.
                        </p>
                        <span className="precio">💰 $40.000 </span>
                      </div>

                      <div className="mantenimiento-imagen">
                        <img
                          src="src/assets/img/Zomboni_almanac_icon.webp"
                          alt="Crazy Dave mantenimiento"
                          className="imagen-mantenimiento"
                          onClick={() =>
                            agregarAlCarrito({
                              nombre: "Servicio Crazy Dave (Mantenimiento)",
                              img: "src/assets/img/Zomboni_almanac_icon.webp",
                              precio: 40000,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </section>



                  <section id="HerramientasNocturnas">
                    <div className="herramientas-grid">
                      {servicios.length === 0 ? (
                        <p>Cargando herramientas...</p>
                      ) : (
                        servicios.map((herramienta, index) => (
                          <div
                            key={index}
                            className="herramienta-item"
                            onClick={() =>
                              agregarAlCarrito({
                                nombre: herramienta.nombre,
                                valor: herramienta.valor,
                                img: herramienta.img_principal,
                              })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <img src={herramienta.img_principal} alt={herramienta.nombre} />
                            <h3>{herramienta.nombre}</h3>
                            <p>{herramienta.descripcion}</p>
                            {isAdmin ? (
                              <>
                                <input
                                  type="number"
                                  value={herramienta.valor}
                                  onClick={(e) => e.stopPropagation()}
                                  onChange={(e) =>
                                    setServicios((prev) =>
                                      prev.map((s) =>
                                        s.id === herramienta.id
                                          ? { ...s, valor: e.target.value }
                                          : s
                                      )
                                    )
                                  }
                                />

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    guardarPrecioServicio(herramienta.id, herramienta.valor);
                                  }}
                                  style={{ marginTop: "6px" }}
                                >
                                  Guardar
                                </button>
                              </>
                            ) : (
                              <span
                                className="precio"
                                style={{ color: "#FFD700", fontWeight: "bold" }}
                              >
                                💰 ${herramienta.valor.toLocaleString()}
                              </span>
                            )}

                          </div>
                        ))
                      )}
                    </div>
                  </section>




                </section>
              )}



            </section>

        <div className="custom-scrollbar">
            <div className="track"></div>
            <div className="thumb" id="thumb"></div>
        </div>

        {/* Audio invisible que se reproduce solo */}
        <audio ref={musicaRef} />

        {/* Ventana del carrito */}
        <Carrito open={open} setOpen={setOpen} cart={cart} setCart={setCart} eliminarDelCarrito={eliminarDelCarrito} />
        {/* Modales de Login y Register */}
        {showLogin && <Login onLogin={handleLogin} />}
        {showRegister && <Register onRegisterSuccess={handleRegisterSuccess} />}
      </div>
      



    </>
  )
}

export default App