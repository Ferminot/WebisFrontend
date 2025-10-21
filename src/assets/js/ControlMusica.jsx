export default function ControlMusica({ sonando, setSonando, volumen, setVolumen }) {
  return (
    <div className="control-musica">
      <button
        onClick={() => {
          const audio = document.getElementById("musica-global");
          if (!audio) return;
          if (audio.paused) {
            audio.play();
            setSonando(true);
          } else {
            audio.pause();
            setSonando(false);
          }
        }}
      >
        {sonando ? "⏸️" : "▶️"}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volumen}
        onChange={(e) => setVolumen(parseFloat(e.target.value))}
      />
    </div>
  );
}
