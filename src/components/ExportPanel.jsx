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
    const headers = ['Life Factor', 'Mother', 'Father', 'Total', 'Minimum', 'Maximum'];
    const rows = data.factors.map(f => [
      f.name,
      f.mother.toFixed(3),
      f.father.toFixed(3),
      f.total.toFixed(3),
      f.min.toFixed(3),
      f.max.toFixed(3)
    ]);
    
    // Add totals row
    rows.push([
      'TOTAL',
      data.motherTotal.toFixed(3),
      data.fatherTotal.toFixed(3),
      data.grandTotal.toFixed(3),
      '',
      ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

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
