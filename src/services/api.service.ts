import axios from 'axios';
import CustomError from '../utils/customError';
import { BusinessApiResponse } from '../types';

export const fetchBusinessById = async (place_id: string) => {
  const url = `${process.env.API_URL}/${place_id}`;
  try {
    const response = await axios.get<BusinessApiResponse>(url);
    return response.data;
  } catch (error) {
    throw new CustomError('Error fetching business', 500);
  }
};
