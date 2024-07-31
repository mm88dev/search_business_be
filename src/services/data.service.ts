import { PlaceData, BusinessApiResponse } from '../types';
import { formatOpeningHours } from '../utils/helpers';

const places = new Map<string, PlaceData>();

export const mapData = async (
  results: BusinessApiResponse[]
): Promise<void> => {
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
        .filter(contact => contact.contact_type === 'phone')
        .map(contact =>
          contact.formatted_service_code
            ? `+41 ${contact.formatted_service_code}`
            : ''
        ),
      websites: result.addresses[0].contacts
        .filter(contact => contact.contact_type === 'url')
        .map(contact => contact.url || '')
    });
  });
};

export const getPlaces = (): Map<string, PlaceData> => places;
