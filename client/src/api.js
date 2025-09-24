import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export async function fetchCountries() {
  return (await axios.get(`${API_BASE}/api/countries`)).data;
}

export async function fetchHolidays(country, start, end) {
  return (await axios.get(`${API_BASE}/api/holidays`, { params: { country, start, end } })).data;
}
