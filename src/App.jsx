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
  Hexagon
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
        <header className="flex-between" style={{ marginBottom: '40px' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
            Analytics / <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Test.xlsx</span>
          </div>
          <button onClick={handleExportPDF} className="btn">
            <Download size={16} />
            Export PDF
          </button>
        </header>

        {data && (
          <>
            {/* Control Section */}
            <section className="card flex-between" style={{ marginBottom: '24px' }}>
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
                  />
                </div>
                <button onClick={handleUpdateLogic} className="btn btn-primary">
                  <Zap size={16} />
                  Update Logic
                </button>
              </div>
            </section>

            {/* Summary Cards */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginBottom: '40px' }}>
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
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
