import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';
import {
  syncPlacesData,
  searchPlaces,
  searchById
} from '../services/business.service';

export const searchByNameOrAddress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await syncPlacesData();

  const query = req.query.q as string | undefined;
  if (!query) return next(new CustomError('Missing query parameter', 400));

  const searchResult = searchPlaces(query);

  res.status(200).send({ status: 'success', data: searchResult });
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await syncPlacesData();

  const id = req.params.id;

  const searchResult = searchById(id);
  if (!searchResult) {
    return next(new CustomError(`Business with id ${id} not found`, 404));
  }

  res.status(200).send({ status: 'success', data: searchResult });
};
