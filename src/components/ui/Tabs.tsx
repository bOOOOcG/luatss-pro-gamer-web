import React, { useState } from 'react';

export function Tabs({ children }) {
    return <div className="tabs-container">{children}</div>;
  }
  

export function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
}

export function TabsTrigger({ value, onClick, children }) {
  return (
    <button className="tabs-trigger" onClick={() => onClick(value)}>
      {children}
    </button>
  );
}

export function TabsContent({ value, activeTab, children }) {
  return activeTab === value ? <div className="tabs-content">{children}</div> : null;
}
