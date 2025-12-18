import { useEffect } from "react";

export default function useScripts() {
  useEffect(() => {
    const contenido = document.querySelector('.scroll-container');
    const thumb = document.querySelector('.thumb');
    const track = document.querySelector('.track');

    if (contenido && thumb && track) {
      const updateThumb = () => {
        const scrollHeight = contenido.scrollHeight - contenido.clientHeight;
        const trackHeight = track.clientHeight - thumb.offsetHeight;
        const ratio = contenido.scrollTop / scrollHeight;
        thumb.style.top = `${ratio * trackHeight}px`;
      };

    
      contenido.addEventListener('scroll', updateThumb);
      window.addEventListener('resize', updateThumb);

      // --- Drag del thumb (arrastrar el sol)
      let isDragging = false;
      let startY = 0;
      let startTop = 0;

      thumb.addEventListener('mousedown', (e) => {
        isDragging = true;
        startY = e.clientY;
        startTop = parseFloat(thumb.style.top || 0);
        thumb.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
      });

      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaY = e.clientY - startY;
        const trackHeight = track.clientHeight - thumb.offsetHeight;
        let newTop = Math.max(0, Math.min(trackHeight, startTop + deltaY));
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

      updateThumb();
    }

  }, []);
}
