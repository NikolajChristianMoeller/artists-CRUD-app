import fs from "fs/promises";
import express from "express";
import cors from "cors";

const app = express();
const port = 3000;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("Hey there express");
});

// GET a single artist by ID
app.get("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);
  const result = artists.find(artist => artist.id === id);

  if (!result) {
    response.status(404).json({ error: "Artist was not found!" });
  } else {
    response.json(result); // Returns the specific artist as a response
  }
});

// GET all artists
app.get("/artists", async (request, response) => {
  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);

  if (!artists) {
    return response.status(404).json({ error: "No artists were found" });
  }
  return response.json(artists);
});

// POST/CREATE a new artist
app.post("/artists", async (request, response) => {
  const newArtist = request.body;
  newArtist.id = new Date().getTime();
  newArtist.favorite = false;

  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);

  console.log(artists);

  artists.push(newArtist);
  console.log(newArtist);

  if (!newArtist) {
    res.status(400).json({ error: "Nothing has been received. Write something else" });
  } else {
    await fs.writeFile("./data/artists.json", JSON.stringify(artists));
    response.json(artists);
  }
});

// PUT/UPDATE an artist
app.put("/artists/:id", async (request, response) => {
  const data = await fs.readFile("./data/artists.json");

  const artists = JSON.parse(data);

  const id = Number(request.params.id);

  const newArtist = artists.filter(artist => Number(artist.id) !== Number(id));
  newArtist.push(request.body);
  console.log(request.body);

  if (newArtist === artists) {
    response.status(404).json({ error: "No artist was found" });
  } else {
    await fs.writeFile("./data/artists.json", JSON.stringify(newArtist));
    response.json(newArtist);
  }
});

// DELETE an artist
app.delete("/artists/:id", async (request, response) => {
  const data = await fs.readFile("./data/artists.json");

  const artists = JSON.parse(data);

  const id = Number(request.params.id);

  const newArtist = artists.filter(artist => Number(artist.id) !== id);

  if (!newArtist) {
    response.status(404).json({ error: "No artist was found" });
  } else {
    await fs.writeFile("./data/artists.json", JSON.stringify(newArtist));
    console.log(newArtist);
    response.json(newArtist);
  }
});

// PATCH/FAVORITE an artist
app.patch("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);

  const artistList = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(artistList);

  const result = artists.find(artist => Number(artist.id) === id);
  if (result.favorite === false) {
    result.favorite = true;
  } else if (result.favorite === true) {
    result.favorite = false;
  }

  console.log(artists);

  if (!result) {
    response.status(404).json({ error: "No artist was found" });
  } else {
    await fs.writeFile("./data/artists.json", JSON.stringify(artists));

    response.json(artists);
  }
});