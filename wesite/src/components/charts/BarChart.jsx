import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function AnalyticsChart({data}) {
  return (
      <ResponsiveContainer height={300}>
        <BarChart data={data} >
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis dataKey="amt" stroke="#8884d8" />
          <Tooltip
            wrapperStyle={{ backgroundColor: '#ccc' }}
          />
          <Legend

            wrapperStyle={{
              
              backgroundColor: '#f5f5f5',
              border: '1px solid #d5d5d5',
              borderRadius: 3,
              lineHeight: '40px',
            }}
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="1 40" />
          <Bar dataKey="uv" fill="#8884d8" barSize={30} />
          <Bar dataKey="pv" fill="#82ca9d" barSize={30} />
          <Bar dataKey="amt" fill="#ffc658" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    
  );
}
