const axios = require('axios');

// Function to fetch search results from an external API
exports.fetchSearchResults = async place_id => {
  try {
    const response = await axios.get(`${process.env.API_URL}/${place_id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    throw error;
  }
};
