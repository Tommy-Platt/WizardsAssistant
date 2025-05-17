import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import Cards from '../app/(mtg)/cards';
import { useRouter } from 'expo-router';
import axios from 'axios';

// Creates a mock card image so the test doesn't rely on a network request
const mockCard = {
  id: '1234',
  name: 'Lightning Bolt',
  image_uris: {
    normal: 'https://fakeimg.pl/300x400/?text=LightningBolt'
  }
};

(axios.get as jest.Mock).mockResolvedValue({
  data: {
    data: [mockCard]
  }
});

test('Searches for a Lightning Bolt card and presses it to redirect', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  render(<Cards />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter card name'), 'Lightning Bolt');

  fireEvent.press(screen.getByAccessibilityHint('Searches for a card'));

  const card = await waitFor(() =>
    screen.getByText('Lightning Bolt')
  );

  expect(card).toBeTruthy();

  fireEvent.press(screen.getByAccessibilityHint('An image of a card'));

});

test('Searches for non-existent card to check error handling', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      data: []
    }
  });

  render(<Cards />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter card name'), 'xxxxxxxxxx');

  fireEvent.press(screen.getByAccessibilityHint('Searches for a card'));

  const results = await waitFor(() =>
    screen.getByText('No cards found.')
  );
  expect(results).toBeTruthy();

});