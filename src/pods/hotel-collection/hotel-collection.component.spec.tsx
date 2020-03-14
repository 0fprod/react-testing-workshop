import React from 'react';
import { render } from '@testing-library/react';
import { HotelEntityVm, createDefaultHotelEntityVm } from './hotel-collection.vm'
import { HotelCollectionComponent } from './hotel-collection.component';

describe('hotel-collection component specs', () => {

  it('it should render 0 hotels when an empty array its given', () => {
    // Arrange
    const hotelCollection: HotelEntityVm[] = [];

    // Act
    const { queryByTestId } = render(<HotelCollectionComponent hotelCollection={hotelCollection}></HotelCollectionComponent>)
    const element = queryByTestId('hotelCardTestId');
    // Assert
    expect(element).not.toBeInTheDocument();
    expect(element).toBeNull();
  })

  it('it should render hotels cards when an array its given', () => {
    // Arrange
    const hotel: HotelEntityVm = createDefaultHotelEntityVm();
    hotel.address = 'testAddress'
    hotel.name = 'testName';
    hotel.description = 'testDescription';
    hotel.picture = 'www.someurl.com'
    const hotelCollection: HotelEntityVm[] = [hotel];

    // Act
    const { getAllByTestId, getByText } = render(<HotelCollectionComponent hotelCollection={hotelCollection}></HotelCollectionComponent>)
    const cardsByTestId = getAllByTestId('hotelCardTestId');
    const firstCard: HTMLElement = cardsByTestId[0];
    const elementByName = getByText(hotel.name);
    // Assert
    expect(cardsByTestId).toHaveLength(hotelCollection.length)
    expect(firstCard).toBeInTheDocument();
    expect(elementByName).toBeInTheDocument();
    expect(elementByName.textContent).toEqual(hotel.name)
  })
})