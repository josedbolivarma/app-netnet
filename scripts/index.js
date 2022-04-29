const d = document;
const $btnPlay = d.getElementById("btn-play");
const $linkSeries = d.getElementById("link-series");
const $linkMovies = d.getElementById("link-movies");
const $linkLista = d.getElementById("link-lista");

/* movie containers */
const $moviesRankingContainer = d.getElementById("moviesRanking"),
$animeSeriesContainer = d.getElementById("animeSeries"),
$SeriesEEUUContainer = d.getElementById("seriesEEUU");


async function getMovies(){
    try {
        const resp = await fetch("https://app-netnet.herokuapp.com/movies");
        const data = await resp.json();
        return data;
    }catch(err){
        console.error(err);
    }
}


    window.addEventListener("DOMContentLoaded", () => {
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

        $btnPlay.addEventListener("click", () => {
            const $video = document.querySelector(".videoBox");
            playVideo($video);
        });


    })

/* Función mostrar videos */
async function renderMovies(data, container) {
    if(data == undefined) {
        data = await getMovies();
    }
    console.log(container);

    if(!container) {
        container = $moviesRankingContainer;
    }

    console.log(container);

    data.forEach((movie) => {
        
        const {id, image, title} = movie;
        container.innerHTML += `
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
    const moviesRanking = data.filter((movie) => movie.category === "Popular");
    const animeSeries = data.filter((movie) => movie.category === "Anime");
    const seriesEEUU = data.filter((movie) => movie.category === "EEUU")
    renderMovies(moviesRanking, $moviesRankingContainer);
    renderMovies(animeSeries, $animeSeriesContainer);
    renderMovies(seriesEEUU, $SeriesEEUUContainer);
})

/*Ver pelicula*/
async function verVideo(id) {
    const data = await getMovies();
    const result = data.filter((movie) => movie.id === id);

    localStorage.setItem("video", JSON.stringify(result));
    console.log(result);
    window.location.href = "../pages/movieDetails.html";

}

/* links */

$linkSeries.addEventListener("click", async () => {
    localStorage.setItem("pelis", "EEUU");
    window.location = "pages/movies.html";
})

$linkMovies.addEventListener("click", async () => {
    localStorage.setItem("pelis", "Popular");
    window.location = "pages/movies.html";
})

$linkLista.addEventListener("click", () => {
    window.location = "/";
})