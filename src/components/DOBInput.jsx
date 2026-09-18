import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function DOBInput({ onDateSelect }) {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setDate(value);
    
    if (!value) {
      setError('');
      return;
    }

    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      setError('Date of birth cannot be in the future.');
    } else {
      setError('');
      onDateSelect(value);
    }
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ maxWidth: '400px', margin: '0 auto' }}>
      <div className="input-group">
        <label htmlFor="dob" className="flex items-center gap-2">
          <Calendar size={18} />
          Enter your Date of Birth
        </label>
        <input 
          type="date" 
          id="dob" 
          value={date} 
          onChange={handleChange}
          className="input-field"
          max={new Date().toISOString().split('T')[0]}
        />
        {error && <span style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</span>}
      </div>
    </div>
  );
}
