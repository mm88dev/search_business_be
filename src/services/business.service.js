const axios = require('axios');
const CustomError = require('../utils/customError');

const API_URL = process.env.API_URL;

// Function to fetch search results from an external API
exports.fetchBusinessById = async place_id => {
  try {
    const response = await axios.get(`${API_URL}/${place_id}`);
    console.log({ response });
    return response.data;
  } catch (error) {
    throw new CustomError('Error fetching business', 500);
  }
};
