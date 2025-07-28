import { render, screen, fireEvent, waitFor, cleanup, act } from '@testing-library/react-native';
import Session from '../app/(dnd)/session';
import { Alert } from 'react-native';

afterEach(() => cleanup());

// Mocks the Supabase client to avoid network requests. I had to mock the entire module because of how the Supabase client is structured.
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: { user: { id: 'mock-user-id' } },
        error: null,
      }),
    },
    // Mocks the structure of the Supabase session summaries table
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          order: jest.fn().mockResolvedValue({
            data: [
              {
                id: '1',
                session_name: 'Mock Session',
                session_description: 'A test summary',
                session_points: ['Point 1', 'Point 2'],
                user_id: 'mock-user-id',
              },
            ],
            error: null,
          }),
        })),
      })),
      // Mocks the insert method for adding a new session summary
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn().mockResolvedValue({
            data: {
              id: '2',
              session_name: 'Test Session',
              session_description: 'Created in test',
              session_points: ['New Point'],
              user_id: 'mock-user-id',
            },
            error: null,
          }),
        })),
      })),
      // Mocks the delete method for removing a session summary
      delete: jest.fn(() => ({
        eq: jest.fn(() => Promise.resolve({ data: null, error: null })),
      })),
    })),
  },
}));

test('Adds a new session summary for the user', async () => {

  const { getByPlaceholderText, getByText, queryByText } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs the session name, points, and description
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), 'New Session');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), 'Point 1');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), 'Session Description');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('Test Session')).toBeTruthy();
    expect(queryByText('• Point 1')).toBeTruthy();
    expect(queryByText('Session Description')).toBeTruthy();
  });

});

test('Adds a new session summary with missing title', async () => {

  const { getByPlaceholderText, getByText, queryByText } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs the session name, points, and description
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), '');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), 'Point 1');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), 'Session Description');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('')).toBeTruthy();
    expect(queryByText('• Point 1')).toBeTruthy();
    expect(queryByText('Session Description')).toBeTruthy();
  });

});

test('Adds a new session summary with missing points', async () => {

  const { getByPlaceholderText, getByText, queryByText } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs the session name, points, and description
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), 'New Session');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), '');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), 'Session Description');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('Test Session')).toBeTruthy();
    expect(queryByText('')).toBeTruthy();
    expect(queryByText('Session Description')).toBeTruthy();
  });

});

test('Adds a new session summary with missing description', async () => {

  const { getByPlaceholderText, getByText, queryByText } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs the session name, points, and description
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), 'New Session');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), 'Point 1');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), '');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('Test Session')).toBeTruthy();
    expect(queryByText('• Point 1')).toBeTruthy();
    expect(queryByText('')).toBeTruthy();
  });

});

test('Adds a new empty session summary', async () => {

  const { getByPlaceholderText, getByText, queryByText } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs the session name, points, and description
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), '');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), '');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), '');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('')).toEqual(3);
  });

});

test('Adds a new session summary with multiple points', async () => {

  const { getByPlaceholderText, getByText, queryByText } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs the session name, points, and description
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), 'New Session');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), 'Point 1{\n}Point 2');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), 'Description');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('Test Session')).toBeTruthy();
    expect(queryByText('• Point 1')).toBeTruthy();
    expect(queryByText('• Point 2')).toBeTruthy();
    expect(queryByText('Description')).toBeTruthy();
  });

});

test('Deletes an added session summary', async () => {

  jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  const { getByPlaceholderText, getByText, queryByText, findByTestId } = render(<Session />);

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu open button'));

  // Inputs info
  fireEvent.changeText(getByPlaceholderText("Session 1 - Dragon's Lair"), 'Test Session');
  fireEvent.changeText(getByPlaceholderText('• Killed the dragon...'), 'New Point');
  fireEvent.changeText(getByPlaceholderText('At the beginning of the session...'), 'Created in test');

  fireEvent.press(getByText('Submit'));

  fireEvent.press(screen.getByAccessibilityHint('Pop up menu close button'));

  // Waits for the new session summary to appear on screen
  waitFor(() => {
    expect(queryByText('Test Session')).toBeTruthy();
    expect(queryByText('• New Point')).toBeTruthy();
    expect(queryByText('Created in test')).toBeTruthy();
  });

  // Deletes the session summary
  const deleteButton = await findByTestId('delete-button-2');
  fireEvent.press(deleteButton);

  await act(() => Promise.resolve());

  // Deletes the summary - no need to mock accepting the alert, just that it works
  waitFor(() => {
    expect(screen.getByTestId('delete-button-2')).toBeNull();
  });

  // Still checks that an alert is called
  expect(Alert.alert).toHaveBeenCalledWith(
    "Delete Summary",
    "Are you sure you want to delete this summary?",
    expect.arrayContaining([
      expect.objectContaining({ text: "Cancel", style: "cancel" }),
      expect.objectContaining({ text: "Delete", style: "destructive" }),
    ]),
    expect.objectContaining({ cancelable: true }),
  );

});

test('Deletes an existing session summary', async () => {

  jest.spyOn(Alert, 'alert').mockImplementation(() => {});

  const { queryByText, findByTestId } = render(<Session />);

  // Checks if the existing session summary is displayed
  waitFor(() => {
    expect(queryByText('Mock Session')).toBeTruthy();
    expect(queryByText('• Point 1')).toBeTruthy();
    expect(queryByText('A test summary')).toBeTruthy();
  });

  // Deletes the existing session summary
  const deleteButton = await findByTestId('delete-button-1');
  fireEvent.press(deleteButton);

  await act(() => Promise.resolve());

  // Waits for the session summary to be removed from the screen
  waitFor(() => {
    expect(screen.getByTestId('delete-button-1')).toBeNull();
  });

  expect(Alert.alert).toHaveBeenCalledWith(
    "Delete Summary",
    "Are you sure you want to delete this summary?",
    expect.arrayContaining([
      expect.objectContaining({ text: "Cancel", style: "cancel" }),
      expect.objectContaining({ text: "Delete", style: "destructive" }),
    ]),
    expect.objectContaining({ cancelable: true }),
  );

});