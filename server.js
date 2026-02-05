/********************************************************************************
* WEB322 - Assignment 01
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: __Nancy Rana__ Student ID: __149951238__ Date: __03-02-2026__
*
************************************************************************/

const express = require("express");
const path = require("path");
const { loadSightings } = require("./utils/dataLoader");

const app = express();
const PORT = process.env.PORT || 3000;

// serve static files
app.use(express.static(path.join(__dirname, "public")));

// root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// get all wildlife sightings
app.get("/api/sightings", async (req, res) => {
  const sightings = await loadSightings();
  res.json(sightings);
});

// get only verified sightings
app.get("/api/sightings/verified", async (req, res) => {
  const sightings = await loadSightings();
  const verified = sightings.filter(s => s.verified === true);
  res.json(verified);
});

// get list of unique species names
app.get("/api/sightings/species-list", async (req, res) => {
  const sightings = await loadSightings();
  const species = sightings.map(s => s.species);
  const uniqueSpecies = [...new Set(species)];
  res.json(uniqueSpecies);
});

// get all forest habitat sightings
app.get("/api/sightings/habitat/forest", async (req, res) => {
  const sightings = await loadSightings();
  const forestSightings = sightings.filter(
    s => s.habitat.toLowerCase() === "forest"
  );

  res.json({
    habitat: "forest",
    sightings: forestSightings,
    count: forestSightings.length
  });
});

// search for eagle sightings
app.get("/api/sightings/search/eagle", async (req, res) => {
  const sightings = await loadSightings();
  const result = sightings.find(s =>
    s.species.toLowerCase().includes("eagle")
  );
  res.json(result);
});

//to get the index of moose in database
app.get("/api/sightings/find-index/moose", async (req, res) => {
  const sightings = await loadSightings();
  const index = sightings.findIndex(s => s.species === "Moose");

  res.json({
    index,
    sighting: sightings[index]
  });
});

//to get 3 recent sightings
app.get("/api/sightings/recent", async (req, res) => {
  const sightings = await loadSightings();
  const recent = sightings.slice(-3).map(s => ({
    species: s.species,
    location: s.location,
    date: s.date
  }));
  res.json(recent);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
