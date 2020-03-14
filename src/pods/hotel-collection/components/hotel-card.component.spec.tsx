
import React from "react";
import { render } from "@testing-library/react";
import { HotelCard } from "./hotel-card.component";
import { createDefaultHotelEntityVm, HotelEntityVm } from "../hotel-collection.vm";

describe('HotelCard component specs', () => {

  it.only('it should render one card with the given hotel', () => {
    //Arrange  
    const hotel: HotelEntityVm = createDefaultHotelEntityVm();
    hotel.address = 'testAddress'
    hotel.name = 'testName';
    hotel.description = 'testDescription';
    hotel.picture = 'www.someurl.com'

    const { getByText } = render(<HotelCard hotel={hotel} />);
    //Act
    const elemetByAddres = getByText(hotel.address) as HTMLElement;
    const elementByName = getByText(hotel.name) as HTMLElement;
    const elementByDescription = getByText(hotel.description) as HTMLElement;
    // Assert
    expect(elemetByAddres).toBeInTheDocument();
    expect(hotel.address).toEqual(elemetByAddres.textContent);

    expect(elementByName).toBeInTheDocument();
    expect(hotel.name).toEqual(elementByName.textContent);

    expect(elementByDescription).toBeInTheDocument();
    expect(hotel.description).toEqual(elementByDescription.textContent);


  });


});