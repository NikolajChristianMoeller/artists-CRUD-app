import { favoriteArtist, getArtists, createArtist, updateArtist, deleteArtist } from "./rest-service.js";
import { filter, filterFavorite, sortByOption, searchByName } from "./helpers.js";

let artistList;

window.addEventListener("load", initApp);

function initApp() {
  // Load and display the initial artist data
  updateArtistsGrid();

  // Add event listeners to various elements
  document.querySelector("#btn-create-artist").addEventListener("click", showCreateArtistDialog);
  document.querySelector("#form-create-artist").addEventListener("submit", createArtistClicked);
  document.querySelector("#form-update-artist .btn-cancel").addEventListener("click", cancelUpdate);
  document.querySelector("#form-create-artist .btn-cancel").addEventListener("click", cancelCreate);
  document.querySelector("#form-update-artist").addEventListener("submit", updateArtistClicked);
  document.querySelector("#sortbyselect").addEventListener("change", event => showArtists(sortByOption(event.target.value)));
  document.querySelector("#input-search").addEventListener("keyup", event => showArtists(searchByName(event.target.value)));
  document.querySelector("#input-search").addEventListener("search", event => showArtists(searchByName(event.target.value)));
  document.querySelector("#filter").addEventListener("change", event => showArtists(filter(event.target.value)));
  document.querySelector("#filterFavorite").addEventListener("change", event => showArtists(filterFavorite(event.target.value)));
}

// Function to cancel the creation of a new artist
function cancelCreate(event) {
  event.preventDefault();
  document.querySelector("#dialog-create-artist").close();
}

// Function to cancel the update of an existing artist
function cancelUpdate(event) {
  event.preventDefault();
  console.log("Cancel update button clicked!");
  document.querySelector("#dialog-update-artist").close();
}

// Function to populate the update form with artist data
function updateClicked(artistObject) {

  const updateForm = document.querySelector("#form-update-artist");

  updateForm.name.value = artistObject.name;
  updateForm.image.value = artistObject.image;
  updateForm.birthDate.value = artistObject.birthDate;
  updateForm.activeSince.value = artistObject.activeSince;
  updateForm.genres.value = artistObject.genres;
  updateForm.labels.value = artistObject.labels;
  updateForm.website.value = artistObject.website;
  updateForm.shortDescription.value = artistObject.shortDescription;

  updateForm.setAttribute("data-id", artistObject.id);

  // Show the update form
  document.querySelector("#dialog-update-artist").showModal();

  console.log("Update button clicked!");
}

// Function to handle the creation of a new artist
async function createArtistClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-create-artist");
  const name = form.name.value;
  const image = form.image.value;
  const birthDate = form.birthDate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;

  const response = await createArtist(name, image, birthDate, activeSince, genres, labels, website, shortDescription);

  if (response.ok) {
    // Close the create artist dialog, update the artist grid, and reset the form
    document.querySelector("#dialog-create-artist").close();
    updateArtistsGrid();
    form.reset();
    hideErrorMessage();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Something went wrong. Please try again");
  }
}

// Function to handle the update of an existing artist
async function updateArtistClicked(event) {
  event.preventDefault();
  const form = document.querySelector("#form-update-artist");
  const name = form.name.value;
  const image = form.image.value;
  const birthDate = form.birthDate.value;
  const activeSince = form.activeSince.value;
  const genres = form.genres.value;
  const labels = form.labels.value;
  const website = form.website.value;
  const shortDescription = form.shortDescription.value;
  const id = form.getAttribute("data-id");

  // Send a request to update the artist
  const response = await updateArtist(id, name, image, birthDate, activeSince, genres, labels, website, shortDescription);

  if (response.ok) {
    // Close the update artist dialog and update the artist grid
    document.querySelector("#dialog-update-artist").close();
    updateArtistsGrid();
  } else {
    console.log(response.status, response.statusText);
    showErrorMessage("Something went wrong. Please try again");
    event.target.parentNode.close();
  }
}

