import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import DOBInput from './components/DOBInput';
import FactorTable from './components/FactorTable';
import RadarChartVisualization from './components/RadarChartVisualization';
import ExportPanel from './components/ExportPanel';
import { calculateLegacy } from './utils/calculator';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light');
  const [dob, setDob] = useState('');
  const [data, setData] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  // Apply theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleDateSelect = (selectedDob) => {
    setDob(selectedDob);
    if (selectedDob) {
      const result = calculateLegacy(selectedDob);
      setData(result);
      setSavedMessage('');
    } else {
      setData(null);
    }
  };

  const handleSaveResult = () => {
    if (dob && data) {
      const savedResults = JSON.parse(localStorage.getItem('savedResults') || '[]');
      savedResults.push({ dob, date: new Date().toISOString(), data });
      localStorage.setItem('savedResults', JSON.stringify(savedResults));
      
      setSavedMessage('Result saved successfully!');
      setTimeout(() => setSavedMessage(''), 3000);
    }
  };

  return (
    <div className="container">
      <header className="flex justify-between items-center mb-8">
        <div className="glass-panel" style={{ padding: '12px 24px', flex: 1 }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Parental Legacy & Life Factors Calculator</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Discover the balance of your inherited traits.</p>
        </div>
        <button 
          onClick={toggleTheme} 
          className="btn-icon glass-panel" 
          style={{ marginLeft: '16px', padding: '12px', borderRadius: '50%' }}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
        </button>
      </header>

      <main>
        <section className="mb-8">
          <DOBInput onDateSelect={handleDateSelect} />
        </section>

        {data && (
          <div id="dashboard-content" className="animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="glass-panel" style={{ padding: '12px 24px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>
                  Based on your Date of Birth ({dob}), the dominant parent is:{' '}
                  <span className={`dominant-badge ${data.dominantParent === 'Mother' ? 'dominant-mother' : 'dominant-father'}`}>
                    {data.dominantParent}
                  </span>
                </p>
              </div>
            </div>

            <div className="dashboard-grid">
              <FactorTable data={data} />
              <RadarChartVisualization data={data} />
            </div>

            <ExportPanel data={data} dob={dob} onSave={handleSaveResult} />
            
            {savedMessage && (
              <p style={{ textAlign: 'center', marginTop: '16px', color: '#10b981', fontWeight: 600 }} className="animate-fade-in">
                {savedMessage}
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
