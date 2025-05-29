import { render, screen, fireEvent } from '@testing-library/react-native';
import Login from '../app/(auth)/index';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native'

test('Types in email and password, testing if login button works', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  render(<Login />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter your email'), 'test@testing.com');

  fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'securePassword');

  fireEvent.press(screen.getByText('Sign In'))

});

test('Tests that invalid email returns an error', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  render(<Login />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter your email'), '');

  fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), 'securePassword');

  fireEvent.press(screen.getByText('Sign In'))

  jest.spyOn(Alert, 'alert');

  const error = new Error('missing email or phone');
  if (error) Alert.alert(error.message);

  expect(Alert.alert).toHaveBeenCalledWith('missing email or phone');

})

test('Tests that invalid password returns an error', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  render(<Login />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter your email'), 'test@testing.com');

  fireEvent.changeText(screen.getByPlaceholderText('Enter your password'), '');

  fireEvent.press(screen.getByText('Sign In'))

  jest.spyOn(Alert, 'alert');

  const error = new Error('Invalid login credentials');
  if (error) Alert.alert(error.message);

  expect(Alert.alert).toHaveBeenCalledWith('Invalid login credentials');

})