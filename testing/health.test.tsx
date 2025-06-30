import { render, screen, waitFor, fireEvent } from '@testing-library/react-native';
import Health from '../app/(mtg)/health';

test('Increases and decreases health for a player. Other player testing not required as the code is the same.', async () => {

  render(<Health />);

  // Set the size.height via the onLayout event
  const player1Text = screen.getByText('Player 1');
  const player1AnimatedView = player1Text.parent?.parent;
  if (!player1AnimatedView) {
    throw new Error("Could not find Player 1's animated view");
  }
  fireEvent(player1AnimatedView, 'layout', {
    nativeEvent: { layout: { width: 100, height: 300 } }
  });

  // Player 1 press simulation
  const player1Pressable = screen.getByText('Player 1').parent;
  if (!player1Pressable) {
    throw new Error("Could not find Player 1's pressable parent");
  }
  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 250 }
  });

  const player1Decrease = await waitFor(() =>
    screen.getByText('+ 19 -')
  );

  expect(player1Decrease).toBeTruthy();

  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 70 }
  });

  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 70 }
  });

  const player1Increase = await waitFor(() =>
    screen.getByText('+ 21 -')
  );

  expect(player1Increase).toBeTruthy();

});

test('Tests if different starting health is applied', async () => {

  render(<Health />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  fireEvent.press(screen.getByText('25'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  const player1Text = screen.getByText('Player 1');
  const player1AnimatedView = player1Text.parent?.parent;
  if (!player1AnimatedView) {
    throw new Error("Could not find Player 1's animated view");
  }
  fireEvent(player1AnimatedView, 'layout', {
    nativeEvent: { layout: { width: 100, height: 300 } }
  });

  // Player 1 press simulation
  const player1Pressable = screen.getByText('Player 1').parent;
  if (!player1Pressable) {
    throw new Error("Could not find Player 1's pressable parent");
  }
  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 250 }
  });

  const player1Decrease = await waitFor(() =>
    screen.getByText('+ 24 -')
  );

  expect(player1Decrease).toBeTruthy();

  }
)

test('Tests if commander damage can be applied between players', async () => {

  render(<Health />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  fireEvent.press(screen.getByText('2'));

  const player1TextInstances = screen.getAllByText('+ 0 -');
  const player1Text = player1TextInstances[0];
  const player1AnimatedView = player1Text.parent?.parent;
  if (!player1AnimatedView) {
    throw new Error("Could not find Player 1's animated view");
  }
  fireEvent(player1AnimatedView, 'layout', {
    nativeEvent: { layout: { width: 100, height: 300 } }
  });

  // Player 1 press simulation
  const player1Pressable = screen.getAllByText('+ 0 -')[0].parent;
  if (!player1Pressable) {
    throw new Error("Could not find Player 1's pressable parent");
  }
  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 50 }
  });

  const player1Increase = await waitFor(() =>
    screen.getByText('+ 1 -')
  );

  expect(player1Increase).toBeTruthy();

  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 250 }
  });

  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 250 }
  });

  const player1Decrease = await waitFor(() =>
    screen.getByText('+ -1 -')
  );

  expect(player1Decrease).toBeTruthy();

  fireEvent.press(screen.getByText('1'));

  // Player 2 test simulation
  const player2TextInstances = screen.getAllByText('+ 0 -');
  const player2Text = player2TextInstances[0];
  const player2AnimatedView = player2Text.parent?.parent;
  if (!player2AnimatedView) {
    throw new Error("Could not find Player 2's animated view");
  }
  fireEvent(player2AnimatedView, 'layout', {
    nativeEvent: { layout: { width: 100, height: 300 } }
  });

  // Player 2 press simulation
  const player2Pressable = screen.getAllByText('+ 0 -')[0].parent;
  if (!player2Pressable) {
    throw new Error("Could not find Player 2's pressable parent");
  }
  fireEvent.press(player2Pressable, {
    nativeEvent: { locationY: 50 }
  });

  const player2Increase = await waitFor(() =>
    screen.getByText('+ 1 -')
  );

  expect(player2Increase).toBeTruthy();

  fireEvent.press(player2Pressable, {
    nativeEvent: { locationY: 250 }
  });

  fireEvent.press(player2Pressable, {
    nativeEvent: { locationY: 250 }
  });

  const player2Decrease = await waitFor(() =>
    screen.getByText('+ -1 -')
  );

  expect(player2Decrease).toBeTruthy();

  }
)

test('Tests if commander damage resets between players', async () => {

  render(<Health />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  fireEvent.press(screen.getByText('2'));

  const player1TextInstances = screen.getAllByText('+ 0 -');
  const player1Text = player1TextInstances[0];
  const player1AnimatedView = player1Text.parent?.parent;
  if (!player1AnimatedView) {
    throw new Error("Could not find Player 1's animated view");
  }
  fireEvent(player1AnimatedView, 'layout', {
    nativeEvent: { layout: { width: 100, height: 300 } }
  });

  // Player 1 press simulation
  const player1Pressable = screen.getAllByText('+ 0 -')[0].parent;
  if (!player1Pressable) {
    throw new Error("Could not find Player 1's pressable parent");
  }
  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 50 }
  });

  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 250 }
  });

  fireEvent.press(player1Pressable, {
    nativeEvent: { locationY: 250 }
  });

  fireEvent.press(screen.getByText('1'));

  // Player 2 test simulation
  const player2TextInstances = screen.getAllByText('+ 0 -');
  const player2Text = player2TextInstances[0];
  const player2AnimatedView = player2Text.parent?.parent;
  if (!player2AnimatedView) {
    throw new Error("Could not find Player 2's animated view");
  }
  fireEvent(player2AnimatedView, 'layout', {
    nativeEvent: { layout: { width: 100, height: 300 } }
  });

  // Player 2 press simulation
  const player2Pressable = screen.getAllByText('+ 0 -')[0].parent;
  if (!player2Pressable) {
    throw new Error("Could not find Player 2's pressable parent");
  }
  fireEvent.press(player2Pressable, {
    nativeEvent: { locationY: 50 }
  });

  fireEvent.press(player2Pressable, {
    nativeEvent: { locationY: 250 }
  });

  fireEvent.press(player2Pressable, {
    nativeEvent: { locationY: 250 }
  });

  fireEvent.press(screen.getByText('40'));

  const player2Reset = await waitFor(() =>
  screen.getAllByText('+ 0 -')[0]
  );

  expect(player2Reset).toBeTruthy();

  fireEvent.press(screen.getByText('2'));

  const player1Reset = await waitFor(() =>
    screen.getAllByText('+ 0 -')[0]
  );

  expect(player1Reset).toBeTruthy();

  }
)