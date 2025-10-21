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
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

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
    setCart(prev => [...prev, producto]);
  };

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
                        {[
                          {
                            nombre: "Girasol",
                            precio: 2500,
                            imgPrincipal: "src/assets/plantas/girasol.png",
                            imgHover: "https://images.unsplash.com/photo-1689067316514-4618c01c2e4c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
                            descripcion: "Planta que necesita un monton de sol!!! resultando en que produzca flores muy brillantes."
                          },
                          {
                            nombre: "Guisantes",
                            precio: 5000,
                            imgPrincipal: "src/assets/plantas/im-peashooter-ask-me-anything-v0-jo9i03as70je1.png",
                            imgHover: "https://rkd.es/blog/wp-content/uploads/2021/08/Como-cultivar-guisantes-600x321.jpg",
                            descripcion: "Planta vigorosa y fácil de cultivar, ideal para huertos urbanos. Florece en primavera."
                          },
                          {
                            nombre: "Nuez",
                            precio: 5000,
                            imgPrincipal: "src/assets/img/Nuez.webp",
                            imgHover: "https://media.admagazine.com/photos/62286e22818965ae9b8974e8/master/w_1600%2Cc_limit/GettyImages-929200940.jpg",
                            descripcion: "Árbol robusto que produce nueces nutritivas, perfecto para climas templados."
                          },
                          {
                            nombre: "Cactus",
                            precio: 1500,
                            imgPrincipal: "src/assets/img/Cactus.webp",
                            imgHover: "src/assets/img/saguaro-cacti-in-the-desert-imaginegolf.jpg",
                            descripcion: "Planta suculenta resistente y de bajo mantenimiento, ideal para decorar espacios con un toque natural y moderno."
                          },
                          {
                            nombre: "Planta Carnivora",
                            precio: 30000,
                            imgPrincipal: "src/assets/img/Plsnts_Carro%3FivoraHD.webp",
                            imgHover: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/L5SHHQWIN5AUJHUTFD7OM7U4SQ.jpg",
                            descripcion: "Planta fascinante, atrapa insectos para obtener nutrientes, perfecta para amantes de la naturaleza exótica."
                          },
                          {
                            nombre: "Calabaza",
                            precio: 3500,
                            imgPrincipal: "https://preview.redd.it/squash-pvz-v0-gamdf9o00f0d1.png?width=511&format=png&auto=webp&s=a632d48fef15fc8fc3658a2c291a34c3e414b9fb",
                            imgHover: "https://tb-static.uber.com/prod/image-proc/processed_images/207d19cb4f911e085ffeba8aa3c451e2/f9586c36ab7db84d09b777cee8c829b1.jpeg",
                            descripcion: "Planta trepadora que ofrece frutos grandes y nutritivos, ideal para jardines y recetas tradicionales."
                          },
                          {
                            nombre: "Cebollin",
                            precio: 3000,
                            imgPrincipal: "src/assets/img/Hd_bonk.webp",
                            imgHover: "https://i0.wp.com/foodandwineespanol.com/wp-content/uploads/2024/07/Cebollin.webp?w=600&ssl=1",
                            descripcion: "Hierba aromática de sabor suave a cebolla, perfecta para realzar platos frescos y cocinar con estilo."
                          },
                          {
                            nombre: "Repollo",
                            precio: 4500,
                            imgPrincipal: "https://i.redd.it/what-cabbage-pult-design-do-you-like-more-v0-di1t41ofhp7f1.png?width=1200&format=png&auto=webp&s=67f9df2be7dc4b8ca43c52ba45778615873df961",
                            imgHover: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Kalkar_-_Wei%C3%9Fkohl_01_ies.jpg",
                            descripcion: "Verdura crujiente y nutritiva, ideal para ensaladas frescas y guisos tradicionales."
                          },
                          {
                            nombre: "Sandia",
                            precio: 6000,
                            imgPrincipal: "https://i.pinimg.com/originals/a4/ca/46/a4ca4638b8ce9ec26bf6fed9410f3b65.png",
                            imgHover: "https://huertafamiliar.cl/wp-content/uploads/2024/10/SANDIA-CRIMSON-SWEET-2-w.jpg",
                            descripcion: "Fruta refrescante y jugosa, perfecta para los días calurosos y como un dulce natural lleno de sabor."
                          },
                          {
                            nombre: "Cereza",
                            precio: 10000,
                            imgPrincipal: "src/assets/img/Cherry_Bomb.webp",
                            imgHover: "https://cdn.blueberriesconsulting.com/2024/02/Exportacion-de-cerezas-chilenas-casi-se-triplica-en-enero-2024-Chinos-compran-el-93.jpg",
                            descripcion: "Pequeña fruta dulce y vibrante, ideal para disfrutar fresca o en postres deliciosos."
                          },
                        ].map((producto, index) => (
                          <div
                            key={index}
                            className="producto"
                            onClick={() =>
                              agregarAlCarrito({
                                nombre: producto.nombre,
                                precio: producto.precio,
                                img: producto.imgPrincipal,
                              })
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <div className="imagen-hover">
                              <img src={producto.imgPrincipal} alt={producto.nombre} className="img-principal" />
                              <img src={producto.imgHover} alt={`${producto.nombre} Alternativa`} className="img-hover" />
                            </div>
                            <div className="info-producto">
                              <h3>{producto.nombre}</h3>
                              <p className="descripcion">{producto.descripcion}</p>
                              <p>☀️ ${producto.precio.toLocaleString()}</p>
                            </div>
                          </div>
                        ))}
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
                      {[
                        {
                          nombre: "Macetero 1",
                          precio: 15000,
                          img: "src/assets/img/Maceteromoderno.png",
                        },
                        {
                          nombre: "Macetero 2",
                          precio: 12000,
                          img: "src/assets/img/Maceterorustico.png",
                        },
                        {
                          nombre: "Macetero 3",
                          precio: 18000,
                          img: "https://huertosalma.cl/wp-content/uploads/2021/02/Macetero-Terracota-HUertos-Alma-600x559.png",
                        },
                        {
                          nombre: "Macetero 4",
                          precio: 20000,
                          img: "src/assets/img/maceta4.webp",
                        },
                        {
                          nombre: "Macetero 5",
                          precio: 17000,
                          img: "src/assets/img/maceta5.webp",
                        },
                        {
                          nombre: "Macetero 6",
                          precio: 14000,
                          img: "src/assets/img/maceta6.webp",
                        },
                        {
                          nombre: "Macetero 7",
                          precio: 16000,
                          img: "src/assets/img/maceta7.webp",
                        },
                        {
                          nombre: "Macetero 8",
                          precio: 19000,
                          img: "src/assets/img/maceta8.webp",
                        },
                        {
                          nombre: "Macetero 9",
                          precio: 13000,
                          img: "src/assets/img/maceta9.png",
                        },
                        {
                          nombre: "Macetero 10",
                          precio: 15000,
                          img: "src/assets/img/maceta10.webp",
                        },
                        {
                          nombre: "Macetero 11",
                          precio: 17000,
                          img: "src/assets/img/maceta11.webp",
                        },
                        {
                          nombre: "Macetero 12",
                          precio: 20000,
                          img: "src/assets/img/maceta12.webp",
                        },
                      ].map((macetero, index) => (
                        <div
                          key={index}
                          className="macetero-item"
                          onClick={() =>
                            agregarAlCarrito({
                              nombre: macetero.nombre,
                              precio: macetero.precio,
                              img: macetero.img,
                            })
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <img src={macetero.img} alt={macetero.nombre} />
                          <h3 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <img
                              src={macetero.img}
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
                          <p>☀️ ${macetero.precio.toLocaleString()}</p>
                        </div>
                      ))}
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
                        />
                      </div>
                    </div>
                  </section>

                  <section id="HerramientasNocturnas">
                    <div className="herramientas-grid">
                      {[
                        {
                          nombre: "Pala de la Medianoche",
                          descripcion: "Remueve y reubica plantas sin despertar a los zombies.",
                          img: "src/assets/img/pala.png",
                          precio: 5000,
                        },
                        {
                          nombre: "Regadera de Luna",
                          descripcion: "Nutre tus plantas con agua encantada bajo la luz nocturna.",
                          img: "src/assets/img/WateringCan.webp",
                          precio: 4000,
                        },
                        {
                          nombre: "Acelerador de crecimiento Maxium 5000",
                          descripcion: "Proporciona un impulso de poder cuando más lo necesitan.",
                          img: "https://static.wikia.nocookie.net/plantsvszombies/images/0/0e/Plant_Food2.png",
                          precio: 5000,
                        },
                        {
                          nombre: "Podadora Fantasma",
                          descripcion: "Actúa automáticamente ante cualquier amenaza zombie.",
                          img: "src/assets/img/Lawnmower2.webp",
                          precio: 80000,
                        },
                      ].map((herramienta, index) => (
                        <div
                          key={index}
                          className="herramienta-item"
                          onClick={() => agregarAlCarrito({ nombre: herramienta.nombre, precio: herramienta.precio, img: herramienta.img })}
                          style={{ cursor: "pointer" }}
                        >
                          <img src={herramienta.img} alt={herramienta.nombre} />
                          <h3>{herramienta.nombre}</h3>
                          <p>{herramienta.descripcion}</p>
                          <span className="precio">💰 ${herramienta.precio.toLocaleString()}</span>
                        </div>
                      ))}
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
        <Carrito open={open} setOpen={setOpen} cart={cart} setCart={setCart} />
        {/* Modales de Login y Register */}
        {showLogin && <Login onLogin={handleLogin} />}
        {showRegister && <Register onRegisterSuccess={handleRegisterSuccess} />}
      </div>
      



    </>
  )
}

export default App