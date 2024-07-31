const CustomError = require('../utils/customError');
const {
  syncPlacesData: initializePlacesMap,
  searchPlaces,
  searchById
} = require('../services/business.service');

exports.searchByNameOrAddress = async (req, res, next) => {
  await initializePlacesMap();

  if (!req.query.q)
    return next(new CustomError('Missing query parameter', 400));

  const searchResult = searchPlaces(req.query.q);

  res.status(200).send({ status: 'success', data: searchResult });
};

exports.getById = async (req, res, next) => {
  await initializePlacesMap();

  const id = req.params.id;

  const searchResult = searchById(id);
  if (!searchResult) {
    return next(new CustomError(`Business with id ${id} not found`, 404));
  }

  res.status(200).send({ status: 'success', data: searchResult });
};
