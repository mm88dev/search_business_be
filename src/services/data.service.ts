import { BusinessApiResponse } from '../types/api.types';
import { PlaceData } from '../types/data.types';
import {
  formatOpeningHours,
  formatPhoneNumbers,
  formatWebsites
} from '../utils/helpers';

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
      phoneNumbers: formatPhoneNumbers(result.addresses[0].contacts),
      websites: formatWebsites(result.addresses[0].contacts)
    });
  });
};

export const getPlaces = (): Map<string, PlaceData> => places;
