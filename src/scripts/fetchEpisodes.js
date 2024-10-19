fetch('/episodes')
    .then(response => response.json())
    .then(episodes => {
        const episodeList = document.getElementById('episode-list');
        episodes.forEach(episode => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${episode.title}</h3>
                <video controls>
                    <source src="/videos/${episode.videoPath}" type="video/mp4">
                    Tu navegador no soporta la etiqueta de video.
                </video>
                <p>${episode.description}</p>
            `;
            episodeList.appendChild(li);
        });
    });
