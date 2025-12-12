import { Calendar, Check, X, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';

const leaveRequests = [
  {
    id: 1,
    name: 'Jane Smith',
    employeeId: 'EMP-002',
    type: 'Annual Leave',
    dates: 'Dec 20-27',
    days: 8,
    avatar: 'JS',
    reason: 'Family vacation during Christmas holidays',
    appliedDate: '2 days ago',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    name: 'Sarah Davis',
    employeeId: 'EMP-006',
    type: 'Sick Leave',
    dates: 'Dec 14-16',
    days: 3,
    avatar: 'SD',
    reason: 'Medical checkup and treatment required',
    appliedDate: '1 day ago',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    name: 'John Doe',
    employeeId: 'EMP-001',
    type: 'Annual Leave',
    dates: 'Dec 28 - Jan 3',
    days: 7,
    avatar: 'JD',
    reason: 'Year-end vacation and New Year celebration',
    appliedDate: '5 hours ago',
    color: 'from-purple-500 to-purple-600',
  },
];

export function LeaveRequests() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pending Leave Requests</CardTitle>
            <CardDescription>Requires your approval</CardDescription>
          </div>
          <Badge variant="destructive" className="text-xs">
            {leaveRequests.length} Pending
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {leaveRequests.map((request) => (
          <div key={request.id} className="rounded-lg border-2 p-4 space-y-3 hover:border-primary/50 transition-colors">
            <div className="flex items-start gap-3">
              <Avatar className="size-12 border-2 border-background">
                <AvatarFallback className={`bg-gradient-to-br ${request.color} text-white`}>
                  {request.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{request.name}</div>
                    <div className="text-xs text-muted-foreground">{request.employeeId}</div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">
                    {request.type}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Calendar className="size-3" />
                  <span>{request.dates}</span>
                  <Badge variant="secondary" className="text-xs">
                    {request.days} {request.days === 1 ? 'day' : 'days'}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  <span>Applied {request.appliedDate}</span>
                </div>

                <div className="mt-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded border">
                  {request.reason}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" className="flex-1 gap-1" variant="default">
                <Check className="size-4" />
                Approve
              </Button>
              <Button size="sm" className="flex-1 gap-1" variant="outline">
                <X className="size-4" />
                Reject
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" className="w-full mt-2">
          View All Leave Requests
        </Button>
      </CardContent>
    </Card>
  );
}