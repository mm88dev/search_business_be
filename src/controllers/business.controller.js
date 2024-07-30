const { formatOpeningHours } = require('../helpers');
const { fetchSearchResults } = require('../services/search.service');

const placesMap = new Map();

// helper:
// todo: move this to service
const mapData = async results => {
  results.forEach(result => {
    const businessAndAddress = `${result.displayed_what
      .trim()
      .toLowerCase()} ${result.displayed_where.trim().toLowerCase()}`;
    placesMap.set(businessAndAddress, {
      id: result.local_entry_id,
      name: result.displayed_what,
      address: result.displayed_where,
      openingHours: formatOpeningHours(result.opening_hours),
      phoneNumbers: result.addresses[0].contacts
        .map(contact => {
          if (contact.contact_type === 'phone') {
            return `+41 ${contact.formatted_service_code}`;
          }
        })
        .filter(phone => !!phone),
      websites: result.addresses[0].contacts
        .map(contact => {
          if (contact.contact_type === 'url') {
            return contact.url;
          }
        })
        .filter(website => !!website)
    });
  });
  // add mapping for open hours
};

// helper:
// Function to search by business name or address
const searchPlaces = searchTerm => {
  // Normalize the search term
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const results = [];

  for (const [key, placeData] of placesMap.entries()) {
    if (key.includes(normalizedSearchTerm)) {
      results.push(placeData);
    }
  }

  return results;
};

// helper: search by id
const searchById = id => {
  for (const [key, placeData] of placesMap.entries()) {
    if (placeData.id === id) {
      return placeData;
    }
  }
  return null;
};

exports.searchByNameOrAddress = async (req, res, next) => {
  const fetchedData = await Promise.all([
    fetchSearchResults(process.env.PLACE_ID_1),
    fetchSearchResults(process.env.PLACE_ID_2)
  ]);

  mapData(fetchedData);

  if (!req.query.q) return res.status(400).send('Missing query parameter');

  const searchResult = searchPlaces(req.query.q);
  console.log(searchResult);

  res.send(searchResult);
};

exports.getById = async (req, res, next) => {
  const fetchedData = await Promise.all([
    fetchSearchResults(process.env.PLACE_ID_1),
    fetchSearchResults(process.env.PLACE_ID_2)
  ]);

  mapData(fetchedData);

  const id = req.params.id;

  const searchResult = searchById(id);

  return searchResult
    ? res.send(searchResult)
    : res.status(404).send('Not found');
};
