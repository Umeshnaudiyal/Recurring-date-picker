'use client';

import { useRecurringDate } from './RecurringDateContext';
import FrequencySelector from './FrequencySelector';
import IntervalSelector from './IntervalSelector';
import WeeklyOptions from './WeeklyOptions';
import MonthlyOptions from './MonthlyOptions';
import EndOptions from './EndOptions';
import DatePreview from './DatePreview';
import { useEffect } from 'react';
import { generateUpcomingDates, createRecurringRule } from './utils';

export default function RecurringDatePicker({ onRuleChange }) {
  const { state, dispatch } = useRecurringDate();

  // Generate upcoming dates whenever configuration changes
  useEffect(() => {
    const dates = generateUpcomingDates(state);
    dispatch({ type: 'SET_UPCOMING_DATES', payload: dates });

    // Create and send the recurring rule to parent
    const rule = createRecurringRule(state);
    if (onRuleChange) {
      onRuleChange(rule);
    }
  }, [state.startDate, state.frequency, state.interval, state.daysOfWeek, 
      state.monthlyType, state.endType, state.endDate, state.endCount, onRuleChange, dispatch]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-semibold mb-2">Set Recurring Pattern</h2>
        <p className="text-blue-100">Configure when and how often this should repeat</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Start Date */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            value={state.startDate}
            onChange={(e) => dispatch({ type: 'SET_START_DATE', payload: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Frequency Selector */}
        <FrequencySelector />

        {/* Interval Selector */}
        <IntervalSelector />

        {/* Weekly Options */}
        {state.frequency === 'weekly' && <WeeklyOptions />}

        {/* Monthly Options */}
        {state.frequency === 'monthly' && <MonthlyOptions />}

        {/* End Options */}
        <EndOptions />

        {/* Date Preview */}
        <DatePreview />
      </div>
    </div>
  );
}