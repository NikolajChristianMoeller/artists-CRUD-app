import { artistList } from "./script.js";

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
  } else if (sortValue === "title") {
    return artistList.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortValue === "race") {
    return artistList.sort((a, b) => a.race.localeCompare(b.race));
  }
}

function filterByRace(inputValue) {
  inputValue = inputValue.toLowerCase();
  if (inputValue !== "filterall") {
    let filteredList = artistList.filter(artist => artist.race.toLowerCase().includes(inputValue));
    if (filteredList.length !== 0) {
      return filteredList;
    } else {
      return (filteredList = []);
    }
  } else {
    return artistList;
  }
}

function prepareData(dataObject) {
  const artistArray = [];
  for (const key in dataObject) {
    const artistObject = dataObject[key];
    artistObject.id = key;
    artistArray.push(artistObject);
  }
  console.log(artistArray);
  return artistArray;
}

export { prepareData, filterByRace, sortByOption, searchByName };