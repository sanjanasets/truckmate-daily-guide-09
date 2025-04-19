
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GrowthData {
  day: string;
  sales: number;
  customers: number;
}

interface GrowthChartProps {
  data: GrowthData[];
}

const GrowthChart: React.FC<GrowthChartProps> = ({ data }) => {
  return (
    <div className="tm-card h-80 mb-4">
      <h3 className="font-bold text-truckmate-green mb-4">Weekly Performance</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00A6A6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00A6A6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F49F0A" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#F49F0A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#00A6A6"
            fillOpacity={1}
            fill="url(#colorSales)"
            name="Sales ($)"
          />
          <Area
            type="monotone"
            dataKey="customers"
            stroke="#F49F0A"
            fillOpacity={1}
            fill="url(#colorCustomers)"
            name="Customers"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthChart;
