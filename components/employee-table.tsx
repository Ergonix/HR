import { Mail, Phone, MapPin, Briefcase, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';

const employees = [
  {
    id: 1,
    name: 'John Doe',
    employeeId: 'EMP-001',
    email: 'john.doe@techsolutions.com',
    phone: '+1-555-0101',
    company: 'Tech Solutions Inc.',
    position: 'Software Engineer',
    status: 'Active',
    avatar: 'JD',
    todayStatus: 'Present',
    checkIn: '09:00 AM',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    name: 'Jane Smith',
    employeeId: 'EMP-002',
    email: 'jane.smith@techsolutions.com',
    phone: '+1-555-0102',
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer',
    status: 'Active',
    avatar: 'JS',
    todayStatus: 'Late',
    checkIn: '09:15 AM',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    employeeId: 'EMP-003',
    email: 'michael.j@globalinnovations.com',
    phone: '+1-555-0103',
    company: 'Global Innovations',
    position: 'Project Manager',
    status: 'Active',
    avatar: 'MJ',
    todayStatus: 'Present',
    checkIn: '08:45 AM',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 4,
    name: 'Emily Brown',
    employeeId: 'EMP-004',
    email: 'emily.brown@globalinnovations.com',
    phone: '+1-555-0104',
    company: 'Global Innovations',
    position: 'UI/UX Designer',
    status: 'Active',
    avatar: 'EB',
    todayStatus: 'Half Day',
    checkIn: '10:00 AM',
    color: 'from-pink-500 to-pink-600',
  },
  {
    id: 5,
    name: 'Sarah Davis',
    employeeId: 'EMP-006',
    email: 'sarah.davis@digitalventures.com',
    phone: '+1-555-0106',
    company: 'Digital Ventures',
    position: 'DevOps Engineer',
    status: 'Active',
    avatar: 'SD',
    todayStatus: 'WFH',
    checkIn: '09:00 AM',
    color: 'from-orange-500 to-orange-600',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Present':
      return 'default';
    case 'Late':
      return 'secondary';
    case 'Half Day':
      return 'outline';
    case 'WFH':
      return 'default';
    default:
      return 'secondary';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Present':
      return <CheckCircle2 className="size-3" />;
    case 'Late':
      return <Clock className="size-3" />;
    case 'Half Day':
      return <Clock className="size-3" />;
    case 'WFH':
      return <CheckCircle2 className="size-3" />;
    default:
      return null;
  }
};

export function EmployeeTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Today's Employee Overview</CardTitle>
            <CardDescription>Real-time attendance and employee status</CardDescription>
          </div>
          <Button>View All Employees</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {employees.map((employee) => (
            <div 
              key={employee.id}
              className="flex items-center gap-4 p-4 rounded-lg border-2 hover:border-primary/50 transition-all hover:shadow-md"
            >
              {/* Avatar */}
              <Avatar className="size-14 border-2 border-background">
                <AvatarFallback className={`bg-gradient-to-br ${employee.color} text-white`}>
                  {employee.avatar}
                </AvatarFallback>
              </Avatar>

              {/* Employee Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{employee.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {employee.employeeId}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <Briefcase className="size-3" />
                      <span>{employee.position}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={getStatusColor(employee.todayStatus)} 
                    className="flex items-center gap-1 shrink-0"
                  >
                    {getStatusIcon(employee.todayStatus)}
                    {employee.todayStatus}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Mail className="size-3" />
                    <span className="truncate">{employee.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="size-3" />
                    <span>{employee.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3" />
                    <span>{employee.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="size-3" />
                    <span>Check-in: {employee.checkIn}</span>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="shrink-0 hidden md:block">
                <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                  {employee.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Showing 5 of 58 employees</span>
          <Button variant="link" className="text-sm">
            View Complete List →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}