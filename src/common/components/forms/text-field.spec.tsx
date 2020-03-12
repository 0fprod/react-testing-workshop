import { TextField } from './text-field'
import { render } from '@testing-library/react';
import React from 'react';
import { FieldInputProps } from 'react-final-form';

describe('text-field component spec', () => {
  it('Should have attribues name and value and match the given props', () => {
    // Arrange
    const input = {
      name: 'myName',
      value: 'myValue',
    } as unknown as FieldInputProps<any, any>;

    const props = {
      input: input,
      meta: '',
      'data-testid': 'myid'
    };
    // Act
    const { getByTestId } = render(<TextField {...props} />);
    const element = getByTestId('myid') as HTMLInputElement;
    // Assert
    expect(element.hasAttribute('name')).toBeTruthy();
    expect(element.hasAttribute('value')).toBeTruthy();
    expect(element.name).toEqual('myName');
    expect(element.value).toEqual('myValue');
  });

  it('Should match the error message when the input parameters cause errors', () => {
    // Arrange
    const input = {
      name: 'myName',
      value: 'myValue',
    } as unknown as FieldInputProps<any, any>;

    const props = {
      input: input,
      meta: {
        error: 'myErrorMessage',
        touched: true
      },
      'data-testid': 'myid'
    };
    // Act
    const { getByText } = render(<TextField {...props} />);
    const element = getByText('myErrorMessage');

    // Assert
    expect(element.textContent).toEqual('myErrorMessage');
  });
})