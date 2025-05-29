import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mocks packages used across the app so I don't have to mock them in every test file
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-google-signin/google-signin', () => {
  const mockGoogleSigninButton = () => null;
  mockGoogleSigninButton.Size = {
    Icon: 0,
    Standard: 1,
    Wide: 2,
  };
  mockGoogleSigninButton.Color = {
    Light: 0,
    Dark: 1,
  };

  return {
    GoogleSigninButton: mockGoogleSigninButton,
    GoogleSignin: {
      configure: jest.fn(),
      signIn: jest.fn().mockResolvedValue({
      idToken: 'test-id-token',
      user: {
        email: 'test@example.com',
      },
  }),
}
  };
});

jest.mock('expo-router', () => {
  const actual = jest.requireActual('expo-router');
  return {
    ...actual,
    useRouter: jest.fn(() => ({
      push: jest.fn(),
      isReady: true,
    })),
  };
});

jest.mock('axios');