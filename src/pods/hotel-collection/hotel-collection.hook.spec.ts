import * as api from './hotel-collection.api';
import { renderHook, act } from '@testing-library/react-hooks';
import { useHotelCollection } from './hotel-collection.hook';
import { basePicturesUrl } from '../../core/const';
import { HotelEntityVm } from './hotel-collection.vm';
import { mapToCollection } from '../../common/mappers';
import { mapFromApiToVm } from './hotel-collection.mapper';

describe('Hotel-collection hook specs', () => {
  it('hould return an hotel collection when its called', async () => {
    //Arrange
    const hotelEntity: api.HotelEntityApi[] = [
      {
        id: '0248058a-27e4-11e6-ace6-a9876eff01b3',
        type: 'hotel',
        name: 'Motif Seattle',
        created: new Date(1464777092568),
        modified: new Date(1464777618676),
        address1: '1415 5th Ave',
        airportCode: 'SEA',
        amenityMask: 7798786,
        city: 'Seattle',
        confidenceRating: 52,
        countryCode: 'US',
        deepLink:
          'http://www.travelnow.com/templates/55505/hotels/125727/overview?lang=en&amp;currency=USD&amp;standardCheckin=null/null/null&amp;standardCheckout=null/null/null',
        highRate: 289,
        hotelId: 1257278,
        hotelInDestination: true,
        hotelRating: 4,
        location: {
          latitude: 47.60985,
          longitude: -122.33475,
        },
        locationDescription: 'Near Pike Place Market',
        lowRate: 259,
        metadata: {
          path: '/hotels/0248058a-27e4-11e6-ace6-a9876eff01b3',
        },
        postalCode: 98101,
        propertyCategory: 1,
        proximityDistance: 11.168453,
        proximityUnit: 'MI',
        rateCurrencyCode: 'USD',
        shortDescription:
          'With a stay at Motif Seattle, you will be centrally located in Seattle, steps from 5th Avenue Theater and minutes from Pike Place Market. This 4-star hotel is within',
        stateProvinceCode: 'WA',
        thumbNailUrl: '/thumbnails/50947_264_t.jpg',
        tripAdvisorRating: 3.5,
        tripAdvisorRatingUrl:
          'http://www.tripadvisor.com/img/cdsi/img2/ratings/traveler/3.5-12345-4.gif',
      },
    ];

    const expectedResult: HotelEntityVm[] = mapToCollection(
      hotelEntity,
      mapFromApiToVm
    );

    const getStub = jest
      .spyOn(api, 'getHotelCollection')
      .mockResolvedValue(hotelEntity);

    //Act

    const { result, waitForNextUpdate } = renderHook(() =>
      useHotelCollection()
    );
    act(() => {
      result.current.loadHotelCollection();
    });

    expect(result.current.hotelCollection).toEqual([]);

    await waitForNextUpdate();

    //Assert
    expect(getStub).toHaveBeenCalled();
    expect(result.current.hotelCollection).toEqual(expectedResult);
  });
});
