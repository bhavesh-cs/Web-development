const API_KEY = "55bc720";
const BASE_URL = "https://www.omdbapi.com/";

const moviesContainer = document.getElementById("movies");
const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const modal = document.getElementById("movie-modal");
const movieDetails = document.getElementById("movie-details");
const closeModal = document.getElementById("close-modal");
const loading = document.getElementById("loading");
const categoryButtons = document.querySelectorAll(".category-btn");

async function searchMovies(movieName) {

    loading.style.display = "flex";

    moviesContainer.innerHTML = "";    

    const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&s=${movieName}`
    );

    const data = await response.json();
    loading.style.display = "none";
    console.log(data);

    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        moviesContainer.innerHTML = `
            <h2>No movies found!</h2>
        `;
    }

}

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    movies.forEach(movie => {
        console.log(movie.Title, movie.Poster);

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.addEventListener("click", () => {
            getMovieDetails(movie.imdbID);
        });
        const poster =
            movie.Poster !== "N/A"
                ? movie.Poster
                : "https://placehold.co/300x450?text=No+Poster";

                
        movieCard.innerHTML = `
            <img src="${poster}" alt="${movie.Title}"
            onerror="this.src='https://dummyimage.com/300x450/1f2937/ffffff&text=No+Poster';">
            <div class="movie-info">
                <h2>${movie.Title}</h2>
                <p>📅 ${movie.Year}</p>
                <p>🎬 ${movie.Type}</p>
            </div>
        `;

        moviesContainer.appendChild(movieCard);

    });

}


searchBtn.addEventListener("click", () => {
    const movieName = searchInput.value.trim();
    if (movieName !== "") {
        searchMovies(movieName);
    }
});

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function getMovieDetails(imdbID){
    const response = await fetch(
        `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`
    );

    const movie = await response.json();

      movieDetails.innerHTML = `
        <div class="details-container">
          <div class="details-left">
        <img src="${movie.Poster}" alt="${movie.Title}"
        onerror="this.src='https://dummyimage.com/300x450/1f2937/ffffff&text=No+Poster'">
    </div>

    <div class="details-right">
        <h2>${movie.Title}</h2>
        <div class="rating">
            ⭐ ${movie.imdbRating}
        </div>
         <div class="genre">
            ${movie.Genre}
         </div>
         <p><strong>📅 Year:</strong> ${movie.Year}</p>
         <p><strong>🎬 Director:</strong> ${movie.Director}</p>
         <p><strong>👨 Actors:</strong> ${movie.Actors}</p>
         <p><strong>⏱ Runtime:</strong> ${movie.Runtime}</p>
         <p><strong>🌍 Language:</strong> ${movie.Language}</p>
         <p class="plot">
            ${movie.Plot}
         </p>
       </div>
    </div>
    `;
    modal.style.display = "flex";
    console.log(movie);
}

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active class to clicked button
        button.classList.add("active");

        // Read the search term from HTML
        const searchTerm = button.dataset.search;

        // Put it into the search box
        searchInput.value = searchTerm;

        // Search movies
        searchMovies(searchTerm);

    });

});

searchMovies("Avengers");