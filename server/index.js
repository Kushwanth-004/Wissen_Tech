// server/index.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const CAL_BASE = "https://calendarific.com/api/v2";
const API_KEY = "41Yv0qEZLoZ7mlTVugiEEcxYPJ7ifDTb"; // ⚠️ better: use process.env.CALENDARIFIC_API_KEY

// ✅ Get list of available countries
app.get("/api/countries", async (req, res) => {
  try {
    const r = await axios.get(`${CAL_BASE}/countries`, {
      params: { api_key: API_KEY },
    });
    // Calendarific returns { response: { countries: [ { iso-3166, country_name } ] } }
    const countries = r.data?.response?.countries?.map((c) => ({
      countryCode: c["iso-3166"],
      name: c.country_name,
    }));
    res.json(countries);
  } catch (err) {
    console.error("Error fetching countries:", err.message);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

// ✅ Get holidays for a country within a date range
app.get("/api/holidays", async (req, res) => {
  try {
    const { country, start, end } = req.query;
    if (!country || !start || !end) {
      return res
        .status(400)
        .json({ error: "country, start and end query parameters are required" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    let holidays = [];
    for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
      const r = await axios.get(`${CAL_BASE}/holidays`, {
        params: {
          api_key: API_KEY,
          country,
          year,
        },
      });

      const yearHolidays = r.data?.response?.holidays?.map((h) => ({
        name: h.name,
        date: h.date.iso,
        description: h.description,
        type: h.type,
      }));

      holidays = holidays.concat(yearHolidays);
    }

    // filter to requested range
    holidays = holidays.filter((h) => {
      const d = new Date(h.date + "T00:00:00");
      return d >= startDate && d <= endDate;
    });

    res.json(holidays);
  } catch (err) {
    console.error("Error fetching holidays:", err.message);
    res
      .status(500)
      .json({ error: "Failed to fetch holidays", details: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
