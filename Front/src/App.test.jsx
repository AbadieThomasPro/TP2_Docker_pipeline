import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
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

  it('displays the message fetched from the backend', async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText('Hello from the backend!')).toBeTruthy();
    });
  });
});
