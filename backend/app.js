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
  // const artists = await read
  response.send("Hey there express");
});

// GET den ene artist
app.get("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);
  const result = artists.find(artist => artist.id === id);
  console.log("Get artist");
  console.log(result);

  if (!result) {
    response.status(404).json({ error: "Artist not found!" });
  } else {
    response.json(result);
  }
});

// GET artists
app.get("/artists", async (request, response) => {
  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);
  response.json(artists);
});

// POST/CREATE new artist
app.post("/artists", async (request, response) => {
  const newArtist = request.body;

  newArtist.id = new Date().getTime();

  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);

  artists.push(newArtist);
  console.log(newArtist);
  fs.writeFile("./data/artists.json", JSON.stringify(artists));
  response.json(artists);
});

// PUT/UPDATE artist
app.put("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);

  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);

  let artistUpdate = artists.find(artist => artist.id !== id);

  artistUpdate.push(request.body);

  fs.writeFile("./data/artists.json", JSON.stringify(artistUpdate));
  response.json(artistUpdate);

  
  /*
  if (!result) {
  response.status(404).json({ error: "Artist not found!" });
  } else {
  response.json(result);
  } 
*/
});

// DELETE artist
app.delete("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);

  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);

  const newArtists = artists.filter(artist => artist.id !== id);
  await fs.writeFile("./data/artists.json", JSON.stringify(newArtists));

  response.json(artists);
});

// FAVORITE artist
app.patch("/artists/:id", async (request, response) => {
  const param = Number(request.params.id);

  const data = await fs.readFile("./data/artists.json");
  const artists = JSON.parse(data);
  const result = artists.find(artist => Number(artist.id) === Number(param));

  result.favorite = !result.favorite;
  
  await fs.writeFile("./data/artists.json", JSON.stringify(artists));

  response.json(artists);
});
