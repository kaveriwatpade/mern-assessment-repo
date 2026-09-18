import React from 'react';
import { Download, FileSpreadsheet, Save } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function ExportPanel({ data, dob, onSave }) {
  if (!data) return null;

  const handleExportPDF = async () => {
    const element = document.getElementById('dashboard-content');
    if (!element) return;
    
    // Add a class temporarily to fix styling for PDF if needed
    element.style.background = 'white';
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Legacy_Factors_${dob}.pdf`);
    } catch (err) {
      console.error('Error generating PDF', err);
    } finally {
      element.style.background = '';
    }
  };

  const handleExportCSV = () => {
    const rows = [];
    
    // Row 1
    rows.push([
      '', 
      'PARENTAL LEGACY', 
      '', 
      '', 
      '', 
      '', 
      '"Mother Value will be Higher on Dates- 1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,and 31"'
    ]);
    
    // Row 2 (Headers)
    rows.push([
      'LIFE FACTORS', 
      'MOTHER', 
      'FATHER', 
      'TOTAL', 
      'Minimum', 
      'Maximum', 
      '"Father Value will be Higher on Dates - 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28 and 30 of the Month."'
    ]);
    
    // Data Rows
    data.factors.forEach(f => {
      rows.push([
        f.name,
        f.mother.toFixed(3),
        f.father.toFixed(3),
        f.total.toFixed(3),
        f.min.toFixed(3),
        f.max.toFixed(3),
        ''
      ]);
    });
    
    // Totals Row
    rows.push([
      'TOTAL',
      data.motherTotal.toFixed(3),
      data.fatherTotal.toFixed(3),
      data.grandTotal.toFixed(3),
      '"Values of Brown figures will always change but the total of all will come to 100"',
      '',
      ''
    ]);

    const csvContent = rows.map(r => r.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Legacy_Factors_${dob}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-4 items-center justify-center mt-8 animate-fade-in">
      <button onClick={handleExportPDF} className="btn btn-primary" title="Export as PDF">
        <Download size={18} /> PDF
      </button>
      <button onClick={handleExportCSV} className="btn btn-primary" style={{ backgroundColor: '#10b981' }} title="Export as CSV">
        <FileSpreadsheet size={18} /> CSV
      </button>
      <button onClick={onSave} className="btn btn-primary" style={{ backgroundColor: '#f59e0b' }} title="Save to Local Storage">
        <Save size={18} /> Save Result
      </button>
    </div>
  );
}
