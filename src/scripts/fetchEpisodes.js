document.addEventListener('DOMContentLoaded', async () => {
    const movieList = document.getElementById('movie-list');

    try {
        // Obtener los episodios de la API
        const response = await fetch('/episodes');
        const episodes = await response.json();

        // Verificar si hay episodios en la base de datos
        if (episodes.length === 0) {
            movieList.innerHTML = '<li>No hay episodios disponibles</li>';
            return;
        }

        // Mostrar los episodios en la lista
        episodes.forEach(episode => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h4>${episode.title} (Temporada ${episode.season}, Episodio ${episode.episodeNumber})</h4>
                <video width="320" height="240" controls>
                    <source src="/videos/${encodeURIComponent(episode.filePath.split('\\').pop())}" type="video/mp4">
                    Tu navegador no soporta la reproducción de videos.
                </video>
            `;
            movieList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error al obtener los episodios:', error);
        movieList.innerHTML = '<li>Error al cargar los episodios</li>';
    }
});
