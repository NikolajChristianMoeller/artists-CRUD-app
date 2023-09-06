import { artists, updateArtistsGrid, patchArtist } from "./crudFrondtend.js";

export function addArtistsToFavorits(event, artist) {
  artist.favorites = event.target.checked;
  patchArtist(artist);
  console.log(artists);
}

export function shwowFavorits() {
  const checkbox = document.querySelector("#filter-fav").checked;
  if (checkbox === true) {
    const filteredArtists = artists.slice().filter(artist => artist.favorites === true);
    displayFavorits(filteredArtists);
  } else {
    updateArtistsGrid();
  }
}

function displayFavorits(filteredArtists) {
  document.querySelector("#artists-grid").innerHTML = "";
  for (const artist of filteredArtists) {
    document.querySelector("#artists-grid").insertAdjacentHTML(
      "beforeend",
      /*html*/ `
            <article>
                <img src="${artist.image}">
                <h2>${artist.name}</h2>
                <p>birthdate: ${artist.birthdate}</p>
                <p>activeSince: ${artist.activeSince}</p>
                <p>genres: ${artist.genres}</p>
                <p>labels: ${artist.labels}</p>
                <p>website: ${artist.website}</p>
                <p>roles: ${artist.roles}</p>
                <p>short description: ${artist.shortDescription}</p>
                 <div class="btns">
                    <label for="favorites-create-chechbox">add to favorit artists?</label>
                    <input type="checkbox" name="favorites" class="favorites-create-chechbox" ${artist.favorites ? "checked" : ""}>
                </div>
            </article>
            `
    );
    document
      .querySelector("#artists-grid article:last-child .favorites-create-chechbox")
      .addEventListener("click", event => addArtistsToFavorits(event, artist));
  }
}
