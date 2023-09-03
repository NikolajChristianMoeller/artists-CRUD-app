import { prepareData } from "./helpers.js";

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
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
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: json,
  });
  return response;
}

//  Updates an existing artist
async function updateArtist(name, image, birthDate, activeSince, genres, labels, website, shortDescription) {
  // artist object we update
  const artistToUpdate = {
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
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "PUT",
    body: json,
    headers: { "Content-Type": "application/json" },
  });
  // Checks if response is ok - if the response is successful
  return response;
}

async function deleteArtist(artistObject) {
  const id = artistObject.id;
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });
  return response;
}

export { getArtists, createArtist, updateArtist, deleteArtist };