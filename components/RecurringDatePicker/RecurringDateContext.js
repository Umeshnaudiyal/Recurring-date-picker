'use client';

import { createContext, useContext, useReducer } from 'react';

const RecurringDateContext = createContext();

const initialState = {
  startDate: new Date().toISOString().split('T')[0],
  frequency: 'daily',
  interval: 1,
  daysOfWeek: [],
  monthlyType: 'date', // 'date' or 'day'
  endType: 'never', // 'never', 'date', 'count'
  endDate: '',
  endCount: 1,
  upcomingDates: []
};

function recurringDateReducer(state, action) {
  switch (action.type) {
    case 'SET_START_DATE':
      return { ...state, startDate: action.payload };
    case 'SET_FREQUENCY':
      return { 
        ...state, 
        frequency: action.payload,
        daysOfWeek: action.payload === 'weekly' ? state.daysOfWeek : []
      };
    case 'SET_INTERVAL':
      return { ...state, interval: action.payload };
    case 'SET_DAYS_OF_WEEK':
      return { ...state, daysOfWeek: action.payload };
    case 'SET_MONTHLY_TYPE':
      return { ...state, monthlyType: action.payload };
    case 'SET_END_TYPE':
      return { ...state, endType: action.payload };
    case 'SET_END_DATE':
      return { ...state, endDate: action.payload };
    case 'SET_END_COUNT':
      return { ...state, endCount: action.payload };
    case 'SET_UPCOMING_DATES':
      return { ...state, upcomingDates: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function RecurringDateProvider({ children }) {
  const [state, dispatch] = useReducer(recurringDateReducer, initialState);

  return (
    <RecurringDateContext.Provider value={{ state, dispatch }}>
      {children}
    </RecurringDateContext.Provider>
  );
}

export function useRecurringDate() {
  const context = useContext(RecurringDateContext);
  if (!context) {
    throw new Error('useRecurringDate must be used within a RecurringDateProvider');
  }
  return context;
}