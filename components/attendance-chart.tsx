'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Mon', present: 48, late: 2, absent: 1, wfh: 1 },
  { name: 'Tue', present: 47, late: 3, absent: 1, wfh: 1 },
  { name: 'Wed', present: 49, late: 1, absent: 0, wfh: 2 },
  { name: 'Thu', present: 46, late: 2, absent: 2, wfh: 2 },
  { name: 'Fri', present: 48, late: 2, absent: 1, wfh: 1 },
  { name: 'Sat', present: 25, late: 0, absent: 0, wfh: 27 },
  { name: 'Sun', present: 5, late: 0, absent: 0, wfh: 47 },
];

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Weekly Attendance Trends</CardTitle>
            <CardDescription>Employee attendance breakdown for the last 7 days</CardDescription>
          </div>
          <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
            <TrendingUp className="size-4" />
            <span className="font-medium">+5.2%</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              cursor={{ fill: 'hsl(var(--muted))' }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
              iconType="circle"
            />
            <Bar 
              dataKey="present" 
              stackId="a"
              fill="hsl(142 76% 36%)" 
              radius={[0, 0, 0, 0]}
              name="Present"
            />
            <Bar 
              dataKey="late" 
              stackId="a"
              fill="hsl(38 92% 50%)" 
              radius={[0, 0, 0, 0]}
              name="Late"
            />
            <Bar 
              dataKey="wfh" 
              stackId="a"
              fill="hsl(262 83% 58%)" 
              radius={[0, 0, 0, 0]}
              name="WFH"
            />
            <Bar 
              dataKey="absent" 
              stackId="a"
              fill="hsl(0 84% 60%)" 
              radius={[4, 4, 0, 0]}
              name="Absent"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}