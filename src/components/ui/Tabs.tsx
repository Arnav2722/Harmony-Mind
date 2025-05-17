import React, { createContext, useContext, useState } from 'react';

type TabsContextValue = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a TabsProvider');
  }
  return context;
};

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className = '' }) => {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

type TabsListProps = {
  children: React.ReactNode;
  className?: string;
};

export const TabsList: React.FC<TabsListProps> = ({ children, className = '' }) => {
  return <div className={`flex space-x-1 ${className}`}>{children}</div>;
};

type TabsTriggerProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className = '' }) => {
  const { value: selectedValue, onValueChange } = useTabs();
  const isActive = selectedValue === value;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => onValueChange(value)}
      className={`${className} ${
        isActive 
          ? 'text-indigo-600 border-b-2 border-indigo-600 font-medium' 
          : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent'
      } transition-colors focus:outline-none`}
    >
      {children}
    </button>
  );
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
  className?: string;
};

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className = '' }) => {
  const { value: selectedValue } = useTabs();
  
  if (selectedValue !== value) {
    return null;
  }
  
  return (
    <div 
      role="tabpanel"
      className={className}
    >
      {children}
    </div>
  );
};