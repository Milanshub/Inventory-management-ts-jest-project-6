import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorBoundary from '../../components/ErrorBoundary';

const FaultyComponent = () => {
  throw new Error('Error test');
}; 

describe('ErroBoundary suit', () => {
  test('renders an error message when a component throw', () => {
    render(
      <ErrorBoundary>
        <FaultyComponent />
      </ErrorBoundary>
    ); 

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});