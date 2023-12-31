import { artists, updateArtistsGrid, patchArtist } from "./frontApp.js";

// Function to add or remove an artist from favorites
export function addArtistsToFavorites(event, artist) {
  artist.favorites = event.target.checked;
  patchArtist(artist);
  console.log(artists);
}

// Function to display favorite artists or reset to all artists
export function showFavorites() {
  const checkbox = document.querySelector("#filter-fav").checked;

  if (checkbox === true) {
    const filteredArtists = artists.slice().filter(artist => artist.favorites === true);

    displayFavorites(filteredArtists);
  } else {
    updateArtistsGrid();
  }
}

// Function to display a list of favorite artists
function displayFavorites(filteredArtists) {
  // Clear the contents of the artist grid
  document.querySelector("#artists-grid").innerHTML = "";

  // Loop through each filtered artist and display their information
  for (const artist of filteredArtists) {
    document.querySelector("#artists-grid").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
        <article>
          <img src="${artist.image}">
          <h2>${artist.name}</h2>
          <p>Birthdate: ${artist.birthDate}</p>
          <p>Active Since: ${artist.activeSince}</p>
          <p>Genres: ${artist.genres}</p>
          <p>Labels: ${artist.labels}</p>
          <p>Website: ${artist.website}</p>
          <p>Short Description: ${artist.shortDescription}</p>
          <div class="btns">
            <label for="favorites-create-chechbox">Add to favorite artists?</label>
            <input type="checkbox" name="favorites" class="favorites-create-checkbox" ${artist.favorites ? "checked" : ""}>
          </div>
        </article>
      `
    );

    // Add an event listener to the checkbox to handle adding/removing from favorites
    document
      .querySelector("#artists-grid article:last-child .favorites-create-checkbox")
      .addEventListener("click", event => addArtistsToFavorites(event, artist));
  }
}
