import React from 'react';

export default function FactorTable({ data }) {
  if (!data) return null;

  return (
    <div className="table-container glass-panel animate-fade-in">
      <table>
        <thead>
          <tr>
            <th colSpan="4" className="main-header">PARENTAL LEGACY</th>
            <th colSpan="2" style={{ backgroundColor: 'transparent' }}></th>
          </tr>
          <tr>
            <th>LIFE FACTORS</th>
            <th>MOTHER</th>
            <th>FATHER</th>
            <th>TOTAL</th>
            <th>Minimum</th>
            <th>Maximum</th>
          </tr>
        </thead>
        <tbody>
          {data.factors.map((factor) => (
            <tr key={factor.id}>
              <td>{factor.name}</td>
              <td className="value-cell mother-value">{factor.mother.toFixed(3)}</td>
              <td className="value-cell father-value">{factor.father.toFixed(3)}</td>
              <td className="value-cell total-value">{factor.total.toFixed(3)}</td>
              <td className="value-cell">{factor.min.toFixed(3)}</td>
              <td className="value-cell">{factor.max.toFixed(3)}</td>
            </tr>
          ))}
          <tr className="row-total">
            <td>TOTAL</td>
            <td className="value-cell mother-value">{data.motherTotal.toFixed(3)}</td>
            <td className="value-cell father-value">{data.fatherTotal.toFixed(3)}</td>
            <td className="value-cell total-value" style={{ color: '#ef4444' }}>{data.grandTotal.toFixed(3)}</td>
            <td colSpan="2" style={{ fontSize: '0.85rem', fontWeight: 'normal', textAlign: 'center', lineHeight: '1.2' }}>
              Values of Brown figures will always change but the total of all will come to 100
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
