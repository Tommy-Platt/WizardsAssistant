import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import Spells from '../app/(dnd)/spells';
import { useRouter } from 'expo-router';
import axios from 'axios';

// Creates a mock spell so the test doesn't rely on a network request
const mockSpell = {
  "index": "acid-arrow",
  "name": "Acid Arrow",
  "desc": [
    "A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn."
  ],
  "higher_level": [
    "When you cast this spell using a spell slot of 3rd level or higher, the damage (both initial and later) increases by 1d4 for each slot level above 2nd."
  ],
  "range": "90 feet",
  "components": [
    "V",
    "S",
    "M"
  ],
  "material": "Powdered rhubarb leaf and an adder's stomach.",
  "duration": "Instantaneous",
  "casting_time": "1 action",
  "level": 2,
  "attack_type": "ranged",
  "damage": {
    "damage_type": {
      "index": "acid",
      "name": "Acid",
      "url": "/api/2014/damage-types/acid"
    }
  },
  "school": {
    "index": "evocation",
    "name": "Evocation",
    "url": "/api/2014/magic-schools/evocation"
  }
};

(axios.get as jest.Mock).mockResolvedValue({
  data: {
    data: [mockSpell]
  }
});

test('Searches for Acid Arrow spell and presses it to redirect', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  render(<Spells />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter spell name'), 'Acid Arrow');

  fireEvent.press(screen.getByAccessibilityHint('Searches for a spell'));

  const spell = await waitFor(() =>
    screen.getByText('Acid Arrow')
  );

  expect(spell).toBeTruthy();

  fireEvent.press(screen.getByAccessibilityHint('Spell name'));

});

test('Searches for non-existent spell to check error handling', async () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  (axios.get as jest.Mock).mockResolvedValue({
    data: {
      data: []
    }
  });

  render(<Spells />);

  fireEvent.changeText(screen.getByPlaceholderText('Enter spell name'), 'xxxxxxxxxx');

  fireEvent.press(screen.getByAccessibilityHint('Searches for a spell'));

  const results = await waitFor(() =>
    screen.getByText('No spells found.')
  );
  expect(results).toBeTruthy();
});