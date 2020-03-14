import { validateCredentials } from './login.api';

describe('login-api specs', () => {
  it('It should returntrue when the credentials are admin & test', async () => {
    // Arrange
    // Act
    const result = await validateCredentials('admin', 'test');
    // Assert
    expect(result).toBeTruthy();
  });
  it('It should return false with an invalid credential', async () => {
    // Arrange
    // Act
    const result = await validateCredentials('aaa', 'bbb');
    // Assert
    expect(result).toBeFalsy();
  });
});
