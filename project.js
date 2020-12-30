const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



// Loading all events
eventListeners();
function eventListeners() {
    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
    });

    cardBody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);
}
function addFilm(event) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // Error
        UI.displayMessages("Tüm alanları doldurunuz..", "danger");
    }
    else {
        // New Film
        const newFilm = new Film(title, director, url);

        UI.addFilmToUI(newFilm); // Adding Movies to the Interface
        Storage.addFilmToStorage(newFilm); // Adding Movies to Storage
        UI.displayMessages("Film başarıyla eklendi..", "success")
    }

    UI.clearInput(titleElement, directorElement, urlElement);

    event.preventDefault();
}

function deleteFilm(event) {
    if (event.target.id === "delete-film") {
        UI.deleteFilmFromUI(event.target);
        Storage.deleteFilmFromStorage(event.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        UI.displayMessages("Silme işlemi başarılı", "success");
    }
}

function clearAllFilms() {
    if (confirm("Emin misiniz ?")) {
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
}
