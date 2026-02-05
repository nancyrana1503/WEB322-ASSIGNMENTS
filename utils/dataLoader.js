const fs = require("fs").promises;
const path = require("path");

async function loadSightings() {
  try {
    const filePath = path.join(__dirname, "..", "data", "sightings.json");
    const data = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData.sightings;
  } catch (error) {
    console.error(error);
    throw new Error("Could not load sightings data");
  }
}

module.exports = { loadSightings };
