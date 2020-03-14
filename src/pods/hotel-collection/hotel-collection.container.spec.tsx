import { HotelCollectionContainer } from "./hotel-collection.container";
import { HotelEntityVm, createDefaultHotelEntityVm } from "./hotel-collection.vm";
import React from "react";
import { render } from "@testing-library/react";
import * as hotelCollectionHook from './hotel-collection.hook'

describe('HotelCollection container specs', () => {

  it('it should have 0 cards rendered when mounted', () => {
    //Arrange  
    const { queryAllByTestId } = render(<HotelCollectionContainer />);
    //Act
    const hotelFromComponent = queryAllByTestId('hotelCardTestId');
    // Assert
    expect(hotelFromComponent).toHaveLength(0);
  });

  it('should reneder a collection of hotelsCards', () => {
    // Arrange
    const hotel: HotelEntityVm = createDefaultHotelEntityVm();
    hotel.address = 'testAddress'
    hotel.name = 'testName';
    hotel.description = 'testDescription';
    hotel.picture = 'www.someurl.com'

    const hotelCollection: HotelEntityVm[] = [hotel];
    const loadHotelCollectionSpy = jest.fn();
    const hookStub = jest.spyOn(hotelCollectionHook, 'useHotelCollection').mockReturnValue({
      hotelCollection,
      loadHotelCollection: loadHotelCollectionSpy,
    });

    // Act
    const { queryAllByText } = render(<HotelCollectionContainer />);
    const result = queryAllByText("testAddress");

    // Assert
    expect(result).toHaveLength(1);
    expect(hookStub).toHaveBeenCalled();
    expect(loadHotelCollectionSpy).toHaveBeenCalled();
  });
});