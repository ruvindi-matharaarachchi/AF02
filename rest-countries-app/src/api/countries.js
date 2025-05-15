const BASE_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () =>
  fetch(`${BASE_URL}/all`).then(res => res.json());

export const searchCountryByName = async (name) =>
  fetch(`${BASE_URL}/name/${name}`).then(res => res.json());

export const getCountriesByRegion = async (region) =>
  fetch(`${BASE_URL}/region/${region}`).then(res => res.json());

export const getCountryByCode = async (code) =>
  fetch(`${BASE_URL}/alpha/${code}`).then(res => res.json());
