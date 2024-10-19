document.addEventListener('DOMContentLoaded', async () => {
    const episodeList = document.getElementById('episode-list');

    try {
        // Obtener los episodios de la API
        const response = await fetch('/episodes');
        if (!response.ok) throw new Error('Error al obtener los episodios');
        const episodes = await response.json();

        // Verificar si hay episodios en la base de datos
        if (episodes.length === 0) {
            episodeList.innerHTML = '<li>No hi ha episodis disponibles</li>';
            return;
        }

        // Mostrar los episodios en la lista
        episodes.forEach(episode => {
            const listItem = document.createElement('div');
            listItem.classList.add('video-item');
            listItem.innerHTML = `
                <img src="${episode.thumbnail}" alt="${episode.title} - Temporada ${episode.season}" class="video-thumbnail">
                <h4>${episode.title} (Temporada ${episode.season}, Episodi ${episode.episodeNumber})</h4>
                <video controls>
                    <source src="/videos/${encodeURIComponent(episode.filePath.replace(/\\/g, '/'))}" type="video/mp4">
                    El teu navegador no suporta la reproducció de vídeos.
                </video>
            `;
            episodeList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtenir els episodis:', error);
        episodeList.innerHTML = '<li>Error al carregar els episodis</li>';
    }
});