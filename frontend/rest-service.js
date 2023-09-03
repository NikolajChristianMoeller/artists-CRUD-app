import { prepareData } from "./helpers.js";

const endpoint = "/backend/data/artists.json";

async function getArtists() {
  const response = await fetch(`${endpoint}/artists.json`);
  const data = await response.json();
  return prepareData(data);
}

async function createArtist(id, name, image, birthDate, activeSince, genres, labels, website, shortDescription) {
  const newArtist = {
    id: id,
    name: name,
    image: image,
    birthDate: birthDate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    shortDescription: shortDescription,
  };
  console.log(newArtist);
  const json = JSON.stringify(newArtist);
  const response = await fetch(`${endpoint}/artists.json`, {
    method: "POST",
    body: json,
  });
  return response;
}

//  Updates an existing artist
async function updateArtist(id, name, image, birthDate, activeSince, genres, labels, website, shortDescription) {
  // artist object we update
  const artistToUpdate = {
    id: id,
    name: name,
    image: image,
    birthDate: birthDate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    shortDescription: shortDescription,
  };
  // Converts the JS object to JSON string
  const json = JSON.stringify(artistToUpdate);
  // PUT fetch request with JSON in the body. Calls the specific element in resource
  const response = await fetch(`${endpoint}/artists/${id}.json`, {
    method: "PUT",
    body: json,
  });
  // Checks if response is ok - if the response is successful
  return response;
}

async function deleteArtist(artistObject) {
  const id = artistObject.id;
  const response = await fetch(`${endpoint}/artists/${id}.json`, {
    method: "DELETE",
  });
  return response;
}

export { getArtists, createArtist, updateArtist, deleteArtist };