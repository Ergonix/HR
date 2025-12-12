import { UserPlus, Calendar, Megaphone, Shield, CheckCircle2, XCircle, Clock, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

const activities = [
  {
    id: 1,
    type: 'employee',
    action: 'New Employee Added',
    details: 'Lisa Anderson joined as Data Scientist',
    company: 'Data Analytics Pro',
    time: '2 hours ago',
    icon: UserPlus,
    color: 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400',
    badge: 'New',
    badgeColor: 'default',
  },
  {
    id: 2,
    type: 'leave',
    action: 'Leave Request Approved',
    details: 'Jane Smith - Annual Leave (8 days)',
    company: 'Tech Solutions Inc.',
    time: '3 hours ago',
    icon: CheckCircle2,
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400',
    badge: 'Approved',
    badgeColor: 'default',
  },
  {
    id: 3,
    type: 'announcement',
    action: 'New Announcement Posted',
    details: 'Holiday Schedule Update - High Priority',
    company: 'Tech Solutions Inc.',
    time: '5 hours ago',
    icon: Megaphone,
    color: 'bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400',
    badge: 'High',
    badgeColor: 'destructive',
  },
  {
    id: 4,
    type: 'leave',
    action: 'Leave Request Rejected',
    details: 'David Wilson - Casual Leave (2 days)',
    company: 'Digital Ventures',
    time: '6 hours ago',
    icon: XCircle,
    color: 'bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400',
    badge: 'Rejected',
    badgeColor: 'destructive',
  },
  {
    id: 5,
    type: 'role',
    action: 'Role Permissions Updated',
    details: 'Manager role - Added 2 new permissions',
    company: 'System',
    time: '8 hours ago',
    icon: Shield,
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400',
    badge: 'Updated',
    badgeColor: 'secondary',
  },
  {
    id: 6,
    type: 'attendance',
    action: 'Daily Attendance Synced',
    details: 'Processed 48 employee records',
    company: 'System',
    time: '9 hours ago',
    icon: Clock,
    color: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-950 dark:text-cyan-400',
    badge: 'System',
    badgeColor: 'outline',
  },
  {
    id: 7,
    type: 'employee',
    action: 'Employee Updated',
    details: 'John Doe - Phone number and address changed',
    company: 'Tech Solutions Inc.',
    time: '12 hours ago',
    icon: UserPlus,
    color: 'bg-orange-100 text-orange-600 dark:bg-orange-950 dark:text-orange-400',
    badge: 'Modified',
    badgeColor: 'secondary',
  },
  {
    id: 8,
    type: 'report',
    action: 'Weekly Report Generated',
    details: 'Attendance & Performance Summary',
    company: 'System',
    time: '1 day ago',
    icon: FileText,
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400',
    badge: 'Report',
    badgeColor: 'outline',
  },
];

export function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest system updates and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-3">
            {activities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div 
                  key={activity.id} 
                  className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className={`size-10 ${activity.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-medium">{activity.action}</span>
                      <Badge variant={activity.badgeColor as any} className="text-xs shrink-0">
                        {activity.badge}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {activity.details}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{activity.company}</span>
                      <span>•</span>
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
        
        <Button variant="outline" className="w-full mt-4">
          View All Activities
        </Button>
      </CardContent>
    </Card>
  );
}