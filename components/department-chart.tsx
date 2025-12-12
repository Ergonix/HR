'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Users } from 'lucide-react';

const data = [
  { name: 'Tech Solutions Inc.', value: 15, color: 'hsl(217 91% 60%)' },
  { name: 'Global Innovations Ltd.', value: 12, color: 'hsl(142 76% 36%)' },
  { name: 'Digital Ventures', value: 8, color: 'hsl(38 92% 50%)' },
  { name: 'Data Analytics Pro', value: 7, color: 'hsl(262 83% 58%)' },
  { name: 'Software Dynamics', value: 6, color: 'hsl(330 81% 60%)' },
  { name: 'Others', value: 10, color: 'hsl(188 94% 37%)' },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null;

  return (
    <text 
      x={x} 
      y={y} 
      fill="white" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      style={{ fontSize: '12px', fontWeight: '600' }}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function DepartmentChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Distribution</CardTitle>
        <CardDescription>Employee distribution across companies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-4">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                innerRadius={60}
                fill="#8884d8"
                dataKey="value"
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="space-y-3">
          {data.map((company) => (
            <div key={company.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div 
                  className="size-3 rounded-full shrink-0"
                  style={{ backgroundColor: company.color }}
                />
                <span className="text-sm text-muted-foreground truncate">{company.name}</span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-medium">{company.value}</span>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {((company.value / total) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="size-4" />
            <span>Total Employees</span>
          </div>
          <span className="text-xl font-semibold">{total}</span>
        </div>
      </CardContent>
    </Card>
  );
}