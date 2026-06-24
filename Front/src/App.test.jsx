import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import App from './App.jsx';

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ message: 'Hello from the backend!' }),
    })
  );
});

afterEach(() => {
  cleanup();
});

describe('App', () => {
  it('renders the title', () => {
    render(<App />);
    expect(screen.getByText('TP2 - Docker Pipeline')).toBeTruthy();
  });

  it('does not call the backend until the button is clicked', () => {
    render(<App />);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('displays the message fetched from the backend after clicking the button', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getByText('Hello from the backend!')).toBeTruthy();
    });
  });

  it('displays the backend instance when present in the response', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: 'Hello from the backend!',
            instance: 'backend-replica-1',
          }),
      })
    );

    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => {
      expect(screen.getAllByText('backend-replica-1').length).toBeGreaterThan(0);
    });
  });
});
