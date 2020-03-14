import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { LoginComponent } from "./login.component";
import { LoginEntityVm } from './login.vm';

describe('login component specs', () => {

  it('should render loginComponent with the given credentials', () => {
    // Arrange
    const initialLogin: LoginEntityVm = { login: 'myLogin', password: 'myPassword' };
    const onLoginFn = jest.fn();
    // Act
    const { getByTestId } = render(<LoginComponent onLogin={onLoginFn} initialLogin={initialLogin} />)
    const elementByName = getByTestId('nameField') as HTMLInputElement;
    const elementByPassword = getByTestId('passwordField') as HTMLInputElement;
    // Assert
    expect(elementByName.value).toEqual(initialLogin.login);
    expect(elementByPassword.value).toEqual(initialLogin.password)
  });

  it('should call onLoginFn when form its submitted', async () => {
    // Arrange
    const initialLogin: LoginEntityVm = { login: 'myLogin', password: 'myPassword' };
    const onLoginFn = jest.fn();
    // Act
    const { getByTestId } = render(<LoginComponent onLogin={onLoginFn} initialLogin={initialLogin} />)
    const elementButton = getByTestId('submitBtn');

    await wait(() => fireEvent.click(elementButton));

    // Assert
    expect(onLoginFn).toHaveBeenCalled();
  });
});