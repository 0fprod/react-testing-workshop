import * as React from 'react';
import { render, fireEvent, wait, act } from '@testing-library/react';
import { LoginContainer } from "./login.container";
import * as validateFn from './login.api';
import * as init from './login.vm'
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  }
}


describe('login container specs', () => {

  it('should render  an empty form', () => {
    // Act
    const { getByTestId } = renderWithRouter(<LoginContainer />);
    const resultName: HTMLInputElement = getByTestId("nameField") as HTMLInputElement;
    const resultPassword: HTMLInputElement = getByTestId("passwordField") as HTMLInputElement;
    // Assert
    expect(resultName.value).toEqual('')
    expect(resultPassword.value).toEqual('')
  });

  it('should redirect when credentials are correct', async () => {
    // Arrange
    jest.spyOn(init, 'createEmptyLogin').mockReturnValue({ login: "admin", password: "test" });
    const validationStub = jest.spyOn(validateFn, 'validateCredentials').mockResolvedValue(true);

    // Act
    const { getByTestId, history, } = renderWithRouter(<LoginContainer />);
    const submitBtn = getByTestId('submitBtn');
    const nameField = getByTestId("nameField") as HTMLInputElement;
    const passwordField = getByTestId("passwordField") as HTMLInputElement;

    // Assert
    expect(nameField.value).toEqual('admin');
    expect(passwordField.value).toEqual('test');

    await wait(() => {
      fireEvent.click(submitBtn);
      expect(validationStub).toHaveBeenCalled();
      expect(history.location.pathname).toEqual('/hotel-collection')
    });

  });

});