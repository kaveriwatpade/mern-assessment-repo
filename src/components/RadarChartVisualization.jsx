import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function RadarChartVisualization({ data }) {
  if (!data) return null;

  const chartData = data.factors.map(f => ({
    subject: f.name.split(' ')[0], // Shorten name for chart
    Mother: f.mother,
    Father: f.father,
    fullMark: f.max
  }));

  return (
    <div className="glass-panel animate-fade-in" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '16px', color: 'var(--text-primary)' }}>Parental Legacy Comparison</h3>
      <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="var(--table-border)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <PolarRadiusAxis angle={30} domain={[0, 12]} tick={{ fill: 'var(--text-secondary)' }} />
            <Radar name="Mother" dataKey="Mother" stroke="var(--mother-color)" fill="var(--mother-color)" fillOpacity={0.5} />
            <Radar name="Father" dataKey="Father" stroke="var(--father-color)" fill="var(--father-color)" fillOpacity={0.5} />
            <Legend />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-primary)' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
