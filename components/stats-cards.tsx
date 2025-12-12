import { Users, UserCheck, Calendar, Megaphone, TrendingUp, Clock, Building2 } from 'lucide-react';
import { StatsCard } from './ui/reusable-cards';

const stats = [
  {
    label: 'Total Employees',
    value: '58',
    subValue: 'Active: 53',
    change: '+8 this month',
    trend: 'up',
    icon: Users,
    color: 'bg-gradient-to-br from-blue-500 to-blue-600',
    bgAccent: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    label: 'Today\'s Attendance',
    value: '92.3%',
    subValue: '48 / 52 Present',
    change: '+2.5% vs yesterday',
    trend: 'up',
    icon: UserCheck,
    color: 'bg-gradient-to-br from-green-500 to-green-600',
    bgAccent: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    label: 'Pending Leaves',
    value: '3',
    subValue: '7 Total Requests',
    change: '4 approved today',
    trend: 'down',
    icon: Calendar,
    color: 'bg-gradient-to-br from-orange-500 to-orange-600',
    bgAccent: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    label: 'Active Roles',
    value: '7',
    subValue: '1 Inactive',
    change: '18 permissions',
    trend: 'neutral',
    icon: Clock,
    color: 'bg-gradient-to-br from-purple-500 to-purple-600',
    bgAccent: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    label: 'Companies',
    value: '12',
    subValue: '9 Active',
    change: '+2 this quarter',
    trend: 'up',
    icon: Building2,
    color: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
    bgAccent: 'bg-cyan-50 dark:bg-cyan-950/20',
  },
  {
    label: 'Announcements',
    value: '6',
    subValue: '5 Active',
    change: '2 high priority',
    trend: 'neutral',
    icon: Megaphone,
    color: 'bg-gradient-to-br from-pink-500 to-pink-600',
    bgAccent: 'bg-pink-50 dark:bg-pink-950/20',
  },
  {
    label: 'Avg Work Hours',
    value: '8.7h',
    subValue: 'This Week',
    change: '+0.3h vs last week',
    trend: 'up',
    icon: TrendingUp,
    color: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    bgAccent: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    label: 'Report Logs',
    value: '156',
    subValue: 'Last 7 Days',
    change: '12 critical events',
    trend: 'neutral',
    icon: Clock,
    color: 'bg-gradient-to-br from-amber-500 to-amber-600',
    bgAccent: 'bg-amber-50 dark:bg-amber-950/20',
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatsCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          subValue={stat.subValue}
          change={stat.change}
          trend={stat.trend}
          icon={stat.icon}
          color={stat.color}
          bgAccent={stat.bgAccent}
        />
      ))}
    </div>
  );
}