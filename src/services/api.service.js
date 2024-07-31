const axios = require('axios');
const CustomError = require('../utils/customError');

// Function to fetch search results from an external API
exports.fetchBusinessById = async place_id => {
  const url = `${process.env.API_URL}/${place_id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new CustomError('Error fetching business', 500);
  }
};
