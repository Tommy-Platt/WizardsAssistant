import { render, screen, waitFor, fireEvent, within } from '@testing-library/react-native';
import Dice from '../app/(dnd)/dice';

// Mock the alert function globally
global.alert = jest.fn() as jest.MockedFunction<(message?: any) => void>;

beforeEach(() => {
  jest.clearAllMocks();
  global.alert = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('Rolls a D20 dice with no modifier', async () => {
  render(<Dice />);

  // Select basic D20 dice & roll
  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '0');
  fireEvent.press(screen.getByText('20'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '1');

  fireEvent.press(screen.getByText('Roll!'));

  // Checks if alert came up
  expect(global.alert).toHaveBeenCalled();

  // Get alert message
  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);

  // Extract number from alert e.g. "Roll: 17"
  const match = alertMessage.match(/Roll:\s*(\d+)/);
  expect(match).not.toBeNull();
  
  // Ensures the rolled number is between 1 and 20
  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(1);
  expect(rolledNumber).toBeLessThanOrEqual(20);

});

test('Rolls a D12 dice with +5 modifier', async () => {
  render(<Dice />);

  // Select a D12 dice & roll with a modifier
  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '5');
  fireEvent.press(screen.getByText('12'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '1');

  fireEvent.press(screen.getByText('Roll!'));

  // Checks if alert came up
  expect(global.alert).toHaveBeenCalled();

  // Get alert message
  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);
  
  // Extract number from alert e.g. "Roll: 17"
  const match = alertMessage.match(/Roll:\s*(\d+)/);
  expect(match).not.toBeNull();
  
  // Ensures the rolled number is between 6 and 17
  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(6);
  expect(rolledNumber).toBeLessThanOrEqual(17);

});

test('Rolls a D10 dice with multiplier of 2', async () => {
  render(<Dice />);

  // Select a D10 dice & roll with a multiplier
  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '0');
  fireEvent.press(screen.getByText('10'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '2');

  fireEvent.press(screen.getByText('Roll!'));

  // Checks if alert came up
  expect(global.alert).toHaveBeenCalled();

  // Get alert message
  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);

  // Extract number from alert e.g. "Roll: 17"
  const match = alertMessage.match(/Roll:\s*(\d+)/);
  expect(match).not.toBeNull();
  
  // Ensures the rolled number is between 2 and 20
  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(2);
  expect(rolledNumber).toBeLessThanOrEqual(20);

});

test('Rolls a D8 dice with multiplier exceeding 100', async () => {
  render(<Dice />);

  // Select a D8 dice & roll with a multiplier exceeding 100
  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '0');
  fireEvent.press(screen.getByText('8')); // Select D8
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '101');

  // Wait for app logic to reset the multiplier to 1
  await waitFor(() => {
    const multiplierInput = screen.getByPlaceholderText('Dice Multiplier');
    expect(multiplierInput.props.value).toBe('1');
  });

  fireEvent.press(screen.getByText('Roll!'));

  // Verify alerts are called
  expect(global.alert).toHaveBeenCalledTimes(2);

  // Check the first alert message for multiplier reset
  const firstAlert = (global.alert as jest.Mock).mock.calls[0][0];
  expect(firstAlert).toMatch('Dice multiplier cannot exceed 100. Resetting to 1.');

  // Check the second alert message for the roll result
  const secondAlert = (global.alert as jest.Mock).mock.calls[1][0];
  console.log('Second alert (roll result):', secondAlert);

  const match = secondAlert.match(/Roll:\s*(\d+)/);
  expect(match).not.toBeNull();

  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(1);
  expect(rolledNumber).toBeLessThanOrEqual(8);
});

test('Rolls a D6 dice with multiplier of 100 (edge case)', async () => {
  render(<Dice />);

  // Select a D6 dice & roll with a multiplier of 100
  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '0');
  fireEvent.press(screen.getByText('6'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '100');

  fireEvent.press(screen.getByText('Roll!'));

  expect(global.alert).toHaveBeenCalled();

  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);

  const match = alertMessage.match(/Roll:\s*(\d+)/);
  expect(match).not.toBeNull();
  
  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(100);
  expect(rolledNumber).toBeLessThanOrEqual(600);

});

test('Rolls a D4 with advantage', async () => {
  render(<Dice />);

  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '0');
  fireEvent.press(screen.getByText('4'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '1');
  fireEvent.press(screen.getByText('None'));

  const dropdown = screen.getByTestId('advantageDropdown');
  fireEvent(dropdown, 'onChange', { label: 'Advantage', value: 'advantage' });

  fireEvent.press(screen.getByText('Roll!'));

  expect(global.alert).toHaveBeenCalled();

  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);

  const match = alertMessage.match(/Roll:\s*(\d+)\. Best of (\d+) and (\d+) \(\+ ?(\d+)\)/);
  expect(match).not.toBeNull();

  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(1);
  expect(rolledNumber).toBeLessThanOrEqual(4);
});

test('Rolls a D100 with disadvantage', async () => {
  render(<Dice />);

  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '0');
  fireEvent.press(screen.getByText('100'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '1');
  fireEvent.press(screen.getByText('None'));

  const dropdown = screen.getByTestId('advantageDropdown');
  fireEvent(dropdown, 'onChange', { label: 'Disadvantage', value: 'disadvantage' });

  fireEvent.press(screen.getByText('Roll!'));

  expect(global.alert).toHaveBeenCalled();

  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);

  const match = alertMessage.match(/Roll:\s*(\d+)\. Worst of (\d+) and (\d+) \(\+ ?(\d+)\)/);
  expect(match).not.toBeNull();

  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(1);
  expect(rolledNumber).toBeLessThanOrEqual(100);
});

test('Rolls a D20 with advantage + modifier', async () => {
  render(<Dice />);

  fireEvent.changeText(screen.getByPlaceholderText('Modifier'), '10');
  fireEvent.press(screen.getByText('20'));
  fireEvent.changeText(screen.getByPlaceholderText('Dice Multiplier'), '1');
  fireEvent.press(screen.getByText('None'));

  const dropdown = screen.getByTestId('advantageDropdown');
  fireEvent(dropdown, 'onChange', { label: 'Advantage', value: 'advantage' });

  fireEvent.press(screen.getByText('Roll!'));

  expect(global.alert).toHaveBeenCalled();

  const alertMessage = (global.alert as jest.Mock).mock.calls[0][0];
  console.log('ALERT:', alertMessage);

  const match = alertMessage.match(/Roll:\s*(\d+)\. Best of (\d+) and (\d+) \(\+ 10\)/);
  expect(match).not.toBeNull();

  const rolledNumber = parseInt(match[1], 10);
  expect(rolledNumber).toBeGreaterThanOrEqual(11);
  expect(rolledNumber).toBeLessThanOrEqual(30);
});