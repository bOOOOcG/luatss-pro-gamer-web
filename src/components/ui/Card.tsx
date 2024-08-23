import React from 'react';

export function Card({ children, className }) {
  return <div className={`card ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={`card-content ${className}`}>{children}</div>;
}
