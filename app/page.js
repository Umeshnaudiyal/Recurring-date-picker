'use client';

import { RecurringDateProvider } from '@/components/RecurringDatePicker/RecurringDateContext';
import RecurringDatePicker from '@/components/RecurringDatePicker/RecurringDatePicker';
import { useState } from 'react';

export default function Home() {
  const [recurringRule, setRecurringRule] = useState(null);

  const handleRuleChange = (rule) => {
    setRecurringRule(rule);
    console.log('New recurring rule:', rule);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Recurring Date Picker
          </h1>
          <p className="text-gray-600 text-lg">
            Select recurring dates with flexible patterns.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <RecurringDateProvider>
              <RecurringDatePicker onRuleChange={handleRuleChange} />
            </RecurringDateProvider>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Current Configuration
            </h3>
            {recurringRule ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-500">Pattern:</span>
                  <span className="text-sm text-gray-900 capitalize">
                    {recurringRule.frequency}
                  </span>
                </div>
                {recurringRule.interval && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">Interval:</span>
                    <span className="text-sm text-gray-900">
                      Every {recurringRule.interval} {recurringRule.frequency}(s)
                    </span>
                  </div>
                )}
                {recurringRule.daysOfWeek && recurringRule.daysOfWeek.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">Days:</span>
                    <span className="text-sm text-gray-900">
                      {recurringRule.daysOfWeek.join(', ')}
                    </span>
                  </div>
                )}
                {recurringRule.endType && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">Ends:</span>
                    <span className="text-sm text-gray-900">
                      {recurringRule.endType === 'never' && 'Never'}
                      {recurringRule.endType === 'date' && `On ${recurringRule.endDate}`}
                      {recurringRule.endType === 'count' && `After ${recurringRule.endCount} occurrences`}
                    </span>
                  </div>
                )}
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">
                    Raw Configuration:
                  </h4>
                  <pre className="bg-gray-50 p-3 rounded-lg text-xs text-gray-700 overflow-auto">
                    {JSON.stringify(recurringRule, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                Configure a recurring pattern to see the details here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}