// Function to handle the deletion of an artist
function deleteArtistClicked(artistObject) {
  console.log(artistObject);
  document.querySelector("#dialog-delete-artist-title").textContent = artistObject.name;
  document.querySelector("#dialog-delete-artist").showModal();
  document.querySelector("#form-delete-artist").addEventListener("submit", () => deleteArtistConfirm(artistObject));
  document.querySelector("#cancelDelete").addEventListener("click", event => cancelDeleteArtist(event));
}

// Function to cancel the deletion of an artist
function cancelDeleteArtist(event) {
  event.preventDefault();
  document.querySelector("#dialog-delete-artist").close();
}

// Function to confirm the deletion of an artist
async function deleteArtistConfirm(artistObject) {
  const response = await deleteArtist(artistObject);

  if (response.ok) {
    updateArtistsGrid();
    showDeleteFeedback();
  } else {
    document.querySelector("#dialog-failed-to-update").showModal();
  }
}

// Function to show a feedback dialog for successful deletion
function showDeleteFeedback() {
  const dialog = document.getElementById("dialog-delete-feedback");
  const dialogMessage = document.getElementById("dialog-delete-feedback-message");
  dialogMessage.textContent;
  dialog.showModal();
  setTimeout(closeDialog, 1000);

  function closeDialog() {
    dialog.close();
  }
}

// Function to show the create artist dialog
function showCreateArtistDialog() {
  document.querySelector("#dialog-create-artist").showModal();
  console.log("Create New artist button clicked!");
}

// Function to update the artist grid by fetching artist data from the server
async function updateArtistsGrid() {
  artistList = await getArtists();
  showArtists(artistList);
}

// Function to display a list of artists in the grid
function showArtists(artistList) {
  document.querySelector("#artists").innerHTML = "";
  if (artistList.length !== 0) {
    for (const artist of artistList) {
      showArtist(artist);
    }
  } else {
    document.querySelector("#artists").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
    <h2 id="search-error-msg"> No artists were found. Please try again.</h2>
    `
    );
  }
}

// Function to display an individual artist in the grid
function showArtist(artistObject) {
  const html = /*html*/ `
        <article class="grid-item">
        <div class="clickable">    
            <img src="${artistObject.image}" />
            <h3><b>${artistObject.name}</b></h3>
        </div>
            <div class="btns">
                <button class="btn-delete">Delete</button>
                <button class="btn-update">Update</button>
                <button class="btn-favorite">Favorite</button>
            </div>
        </article>
    `;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
  document.querySelector("#artists article:last-child .clickable").addEventListener("click", () => {
    showArtistModal(artistObject);
  });
  document.querySelector("#artists article:last-child .btn-delete").addEventListener("click", () => deleteArtistClicked(artistObject));
  document.querySelector("#artists article:last-child .btn-update").addEventListener("click", () => updateClicked(artistObject));
  document.querySelector("#artists article:last-child .btn-favorite").addEventListener("click", () => favoriteClicked(artistObject));
}

// Function to handle marking an artist as a favorite
async function favoriteClicked(artistObject) {
  const response = await favoriteArtist(artistObject);

  if (response.ok) {
    updateArtistsGrid();
  } else {
    console.log(response.status, response.statusText);
  }
}

// Function to show an artist's details in a modal window
function showArtistModal(artistObject) {
  const modal = document.querySelector("#artist-modal");
  modal.querySelector("#artist-image").src = artistObject.image;
  modal.querySelector("#artist-name").textContent = artistObject.name;
  modal.querySelector("#artist-birth").textContent = artistObject.artistBirth;
  modal.querySelector("#artist-active-since").textContent = artistObject.activeSince;
  modal.querySelector("#artist-genres").textContent = artistObject.genres;
  modal.querySelector("#artist-labels").textContent = artistObject.labels;
  modal.querySelector("#artist-website").textContent = artistObject.website;
  modal.querySelector("#artist-description").textContent = artistObject.shortDescription;
  modal.showModal();
  modal.querySelector("button").addEventListener("click", () => {
    modal.close();
  });
}

// Function to show an error message
function showErrorMessage(message) {
  document.querySelector(".error-message").textContent = message;
  document.querySelector(".error-message").classList.remove("hide");
}

// Function to hide the error message
function hideErrorMessage() {
  document.querySelector(".error-message").textContent = "";
  document.querySelector(".error-message").classList.add("hide");
}

export { artistList };