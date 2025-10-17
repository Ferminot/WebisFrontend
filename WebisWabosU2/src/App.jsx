import './App.css'
import './assets/css/estilos.css'

function App() {
  return (
    <>
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
            <audio id="musica" loop>
              <source src="src/assets/Audio/15. Main Music 09.mp3" type="audio/mpeg" />
            </audio>
            <div className="controles">
              <button id="btn-musica">
                <img 
                  id="icono-musica" 
                  src="src/assets/img/sunshroomapagado (1).png" 
                  alt="Reproducir" 
                  className="btn-musica-img" 
                />
              </button>
              <input type="range" id="volumen" min="0" max="1" step="0.01" defaultValue="1" />
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
              <img src="https://static.wikia.nocookie.net/zomburbia-defenders/images/a/a6/Cactus.png/revision/latest?cb=20250804204758&path-prefix=es" alt="Cactus" className="img-principal" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Carnegiea_gigantea_in_Saguaro_National_Park_near_Tucson_Arizona_during_November_%2858%29.jpg" alt="Cactus Real" className="img-hover" />
            </div>
            <div className="info-producto">
              <h3>Cactus</h3>
              <p className="descripcion">Planta suculenta resistente y de bajo mantenimiento, ideal para decorar espacios con un toque natural y moderno.</p>
              <p>☀️ $1.500</p>
            </div>
          </div>

          <div className="producto">
            <div className="imagen-hover">
              <img src="https://static.wikia.nocookie.net/plantsvszombies/images/3/32/Plsnts_Carro%C3%B1ivoraHD.png/revision/latest?cb=20160114205513&path-prefix=es" alt="Planta carnivora" className="img-principal" />
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

          {/* Puedes continuar con los demás productos siguiendo el mismo patrón */}
          
        </div>
      </section>


    </>
  )
}

export default App