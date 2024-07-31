import Fuse from 'fuse.js';
import { PlaceData } from '../types/data.types';
import CustomError from '../utils/customError';
import { fetchBusinessById } from './api.service';
import { getPlaces, mapData } from './data.service';

export const searchById = (id: string): PlaceData | null => {
  for (const [key, placeData] of getPlaces().entries()) {
    if (placeData.id === id) {
      return placeData;
    }
  }
  return null;
};

// Search option 1: using reguler js includes method
export const searchPlaces = (searchTerm: string): PlaceData[] => {
  const normalizedSearchTerm = searchTerm.trim().toLowerCase();
  const results: PlaceData[] = [];

  for (const [key, placeData] of getPlaces().entries()) {
    if (key.includes(normalizedSearchTerm)) {
      results.push(placeData);
    }
  }

  return results;
};

// Search option 2: using fuse.js library
export const searchPlacesUsingFuse = (searchTerm: string): PlaceData[] => {
  const places = Array.from(getPlaces().values());

  const fuse = new Fuse(places, {
    keys: ['name', 'address'],
    threshold: 0.4
  });

  const results = fuse.search(searchTerm);

  return results.map(result => result.item);
};

export const syncPlacesData = async (): Promise<void | CustomError> => {
  if (getPlaces().size > 0) return;
  // console.count('Fetching business data');

  const fetchedPlaces = await Promise.all([
    fetchBusinessById(process.env.PLACE_ID_1 as string),
    fetchBusinessById(process.env.PLACE_ID_2 as string)
  ]);

  if (!fetchedPlaces) return new CustomError('Error fetching business', 500);

  mapData(fetchedPlaces);
};
