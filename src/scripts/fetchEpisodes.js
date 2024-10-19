async function fetchEpisodes() {
    try {
        const response = await fetch('http://localhost:3000/episodes'); // Cambia a tu URL
        if (!response.ok) {
            throw new Error('Error al obtener los episodios');
        }
        const episodes = await response.json();
        const movieList = document.getElementById('movie-list');

        episodes.forEach(episode => {
            const li = document.createElement('li');
            li.textContent = `${episode.title} (${episode.year}) - ${episode.filePath}`;
            movieList.appendChild(li);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Llama a la función para cargar los episodios al inicio
fetchEpisodes();
