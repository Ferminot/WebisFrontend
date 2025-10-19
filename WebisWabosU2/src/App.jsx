import React, { useRef, useState, useEffect } from "react";
import './App.css';
import './assets/css/estilos.css';
import useScripts from "./useScripts";

function App() {
  useScripts();
  const musicaRef = useRef(null);
  const [sonando, setSonando] = useState(false);
  const [volumen, setVolumen] = useState(1);

  const scrollContainerRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const handleScroll = () => {
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const scrollTop = container.scrollTop;
      const thumbHeight = Math.max((container.clientHeight / container.scrollHeight) * container.clientHeight, 30);
      thumb.style.height = `${thumbHeight}px`;
      const thumbTop = (scrollTop / scrollHeight) * (container.clientHeight - thumbHeight);
      thumb.style.transform = `translateY(${thumbTop}px)`;
    };

    container.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="scroll-container" id="contenido" ref={scrollContainerRef}>
        {/* Nav Bar de la pagina */}
        <section id="navbar-pvz">
          <div id="navbar-content">

            <div className="logo">
              <img src="src/assets/img/WebisWabos.png" alt="Logo" />
              <span className="logo-text" style={{ color: 'white', fontSize: '35px' }}>Webi's Wabos</span>
            </div>

            <div className="plantas-wrapper">
              <div className="plantas-container">
                <div className="planta-card">
                  <img src="https://plantsvszombies.wiki.gg/images/0/0e/Plant_Food2.png?ca3363" alt="Plantas" />
                  <div className="planta-precio">Plantas</div>
                </div>
                <div className="planta-card">
                  <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/910ef7ee-7fcd-4f55-9b6c-f2056fdda32c/dggs3ic-51ab6372-80df-481a-a748-44a67b6b675a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzkxMGVmN2VlLTdmY2QtNGY1NS05YjZjLWYyMDU2ZmRkYTMyY1wvZGdnczNpYy01MWFiNjM3Mi04MGRmLTQ4MWEtYTc0OC00NGE2N2I2YjY3NWEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.ZdgzUGHosSmFwysnMyHvMR200RFhQhEYs7uQoUzOanU" height="85px" alt="Maceteros" />
                  <div className="planta-precio">Maceteros</div>
                </div>
                <div className="planta-card">
                  <img src="src/assets/img/pngegg.png" height="86px" alt="Servicios" />
                  <div className="planta-precio">Servicios</div>
                </div>
              </div>
            </div>

            {/* tema usuario de la pagina */}
            <div className="user-auth">
              <button id="btn-registrar">Registrar</button>
              <button id="btn-login">Iniciar Sesión</button>
              <div id="user-icon" style={{ display: 'none' }}>
                <img src="https://s01.riotpixels.net/data/9a/b6/9ab62790-72f4-46c3-91f0-72e487a77d5b.jpg.240p.jpg" height="150px" alt="Usuario" className="avatar" />
              </div>
              <div className="pala-btn" title="Pala">
                <img src="src/assets/img/Shop2.webp" alt="Pala" />
              </div>
              <div id="carrito" style={{ display: 'none', background: '#fff8dc', border: '2px solid #6d4c41', padding: '10px', borderRadius: '8px', position: 'absolute', top: '60px', right: 0, width: '300px', maxHeight: '400px', overflowY: 'auto', zIndex: 999 }}>
                <h3>Carrito</h3>
                <ul id="carrito-lista"></ul>
              </div>
            </div>

            <div id="modal-registrar" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <h3>Registrar</h3>
                <input type="text" id="reg-usuario" placeholder="Usuario" />
                <input type="password" id="reg-pass" placeholder="Contraseña" />
                <button id="registrar">Registrar</button>
              </div>
            </div>

            <div id="modal-login" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <h3>Iniciar Sesión</h3>
                <input type="text" id="login-usuario" placeholder="Usuario" />
                <input type="password" id="login-pass" placeholder="Contraseña" />
                <button id="login">Iniciar Sesión</button>
              </div>
            </div>

          </div>
        </section>




        <section id="LocosDaves">
          <div className="contenido">

            {/* Música */}
            <div className="musica-locodaves">
              <audio ref={musicaRef} loop>
                <source src="src/assets/Audio/15. Main Music 09.mp3" type="audio/mpeg" />
              </audio>
              <div className="controles">
                <button
                  onClick={() => {
                    if (!musicaRef.current) return;
                    if (musicaRef.current.paused) {
                      musicaRef.current.play();
                      setSonando(true);
                    } else {
                      musicaRef.current.pause();
                      setSonando(false);
                    }
                  }}
                >
                  <img
                    src={
                      sonando
                        ? "src/assets/img/HD_Sun_Shroom.webp"
                        : "src/assets/img/sunshroomapagado (1).png"
                    }
                    alt="Reproducir"
                    className="btn-musica-img"
                  />
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volumen}
                  onChange={(e) => {
                    const vol = parseFloat(e.target.value);
                    setVolumen(vol);
                    if (musicaRef.current) musicaRef.current.volume = vol;
                  }}
                />
              </div>
            </div>


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

            <div className="producto">
              <div className="imagen-hover">
                <img src="src/assets/plantas/girasol.png" alt="Girasol" className="img-principal" />
                <img src="https://images.unsplash.com/photo-1689067316514-4618c01c2e4c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8" alt="Girasol Alternativo" className="img-hover" />
              </div>
              <div className="info-producto">
                <h3>Girasol</h3>
                <p className="descripcion">Planta que necesita un monton de sol!!! resultando en que produzca flores muy brillantes.</p>
                <p>☀️ $2.500</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img src="src/assets/plantas/im-peashooter-ask-me-anything-v0-jo9i03as70je1.png" alt="Guisante" className="img-principal" />
                <img src="https://rkd.es/blog/wp-content/uploads/2021/08/Como-cultivar-guisantes-600x321.jpg" alt="Guisante Real" className="img-hover" />
              </div>
              <div className="info-producto">
                <h3>Guisantes</h3>
                <p className="descripcion">Planta vigorosa y fácil de cultivar, ideal para huertos urbanos. Florece en primavera.</p>
                <p>☀️ $5.000</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img src="src/assets/img/Nuez.webp" alt="Nuez" className="img-principal" />
                <img src="https://media.admagazine.com/photos/62286e22818965ae9b8974e8/master/w_1600%2Cc_limit/GettyImages-929200940.jpg" alt="Nuez Real" className="img-hover" />
              </div>
              <div className="info-producto">
                <h3>Nuez</h3>
                <p className="descripcion">Árbol robusto que produce nueces nutritivas, perfecto para climas templados.</p>
                <p>☀️ $5.000</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img src="src/assets/img/Cactus.webp" alt="Cactus" className="img-principal" />
                <img src="src/assets/img/saguaro-cacti-in-the-desert-imaginegolf.jpg" alt="Cactus Real" className="img-hover" />
              </div>
              <div className="info-producto">
                <h3>Cactus</h3>
                <p className="descripcion">Planta suculenta resistente y de bajo mantenimiento, ideal para decorar espacios con un toque natural y moderno.</p>
                <p>☀️ $1.500</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img src="src/assets/img/Plsnts_Carro%3FivoraHD.webp" alt="Planta carnivora" className="img-principal" />
                <img src="https://cloudfront-us-east-1.images.arcpublishing.com/infobae/L5SHHQWIN5AUJHUTFD7OM7U4SQ.jpg" alt="Carnivora Real" className="img-hover" />
              </div>
              <div className="info-producto">
                <h3>Planta Carnivora</h3>
                <p className="descripcion">Planta fascinante, atrapa insectos para obtener nutrientes, perfecta para amantes de la naturaleza exótica.</p>
                <p>☀️ $30.000</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img src="https://preview.redd.it/squash-pvz-v0-gamdf9o00f0d1.png?width=511&format=png&auto=webp&s=a632d48fef15fc8fc3658a2c291a34c3e414b9fb" alt="Calabaza" className="img-principal" />
                <img src="https://tb-static.uber.com/prod/image-proc/processed_images/207d19cb4f911e085ffeba8aa3c451e2/f9586c36ab7db84d09b777cee8c829b1.jpeg" alt="Calabaza Real" className="img-hover" />
              </div>
              <div className="info-producto">
                <h3>Calabaza</h3>
                <p className="descripcion">Planta trepadora que ofrece frutos grandes y nutritivos, ideal para jardines y recetas tradicionales.</p>
                <p>☀️ $3.500</p>
              </div>
            </div>

            <div class="producto">
              <div class="imagen-hover">
                <img src="src/assets/img/Hd_bonk.webp" alt="Cebollin" class="img-principal" />
                <img src="https://i0.wp.com/foodandwineespanol.com/wp-content/uploads/2024/07/Cebollin.webp?w=600&ssl=1" alt="Cebollin Real" class="img-hover" />
              </div>
              <div class="info-producto">
                <h3>Cebollin</h3>
                <p class="descripcion">Hierba aromática de sabor suave a cebolla, perfecta para realzar platos frescos y cocinar con estilo.</p>
                <p>☀️ $3.000</p>
              </div>
            </div>

            <div class="producto">
              <div class="imagen-hover">
                <img src="https://i.redd.it/what-cabbage-pult-design-do-you-like-more-v0-di1t41ofhp7f1.png?width=1200&format=png&auto=webp&s=67f9df2be7dc4b8ca43c52ba45778615873df961" alt="Repollo" class="img-principal" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Kalkar_-_Wei%C3%9Fkohl_01_ies.jpg" alt="Repollo Real" class="img-hover" />
              </div>
              <div class="info-producto">
                <h3>Repollo</h3>
                <p class="descripcion">Verdura crujiente y nutritiva, ideal para ensaladas frescas y guisos tradicionales.</p>
                <p>☀️ $4.500</p>
              </div>
            </div>

            <div class="producto">
              <div class="imagen-hover">
                <img src="https://i.pinimg.com/originals/a4/ca/46/a4ca4638b8ce9ec26bf6fed9410f3b65.png" alt="Sandia" class="img-principal" />
                <img src="https://huertafamiliar.cl/wp-content/uploads/2024/10/SANDIA-CRIMSON-SWEET-2-w.jpg" alt="Sandia Real" class="img-hover" />
              </div>
              <div class="info-producto">
                <h3>Sandia</h3>
                <p class="descripcion">Fruta refrescante y jugosa, perfecta para los días calurosos y como un dulce natural lleno de sabor.</p>
                <p>☀️ $6.000</p>
              </div>
            </div>

            <div class="producto">
              <div class="imagen-hover">
                <img src="src/assets/img/Cherry_Bomb.webp" alt="Cereza" class="img-principal" />
                <img src="https://cdn.blueberriesconsulting.com/2024/02/Exportacion-de-cerezas-chilenas-casi-se-triplica-en-enero-2024-Chinos-compran-el-93.jpg" alt="Cereza Real" class="img-hover" />
              </div>
              <div class="info-producto">
                <h3>Cereza</h3>
                <p class="descripcion">Pequeña fruta dulce y vibrante, ideal para disfrutar fresca o en postres deliciosos.</p>
                <p>☀️ $10.000</p>
              </div>
            </div>
            
          </div>
        </section>


        Ofertas 
        <section class="ofertas-section">
            <h2>Ofertas</h2>
            <div class="ofertas-container">
                <button class="btn-prev">&lt;</button>
                <div class="ofertas-carousel">
                    <div class="ofertas-track">
                        <div class="oferta-item">
                            <img src="https://i.pinimg.com/originals/6e/2c/7f/6e2c7f05abede7e66d5cd488506cb314.png" alt="Oferta 1" />
                            <div class="info-oferta">
                                <h4>Sun-shroom</h4>
                                <p class="oferta-descripcion">Pequeño hongo comestible de sombrero redondo y tallo corto.</p>
                                <p>☀️ $1.000</p>
                            </div>
                        </div>
                        <div class="oferta-item">
                            <img src="src/assets/img/PuffShroomPvZ1.webp" alt="Oferta 1" />
                            <div class="info-oferta">
                                <h4>Amanita</h4>
                                <p class="oferta-descripcion">Hongo de intenso color rojo con manchas blancas VENENOSO, perfecto para decoración o coleccionistas.</p>
                                <p>☀️ $500</p>
                            </div>
                        </div>
                        <div class="oferta-item">
                            <img src="src/assets/img/Scaredy-shroom.webp" alt="Oferta 1" />
                            <div class="info-oferta">
                              <h4>Cortinarius violaceus</h4>
                              <p class="oferta-descripcion">Hongo morado con manchas oscuras, visualmente único y decorativo, pero no comestible.</p>
                              <p>☀️ $790</p>
                            </div>
                        </div>
                        <div class="oferta-item">
                            <img src="src/assets/img/Doom-shroom-hd.webp" alt="Oferta 1" />
                            <div class="info-oferta">
                              <h4>Tylopilus alboater</h4>
                              <p class="oferta-descripcion">Hongo de sombrero negro aterciopelado, visualmente impactante y decorativo, pero no apto para consumo.</p>
                              <p>☀️ $1.000</p>
                            </div>
                        </div>
                        <div class="oferta-item">
                            <img src="src/assets/img/HumosetaHDPvz2.webp" alt="Oferta 1" />
                            <div class="info-oferta">
                              <h4>emperor webcap</h4>
                              <p class="oferta-descripcion">Hongo de gran tamaño con sombrero morado, decorativo y llamativo, pero no comestible.</p>
                              <p>☀️ $1.000</p>
                            </div>
                        </div>
                        <div class="oferta-item">
                            <img src="src/assets/img/SetaCongeladaHD.webp" alt="Oferta 1" />
                            <div class="info-oferta">
                              <h4>Clathrus archeri</h4>
                              <p class="oferta-descripcion">Hongo con tentáculos rojos que emergen de un "huevo", creando una apariencia única y llamativa.</p>
                              <p>☀️ $1.000</p>
                          </div>
                        </div>
                        <div class="oferta-item">
                            <img src="src/assets/img/ComepiedrasASS.webp" alt="Oferta 1" />
                            <div class="info-oferta">
                                  <h4>puffballs</h4>
                                  <p class="oferta-descripcion">Hongo redondo que libera esporas al tocarlo, decorativo y curioso, pero no comestible en estado salvaje.</p>
                                  <p>☀️ 1.000</p>
                              </div>
                          </div>
                          <div class="oferta-item">
                              <img src="src/assets/img/Hipnoseta_HD.webp" alt="Oferta 1" />
                              <div class="info-oferta">
                                  <h4>Purple Emperor</h4>
                                  <p class="oferta-descripcion">Hongo de sombrero morado brillante y tallo glutinoso, decorativo y llamativo, pero no comestible.</p>
                                  <p>☀️ 1.000</p>
                              </div>
                          </div>
                  </div>
                  </div>

                  <button class="btn-next">&gt;</button>
              </div>
        </section>

        
        <section id="Macetas">
          <h2>Maceteros Destacados</h2>
          <div className="productos-container">
            <div className="producto">
              <div className="imagen-hover">
                <img
                  src="src/assets/img/Maceta_hd_pvz2.webp"
                  alt="Maceta 1"
                  className="img-principal"
                />
                <img
                  src="https://huertosalma.cl/wp-content/uploads/2021/02/Macetero-Terracota-HUertos-Alma-600x559.png"
                  alt="Maceta 1 Alternativa"
                  className="img-hover"
                />
              </div>
              <div className="info-producto">
                <h3>Macetera</h3>
                <p className="descripcion">
                  Elegante maceta de terracota, perfecta para tus plantas favoritas.
                </p>
                <p>☀️ $3.000</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img
                  src="src/assets/img/Maceta_con_sol.webp"
                  height="20"
                  alt="Maceta 2"
                  className="img-principal"
                />
                <img
                  src="src/assets/img/Maceterorustico.png"
                  alt="Maceta 2 Alternativa"
                  className="img-hover"
                />
              </div>
              <div className="info-producto">
                <h3>Maceta Beige</h3>
                <p className="descripcion">
                  Ideal para decorar balcones y espacios altos con estilo.
                </p>
                <p>☀️ $4.500</p>
              </div>
            </div>

            <div className="producto">
              <div className="imagen-hover">
                <img
                  src="src/assets/img/pvz_2_china_flower_pot_nutriente__1_png_by_hugoofficiazd_dggq88w-pre.png"
                  alt="Maceta 3"
                  className="img-principal"
                />
                <img
                  src="src/assets/img/Maceteromoderno.png"
                  alt="Maceta 3 Alternativa"
                  className="img-hover"
                />
              </div>
              <div className="info-producto">
                <h3>Maceta Moderna</h3>
                <p className="descripcion">
                  Diseño minimalista y elegante, perfecto para interiores modernos.
                </p>
                <p>☀️ $5.000</p>
              </div>
            </div>
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

        <div className="custom-scrollbar">
          <div className="track"></div>
          <div className="thumb" id="thumb"></div>
        </div>
      </div>


    </>
  )
}

export default App