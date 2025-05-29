import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import Items from '../app/(dnd)/items';
import { useRouter } from 'expo-router';
import axios from 'axios';

// Creates a mock spell so the test doesn't rely on a network request
const mockItem = {
  "index": "cool-item",
  "name": "Cool Item",
};

(axios.get as jest.Mock).mockResolvedValue({
  data: {
    results: [mockItem]
  }
});

test('Searches for an item and presses it to redirect', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  render(<Items />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter item name'), 'cool item');

  const searchButton = screen.getByA11yHint('Searches for an item');
  expect(searchButton).toBeTruthy();

  fireEvent.press(searchButton);

  const spell = await waitFor(() =>
    screen.getByText('Cool Item')
  );

  expect(spell).toBeTruthy();

  fireEvent.press(screen.getByAccessibilityHint('item name'));

});

test('Searches for term with > 30 results to test page navigation', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      results: [
        {
          "index": "aa",
          "name": "AA",
        },
        {
          "index": "ab",
          "name": "AB",
        },
        {
          "index": "ac",
          "name": "AC",
        },
        {
          "index": "ad",
          "name": "AD",
        },
        {
          "index": "ae",
          "name": "AE",
        },
        {
          "index": "af",
          "name": "AF",
        },
        {
          "index": "ag",
          "name": "AG",
        },
        {
          "index": "ah",
          "name": "AH",
        },
        {
          "index": "ai",
          "name": "AI",
        },
        {
          "index": "aj",
          "name": "AJ",
        },
        {
          "index": "ak",
          "name": "AK",
        },
        {
          "index": "al",
          "name": "AL",
        },
        {
          "index": "am",
          "name": "AM",
        },
        {
          "index": "an",
          "name": "AN",
        },
        {
          "index": "ao",
          "name": "AO",
        },
        {
          "index": "ap",
          "name": "AP",
        },
        {
          "index": "aq",
          "name": "AQ",
        },
        {
          "index": "ar",
          "name": "AR",
        },
        {
          "index": "as",
          "name": "AS",
        },
        {
          "index": "at",
          "name": "AT",
        },
        {
          "index": "au",
          "name": "AU",
        },
        {
          "index": "av",
          "name": "AV",
        },
        {
          "index": "aw",
          "name": "AW",
        },
        {
          "index": "ax",
          "name": "AX",
        },
        {
          "index": "ay",
          "name": "AY",
        },
        {
          "index": "az",
          "name": "AZ",
        },
        {
          "index": "aaa",
          "name": "AAA",
        },
        {
          "index": "aab",
          "name": "AAB",
        },
        {
          "index": "aac",
          "name": "AAC",
        },
        {
          "index": "aad",
          "name": "AAD",
        },
        {
          "index": "aae",
          "name": "AAE",
        },
        {
          "index": "aaf",
          "name": "AAF",
        },
        {
          "index": "aag",
          "name": "AAG",
        },
        {
          "index": "aah",
          "name": "AAH",
        },
        {
          "index": "aai",
          "name": "AAI",
        },
      ]
    }
  });

  render(<Items />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter item name'), 'a');

  fireEvent.press(screen.getByAccessibilityHint('Searches for an item'));

  const results = await waitFor(() =>
    screen.getByAccessibilityHint('Page numbers')
  );

  expect(results).toBeTruthy();
});

test('Searches for non-existent item to check error handling', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      results: []
    }
  });

  render(<Items />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter item name'), 'xxxxxxxxxx');

  fireEvent.press(screen.getByAccessibilityHint('Searches for an item'));

  const results = await waitFor(() =>
    screen.getByText('No items found.')
  );
  expect(results).toBeTruthy();

});