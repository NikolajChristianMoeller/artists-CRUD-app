import { artistList } from "./frontApp.js";

// Function to search for artists by name
function searchByName(searchValue) {
  // Convert the search input to lowercase and trim any leading/trailing whitespace
  searchValue = searchValue.toLowerCase().trim();
  return artistList.filter(checkNames);

  // Helper function to check if an artist's name includes the searchValue
  function checkNames(artist) {
    return artist.name.toLowerCase().includes(searchValue);
  }
}

// Function to sort artists based on a specified option (e.g., name, birthDate, website)
function sortByOption(sortValue) {
  if (sortValue === "name") {
    return artistList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "birthDate") {
    return artistList.sort((a, b) => a.birthDate.localeCompare(b.birthDate));
  } else if (sortValue === "website") {
    return artistList.sort((a, b) => a.website.localeCompare(b.website));
  }
}

// Function to filter artists based on a specified genre (inputValue)
function filter(inputValue) {
  let filteredList;
  if (inputValue !== "filterall") {
    filteredList = artistList.filter(artist => artist.genres.includes(inputValue));
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return artistList;
  }
}

// Function to filter artists based on whether they are marked as favorites
function filterFavorite(inputValue) {
  let filteredList;
  if (inputValue !== "filterall") {
    if (inputValue === "favorite") {
      filteredList = artistList.filter(artist => artist.favorite === true);
    }

    // Check if any favorite artists are found
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return artistList;
  }
}

export { filter, filterFavorite, sortByOption, searchByName };