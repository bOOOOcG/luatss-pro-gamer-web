import React from 'react';

export function Button({ children, className, onClick }) {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
