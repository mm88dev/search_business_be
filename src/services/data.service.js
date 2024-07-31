const { formatOpeningHours } = require('../utils/helpers');

const places = new Map();

exports.mapData = async results => {
  results.forEach(result => {
    const businessAndAddress = `${result.displayed_what
      .trim()
      .toLowerCase()} ${result.displayed_where.trim().toLowerCase()}`;
    places.set(businessAndAddress, {
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
};

exports.getPlaces = () => places;
