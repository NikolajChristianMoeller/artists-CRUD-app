const endpoint = "http://localhost:3000";

// Function to retrieve a list of artists from the server
async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
}

// Function to create a new artist on the server
async function createArtist(name, image, birthDate, activeSince, genres, labels, website, shortDescription) {
  // Create a new artist object with the provided information
  const newArtist = {
    name: name,
    image: image,
    birthDate: birthDate,
    activeSince: activeSince,
    genres: genres,
    labels: labels,
    website: website,
    shortDescription: shortDescription,
  };

  // Convert the artist object to a JSON string
  const json = JSON.stringify(newArtist);

  // Send a POST request to create the new artist on the server
  const response = await fetch(`${endpoint}/artists`, {
    method: "POST",
    body: json,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
}

// Function to update an existing artist on the server
async function updateArtist(id, name, image, birthDate, activeSince, genres, labels, website, shortDescription) {
  // Create an artist object with the provided information and the artist's ID
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

  // Convert the artist object to a JSON string
  const json = JSON.stringify(artistToUpdate);

  // Send a PUT request to update the artist on the server
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "PUT",
    body: json,
    headers: { "Content-Type": "application/json" },
  });

  return response;
}

// Function to delete an artist from the server
async function deleteArtist(artistObject) {
  const id = artistObject.id;

  // Send a DELETE request to remove the artist from the server
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "DELETE",
  });

  return response;
}

// Function to mark an artist as a favorite on the server (assuming PATCH is used for this purpose)
async function favoriteArtist(artistObject) {
  const id = artistObject.id;

  // Send a PATCH request to mark the artist as a favorite on the server
  const response = await fetch(`${endpoint}/artists/${id}`, {
    method: "PATCH",
  });

  return response;
}

// Export the functions for use in other modules
export { favoriteArtist, getArtists, createArtist, updateArtist, deleteArtist };