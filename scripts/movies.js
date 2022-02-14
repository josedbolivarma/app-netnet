const d = document;
const pelisLocalStorage = localStorage.getItem('pelis');
const $movies = d.getElementById("movies");
const $rep = d.getElementById("rep");
const $btnPlay = d.getElementById("btn-play");
const $moviesTitle = d.getElementById("movies-title");
const $btnIconInicio = d.getElementById("btn-icon-inicio");

//links
const $linkSeries = d.getElementById("link-series");
const $linkMovies = d.getElementById("link-movies");
const $linkLista = d.getElementById("link-lista");

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
    const data = await getMovies();
    const movies = data.filter((movie) => movie.category === pelisLocalStorage);
    console.log(movies, "movies");

    const { id, video, image, title, category } = movies; 
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
    
  //  $title.textContent = `${title} - NetNet`;
    $rep.innerHTML = `
    <video class="videoBox" height="500px" src="${video}" poster="${image}" controls></video>
    `
    $btnPlay.addEventListener("click", () => {
        const $video = document.querySelector(".videoBox");
        playVideo($video);
    });

})

/*Ver pelicula*/
async function verVideo(id) {
    const data = await getMovies();
    const result = data.filter((movie) => movie.id === id);

    localStorage.setItem("video", JSON.stringify(result));
    console.log(result);
    window.location.href = "../pages/movieDetails.html";

}

/* render movies */
async function renderMovies(data) {
    if(data == undefined) {
        data = await getMovies();
    }

    const { category } = data[0];

    $moviesTitle.textContent = category;


    data.forEach((movie) => {
        
        const {id, image, title} = movie;
        $movies.innerHTML += `
    <div class="movies-item" onclick="verVideo(${id})">
        <a href="#">
            <img src="${image}" alt="${title}">
        </a>
    </div>
        `
    });
}

window.addEventListener("DOMContentLoaded", async () => {
    const data = await getMovies();
    const pelis = data.filter((movie) => movie.category === pelisLocalStorage);
    renderMovies(pelis);
})

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