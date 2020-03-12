import * as apiModel from './hotel-collection.api';
import * as viewModel from './hotel-collection.vm';
import { baseApiUrl } from '../../core/const';

export const mapFromApiToVm = (
  hotel: apiModel.HotelEntityApi
): viewModel.HotelEntityVm => {
  if (!hotel) {
    return viewModel.createDefaultHotelEntityVm();
  }

  return {
    id: hotel.id,
    picture: `${baseApiUrl}${hotel.thumbNailUrl}`,
    name: hotel.name,
    description: hotel.shortDescription,
    rating: hotel.hotelRating,
    address: hotel.address1,
  };
};
