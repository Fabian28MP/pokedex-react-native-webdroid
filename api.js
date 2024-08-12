import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export const fetchPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(`${API_URL}?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon list:', error);
    return { results: [] };
  }
};

export const fetchPokemonDetails = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokémon details:', error);
    return null;
  }
};
