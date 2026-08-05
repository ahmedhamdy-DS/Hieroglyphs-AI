'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: '4rem', textAlign: 'center' }}>
      <h2>Something went wrong!</h2>
      <p style={{ color: 'red', margin: '1rem 0' }}>
        Error: {error.message}
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          background: '#333',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
        }}
      >
        Try again
      </button>
    </div>
  );
}