const express = require("express");

const { createApi } = require("unsplash-js");
const axios = require("axios");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

const router = express.Router();

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  fetch,
  headers: {
    "Content-Type": "application/json",
  },
});

router.get("/api/photos", async (req, res) => {
  const query = req.query;
  try {
    const response = await unsplash.photos.list({
      perPage: 10,
      orderBy: "latest",
      page: 1,
      search: query.search || "",
    });
    const photos = response.response.results;

    res.json(photos);
  } catch (error) {
    console.error("Error fetching photos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
