const d = document;
const videoA = JSON.parse(localStorage.getItem('video'));
const rep = document.getElementById('repVideo');
const $title = document.getElementById('titleH');
const sugerencias = document.getElementById('contSugerencias');
const $btnPlay = document.getElementById("btn-play");
const $btnIconInicio = d.getElementById("btn-icon-inicio");

//links
const $linkSeries = d.getElementById("link-series");
const $linkMovies = d.getElementById("link-movies");
const $linkLista = d.getElementById("link-lista");

//containers
const $freaturedTitle = d.getElementById("freatured-title");
const $freaturedTextContainer = d.getElementById("freatured-text");
const $freaturedDetailsContainer = d.getElementById("freatured-details");

async function getMovies (){
    try {
        const resp = await fetch('http://localhost:3000/movies');
        const data = await resp.json()
        return data
    }catch (error){
        return console.log(error);
    }
}

window.addEventListener('DOMContentLoaded', async ()=> {
    const { id, image, title, video, description, date, actors, publisher, poster} = videoA[0];
   
    let bandera = false;
 
    const playVideo = (movieVideo) => {
        if(bandera === false) {
            movieVideo.play();
            bandera = true;
        } else {
            movieVideo.pause();
            bandera = false;
        }
        return;
    }
    
    $title.textContent = `${title} - NetNet`;
    rep.innerHTML = `
    <video class="videoBox" height="500px" src="${video}" poster="${poster}" controls></video>
    `;

    $freaturedTitle.textContent = title;

    $freaturedTextContainer.innerHTML = `
    <p>${description}</p>
    <div class="freatured-text-details">
        <p>Elenco: <span>${actors}... más</span></p>
        <p>Dirigido por: <span>${publisher}</span></p>
    </div>
    `;

    $freaturedDetailsContainer.innerHTML = `
        <p>99% de coincidencia</p>
        <div>
            <span>${date} <i>R</i></span>
        </div>
            <span>2h 18m <i>HD</i></span>
    `;


    $btnPlay.addEventListener("click", () => {
        const $video = document.querySelector(".videoBox");
        playVideo($video);
    });
   
    const data = await getMovies();
    const sug = data.filter((video)=> video.id !== id);

    sug.forEach((valor)=> {
        const { id, title, image } = valor;

        sugerencias.innerHTML += `
        <div class="movies-item" onclick="verVideo(${id})">
        <a href="#">
            <img src="${image}" alt="${title}">
        </a>
        </div>
        `
    })
})

/*Ver pelicula*/
async function verVideo(id) {
    const data = await getMovies();
    const result = data.filter((movie) => movie.id === id);

    localStorage.setItem("video", JSON.stringify(result));
    console.log(result);
    window.location.href = "../pages/movieDetails.html";

}

/* btn-links */

$btnIconInicio.addEventListener("click", () => {
    window.location = "/";
})

/* links */

$linkSeries.addEventListener("click", async () => {
    localStorage.setItem("pelis", "EEUU");
    window.location = "movies.html";
})

$linkMovies.addEventListener("click", async () => {
    localStorage.setItem("pelis", "Popular");
    window.location = "movies.html";
})

$linkLista.addEventListener("click", () => {
    window.location = "/";
})