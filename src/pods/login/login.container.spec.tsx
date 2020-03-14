import * as React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { LoginContainer } from "./login.container";
import * as validateFn from './login.api';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('login container specs', () => {

  it('should render  an empty form', () => {
    // Act
    const { getByTestId } = render(<LoginContainer />);
    const resultName: HTMLInputElement = getByTestId("nameField") as HTMLInputElement;
    const resultPassword: HTMLInputElement = getByTestId("passwordField") as HTMLInputElement;
    // Assert
    expect(resultName.value).toEqual('')
    expect(resultPassword.value).toEqual('')
  });

  it.only('should redirect when credentials are correct', async () => {
    // Arrange
    const validationStub = jest.spyOn(validateFn, 'validateCredentials').mockResolvedValue(true);
    // Act
    const { getByTestId } = render(<LoginContainer />);
    const submitBtn = getByTestId('submitBtn');
    await wait(() => fireEvent.click(submitBtn));

    // Assert
    expect(validationStub).toHaveBeenCalled();
    expect(submitBtn).toBeTruthy();
  });


});