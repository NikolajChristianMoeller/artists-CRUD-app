import { artistList } from "./frontApp.js";

function searchByName(searchValue) {
  searchValue = searchValue.toLowerCase().trim();
  return artistList.filter(checkNames);

  function checkNames(artist) {
    return artist.name.toLowerCase().includes(searchValue);
  }
}

function sortByOption(sortValue) {
  if (sortValue === "name") {
    return artistList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "birthDate") {
    return artistList.sort((a, b) => a.birthDate.localeCompare(b.birthDate));
  } else if (sortValue === "website") {
    return artistList.sort((a, b) => a.website.localeCompare(b.website));
  } 
}

// function filterByRace(inputValue) {
//   inputValue = inputValue.toLowerCase();
//   if (inputValue !== "filterall") {
//     let filteredList = artistList.filter(artist => artist.race.toLowerCase().includes(inputValue));
//     if (filteredList.length !== 0) {
//       return filteredList;
//     } else {
//       return (filteredList = []);
//     }
//   } else {
//     return artistList;
//   }
// }


// function filteredArtistList() {
//   const checkbox = document.querySelector("#filter-fav").checked;
//   console.log(checkbox);
//   if (checkbox === false) {
//     const filteredList = artists.slice().filter(artist => artist.published === true);
//     showArtistsFiltered(filteredList);
//   } else {
//     showArtists();
//   }
// }

function showArtistsFiltered(filteredArtist) {
  document.querySelector("#form-create-artist").innerHTML = "";
  for (const artistList of filteredArtist) {
    const html = /*html*/ `
        <article>
            <img src=${post.image} alt="post.caption" />
            <h2>${post.caption}</h2>
            <p>Likes: ${post.likes}</p>
        </article>
        `;
    document.querySelector("#form-create-artist").insertAdjacentHTML("beforeend", html);
  }
}



// export prepareData
export { sortByOption, searchByName };