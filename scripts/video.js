const videoA = JSON.parse(localStorage.getItem('video'));
const rep = document.getElementById('repVideo');
const $title = document.getElementById('titleH');
const sugerencias = document.getElementById('contSugerencias');
const $btnPlay = document.getElementById("btn-play");

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
    const { id, image, title, video} = videoA[0];
   
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
    <video class="videoBox" height="500px" src="${video}" poster="${image}" controls></video>
    `
    $btnPlay.addEventListener("click", () => {
        const $video = document.querySelector(".videoBox");
        playVideo($video);
    });
   
    const data = await getMovies();
    const sug = data.filter((video)=> video.id !== id);

    sug.forEach((valor)=> {
        const { title, image } = valor;

        sugerencias.innerHTML += `
        <div class="movies-item">
        <a href="#">
            <img src="${image}" alt="${title}">
        </a>
        </div>
        `
    })
})

