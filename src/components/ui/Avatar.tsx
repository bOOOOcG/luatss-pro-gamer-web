import React from 'react';

export function Avatar({ children, className }) {
  return <div className={`avatar ${className}`}>{children}</div>;
}

export function AvatarImage({ src, alt, className }) {
  return <img src={src} alt={alt} className={`avatar-image ${className}`} />;
}

export function AvatarFallback({ children, className }) {
  return <div className={`avatar-fallback ${className}`}>{children}</div>;
}
