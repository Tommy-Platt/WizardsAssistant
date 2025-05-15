import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mocks packages used across the app so I don't have to mock them in every test file
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

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