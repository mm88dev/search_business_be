const { fetchBusinessById } = require('./api.service');
const { mapData, getPlaces } = require('./data.service');

exports.searchById = id => {
  for (const [key, placeData] of getPlaces().entries()) {
    if (placeData.id === id) {
      return placeData;
    }
  }
  return null;
};

exports.searchPlaces = searchTerm => {
  // Normalize the search term
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const results = [];

  for (const [key, placeData] of getPlaces().entries()) {
    if (key.includes(normalizedSearchTerm)) {
      results.push(placeData);
    }
  }

  return results;
};

exports.syncPlacesData = async () => {
  if (getPlaces().size > 0) return;
  // console.count('Fetching business data');

  const fetchedPlaces = await Promise.all([
    fetchBusinessById(process.env.PLACE_ID_1),
    fetchBusinessById(process.env.PLACE_ID_2)
  ]);

  if (!fetchedPlaces) return new CustomError('Error fetching business', 500);

  mapData(fetchedPlaces);
};
