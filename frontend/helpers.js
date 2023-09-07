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

function filter(inputValue) {
  let filteredList;
  if (inputValue !== "filterall") {
    if (inputValue === "Pop") {
      filteredList = artistList.filter(artist => artist.genres.includes(inputValue));
    } else if (inputValue === "Hip Hop") {
      filteredList = artistList.filter(artist => artist.genres.includes(inputValue));
    } else if (inputValue === "R&B") {
      filteredList = artistList.filter(artist => artist.genres.includes(inputValue));
    } else if (inputValue === "Dance") {
      filteredList = artistList.filter(artist => artist.genres.includes(inputValue));
    }
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return artistList;
  }
}


function filterFavorite(inputValue) {
  let filteredList;
  if (inputValue !== "filterall") {
    if (inputValue === "favorite") {
      filteredList = artistList.filter(artist => artist.favorite === true);
    }
    if (filteredList.length !== 0) {
      return filteredList;
    } else return (filteredList = []);
  } else {
    return artistList;
  }
}

export { filter, filterFavorite, sortByOption, searchByName };