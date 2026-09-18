import React, { useState, useEffect } from 'react';
import { 
  UploadCloud, 
  BarChart2, 
  Grid, 
  FileText, 
  Download, 
  Calendar as CalendarIcon,
  Activity,
  Zap,
  Hexagon,
  FileSpreadsheet,
  Save
} from 'lucide-react';
import { calculateLegacy } from './utils/calculator';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './index.css';

function App() {
  // Use today's date as default to show the UI immediately
  const [dob, setDob] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState(calculateLegacy(new Date().toISOString().split('T')[0]));

  const handleDateSelect = (e) => {
    const value = e.target.value;
    setDob(value);
  };

  const handleUpdateLogic = () => {
    if (dob) {
      setData(calculateLegacy(dob));
    }
  };

  const handleExportPDF = async () => {
    const element = document.getElementById('dashboard-content');
    if (!element) return;
    
    // Add a class temporarily to fix styling for PDF if needed
    element.style.background = '#0a0a0a';
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#0a0a0a'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Quantum_Vedic_Legacy_${dob}.pdf`);
    } catch (err) {
      console.error('Error generating PDF', err);
    } finally {
      element.style.background = '';
    }
  };

  const handleExportCSV = () => {
    if (!data) return;
    const rows = [];
    rows.push(['', 'PARENTAL LEGACY', '', '', '', '', '"Mother Value will be Higher on Dates- 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,and 31"']);
    rows.push(['LIFE FACTORS', 'MOTHER', 'FATHER', 'TOTAL', 'Minimum', 'Maximum', '"Father Value will be Higher on Dates - 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28 and 30 of the Month."']);
    data.factors.forEach(f => {
      rows.push([f.name, f.mother.toFixed(3), f.father.toFixed(3), f.total.toFixed(3), f.min.toFixed(3), f.max.toFixed(3), '']);
    });
    rows.push(['TOTAL', data.motherTotal.toFixed(3), data.fatherTotal.toFixed(3), data.grandTotal.toFixed(3), '"Values of Brown figures will always change but the total of all will come to 100"', '', '']);

    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Quantum_Vedic_Legacy_${dob}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [savedMessage, setSavedMessage] = useState('');
  
  const handleSaveResult = async () => {
    if (dob && data) {
      try {
        const response = await fetch('http://localhost:5000/api/results/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dob, data })
        });
        
        if (response.ok) {
          setSavedMessage('Result saved successfully to database!');
          setTimeout(() => setSavedMessage(''), 3000);
        } else {
          setSavedMessage('Failed to save. Ensure backend is running.');
          setTimeout(() => setSavedMessage(''), 3000);
        }
      } catch (err) {
        console.error(err);
        setSavedMessage('Error connecting to backend.');
        setTimeout(() => setSavedMessage(''), 3000);
      }
    }
  };

  // Calculate percentage difference
  const diffPercent = data ? (Math.abs(data.motherTotal - data.fatherTotal) / ((data.motherTotal + data.fatherTotal) / 2) * 100).toFixed(2) : 0;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">
            <Hexagon size={20} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', margin: 0, fontWeight: 700 }}>Quantum Vedic</h2>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Legacy Analysis</p>
          </div>
        </div>

        <nav>
          <div className="nav-item">
            <UploadCloud />
            <span>Upload Data</span>
          </div>
          <div className="nav-item active">
            <BarChart2 />
            <span>Analytics</span>
          </div>
          <div className="nav-item">
            <Grid />
            <span>Career Matrix</span>
          </div>
          <div className="nav-item">
            <FileText />
            <span>Reports</span>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content" id="dashboard-content">
        <header className="flex-between top-bar" style={{ marginBottom: '40px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
            Analytics / <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Test.xlsx</span>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onClick={handleExportCSV} className="btn" style={{ borderColor: 'var(--color-accent)' }}>
              <FileSpreadsheet size={16} color="var(--color-accent)" />
              Export CSV
            </button>
            <button onClick={handleExportPDF} className="btn">
              <Download size={16} />
              Export PDF
            </button>
            <button onClick={handleSaveResult} className="btn btn-primary">
              <Save size={16} />
              Save Result
            </button>
          </div>
        </header>
        {savedMessage && (
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '8px', marginBottom: '24px', textAlign: 'center', fontWeight: 'bold' }}>
            {savedMessage}
          </div>
        )}

        {data && (
          <>
            {/* Control Section */}
            <section className="card flex-between control-section" style={{ marginBottom: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>Dynamic Analysis Logic</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  Changing the candidate's Date of Birth will automatically recalculate maternal/paternal dominance limits.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border-color)', padding: '8px 12px', borderRadius: '8px' }}>
                  <CalendarIcon size={16} color="var(--text-secondary)" />
                  <input 
                    type="date" 
                    value={dob}
                    onChange={handleDateSelect}
                    className="date-input"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <button onClick={handleUpdateLogic} className="btn btn-primary">
                  <Zap size={16} />
                  Update Logic
                </button>
              </div>
            </section>

            {/* Summary Cards */}
            <section className="summary-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
              <div className="card">
                <div className="flex-between">
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Mother's Influence</h4>
                  <div className="icon-box icon-box-mother">
                    <Activity size={20} />
                  </div>
                </div>
                <div className="value-display">{data.motherTotal.toFixed(3)}</div>
              </div>

              <div className="card">
                <div className="flex-between">
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Father's Influence</h4>
                  <div className="icon-box icon-box-father">
                    <Activity size={20} />
                  </div>
                </div>
                <div className="value-display">{data.fatherTotal.toFixed(3)}</div>
              </div>

              <div className="card">
                <div className="flex-between">
                  <h4 style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Dominant Parent</h4>
                  <div className="icon-box icon-box-accent">
                    <Zap size={20} />
                  </div>
                </div>
                <div className="value-display">{data.dominantParent}</div>
                <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                  {diffPercent}% Difference
                </div>
              </div>
            </section>

            {/* Data Table */}
            <section>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '24px' }}>Detailed Factor Breakdown</h3>
              <div className="table-responsive">
                <table className="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Life Factor</th>
                    <th className="text-mother">Mother Influence</th>
                    <th className="text-father">Father Influence</th>
                    <th>Total Combined</th>
                  </tr>
                </thead>
                <tbody>
                  {data.factors.map((f, i) => (
                    <tr key={f.id}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: 600 }}>{f.name}</td>
                      <td>{f.mother.toFixed(3)}</td>
                      <td>{f.father.toFixed(3)}</td>
                      <td>{f.total.toFixed(3)}</td>
                    </tr>
                  ))}
                  <tr style={{ background: 'transparent' }}>
                    <td colSpan="5" style={{ height: '8px', padding: 0, border: 'none', background: 'transparent' }}></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td style={{ fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>TOTAL</td>
                    <td className="text-mother" style={{ fontWeight: 800 }}>{data.motherTotal.toFixed(3)}</td>
                    <td className="text-father" style={{ fontWeight: 800 }}>{data.fatherTotal.toFixed(3)}</td>
                    <td className="text-accent" style={{ fontWeight: 800 }}>{data.grandTotal.toFixed(3)}</td>
                  </tr>
                </tbody>
              </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
