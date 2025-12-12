import { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, User, TrendingUp, CheckCircle2, XCircle, AlertCircle, Timer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Company {
  id: number;
  companyId: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface Employee {
  id: number;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  joinDate: string;
  status: 'Active' | 'Inactive';
  companyId: number;
  designationId: number;
  address: string;
  createdAt: string;
  updatedAt: string;
}

interface AttendanceRecord {
  id: number;
  attendanceId: string;
  employeeId: number;
  companyId: number;
  date: string;
  checkIn: string;
  checkOut: string;
  workHours: string;
  status: 'Present' | 'Late' | 'Absent' | 'Half Day' | 'On Leave' | 'Work From Home';
  location: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const initialCompanies: Company[] = [
  { id: 1, companyId: 'COM-001', name: 'TechCorp Solutions', description: 'Technology company', status: 'Active' },
  { id: 2, companyId: 'COM-002', name: 'Global Innovations Ltd', description: 'Consulting firm', status: 'Active' },
  { id: 3, companyId: 'COM-003', name: 'DataFlow Systems', description: 'Data analytics', status: 'Active' },
];

const initialEmployees: Employee[] = [
  { id: 1, employeeId: 'EMP-001', firstName: 'John', lastName: 'Doe', email: 'john@company.com', phone: '123-456-7890', dateOfBirth: '1990-01-15', joinDate: '2023-01-01', status: 'Active', companyId: 1, designationId: 1, address: '123 Main St', createdAt: '2023-01-01T09:00:00', updatedAt: '2023-01-01T09:00:00' },
  { id: 2, employeeId: 'EMP-002', firstName: 'Jane', lastName: 'Smith', email: 'jane@company.com', phone: '123-456-7891', dateOfBirth: '1992-03-20', joinDate: '2023-02-01', status: 'Active', companyId: 1, designationId: 2, address: '456 Oak Ave', createdAt: '2023-02-01T09:00:00', updatedAt: '2023-02-01T09:00:00' },
  { id: 3, employeeId: 'EMP-003', firstName: 'Mike', lastName: 'Johnson', email: 'mike@company.com', phone: '123-456-7892', dateOfBirth: '1988-07-10', joinDate: '2023-03-01', status: 'Active', companyId: 2, designationId: 3, address: '789 Pine St', createdAt: '2023-03-01T09:00:00', updatedAt: '2023-03-01T09:00:00' },
  { id: 4, employeeId: 'EMP-004', firstName: 'Sarah', lastName: 'Wilson', email: 'sarah@company.com', phone: '123-456-7893', dateOfBirth: '1991-11-25', joinDate: '2023-04-01', status: 'Active', companyId: 2, designationId: 4, address: '321 Elm St', createdAt: '2023-04-01T09:00:00', updatedAt: '2023-04-01T09:00:00' },
  { id: 5, employeeId: 'EMP-005', firstName: 'David', lastName: 'Brown', email: 'david@company.com', phone: '123-456-7894', dateOfBirth: '1989-05-30', joinDate: '2023-05-01', status: 'Active', companyId: 3, designationId: 5, address: '654 Maple Ave', createdAt: '2023-05-01T09:00:00', updatedAt: '2023-05-01T09:00:00' },
];

const initialAttendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    attendanceId: 'ATT-001',
    employeeId: 1,
    companyId: 1,
    date: '2024-12-11',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    workHours: '9h 0m',
    status: 'Present',
    location: 'Office - Floor 3',
    notes: 'On time',
    createdAt: '2024-12-11T09:00:00',
    updatedAt: '2024-12-11T18:00:00',
  },
  {
    id: 2,
    attendanceId: 'ATT-002',
    employeeId: 2,
    companyId: 1,
    date: '2024-12-11',
    checkIn: '09:15 AM',
    checkOut: '06:15 PM',
    workHours: '9h 0m',
    status: 'Late',
    location: 'Office - Floor 3',
    notes: 'Traffic delay',
    createdAt: '2024-12-11T09:15:00',
    updatedAt: '2024-12-11T18:15:00',
  },
  {
    id: 3,
    attendanceId: 'ATT-003',
    employeeId: 3,
    companyId: 2,
    date: '2024-12-11',
    checkIn: '08:45 AM',
    checkOut: '05:45 PM',
    workHours: '9h 0m',
    status: 'Present',
    location: 'Office - Floor 2',
    notes: 'Early arrival',
    createdAt: '2024-12-11T08:45:00',
    updatedAt: '2024-12-11T17:45:00',
  },
  {
    id: 4,
    attendanceId: 'ATT-004',
    employeeId: 4,
    companyId: 2,
    date: '2024-12-11',
    checkIn: '10:00 AM',
    checkOut: '02:00 PM',
    workHours: '4h 0m',
    status: 'Half Day',
    location: 'Office - Floor 2',
    notes: 'Medical appointment in afternoon',
    createdAt: '2024-12-11T10:00:00',
    updatedAt: '2024-12-11T14:00:00',
  },
  {
    id: 5,
    attendanceId: 'ATT-005',
    employeeId: 5,
    companyId: 3,
    date: '2024-12-11',
    checkIn: '-',
    checkOut: '-',
    workHours: '0h 0m',
    status: 'Absent',
    location: '-',
    notes: 'No show',
    createdAt: '2024-12-11T00:00:00',
    updatedAt: '2024-12-11T00:00:00',
  },
  {
    id: 6,
    attendanceId: 'ATT-006',
    employeeId: 1,
    companyId: 1,
    date: '2024-12-10',
    checkIn: '09:00 AM',
    checkOut: '06:00 PM',
    workHours: '9h 0m',
    status: 'Work From Home',
    location: 'Remote',
    notes: 'Working remotely',
    createdAt: '2024-12-10T09:00:00',
    updatedAt: '2024-12-10T18:00:00',
  },
  {
    id: 7,
    attendanceId: 'ATT-007',
    employeeId: 2,
    companyId: 1,
    date: '2024-12-10',
    checkIn: '09:05 AM',
    checkOut: '06:05 PM',
    workHours: '9h 0m',
    status: 'Present',
    location: 'Office - Floor 3',
    notes: 'On time',
    createdAt: '2024-12-10T09:05:00',
    updatedAt: '2024-12-10T18:05:00',
  },
  {
    id: 8,
    attendanceId: 'ATT-008',
    employeeId: 3,
    companyId: 2,
    date: '2024-12-10',
    checkIn: '-',
    checkOut: '-',
    workHours: '0h 0m',
    status: 'On Leave',
    location: '-',
    notes: 'Annual leave',
    createdAt: '2024-12-10T00:00:00',
    updatedAt: '2024-12-10T00:00:00',
  },
];

export function Attendance() {
  const [companies] = useState<Company[]>(initialCompanies);
  const [employees] = useState<Employee[]>(initialEmployees);
  const [attendanceRecords] = useState<AttendanceRecord[]>(initialAttendanceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [dateCategoryFilter, setDateCategoryFilter] = useState<string>('all');

  // Filter logic
  const filteredAttendanceRecords = useMemo(() => {
    return attendanceRecords.filter((attendance) => {
      const employee = employees.find(e => e.id === attendance.employeeId);
      const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : '';
      
      const matchesSearch = 
        attendance.attendanceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        attendance.notes.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || attendance.status === statusFilter;
      const matchesCompany = companyFilter === 'all' || attendance.companyId.toString() === companyFilter;
      
      // Date category filtering
      let matchesDateCategory = true;
      if (dateCategoryFilter !== 'all') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const attendanceDate = new Date(attendance.date);
        attendanceDate.setHours(0, 0, 0, 0);
        
        const diffTime = today.getTime() - attendanceDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        switch (dateCategoryFilter) {
          case 'today':
            matchesDateCategory = diffDays === 0;
            break;
          case 'yesterday':
            matchesDateCategory = diffDays === 1;
            break;
          case 'last7days':
            matchesDateCategory = diffDays >= 0 && diffDays <= 7;
            break;
          case 'last30days':
            matchesDateCategory = diffDays >= 0 && diffDays <= 30;
            break;
          case 'thisMonth':
            const attendanceMonth = attendanceDate.getMonth();
            const attendanceYear = attendanceDate.getFullYear();
            matchesDateCategory = attendanceMonth === today.getMonth() && attendanceYear === today.getFullYear();
            break;
        }
      }
      
      const matchesDate = !dateFilter || attendance.date === dateFilter;
      
      return matchesSearch && matchesStatus && matchesCompany && matchesDate && matchesDateCategory;
    });
  }, [attendanceRecords, searchTerm, statusFilter, companyFilter, dateFilter, dateCategoryFilter, employees]);

  // Group by date
  const groupedByDate = useMemo(() => {
    const groups: Record<string, AttendanceRecord[]> = {};
    
    filteredAttendanceRecords.forEach(record => {
      if (!groups[record.date]) {
        groups[record.date] = [];
      }
      groups[record.date].push(record);
    });
    
    // Sort dates in descending order (newest first)
    return Object.keys(groups)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
      .map(date => ({
        date,
        records: groups[date],
      }));
  }, [filteredAttendanceRecords]);

  const getCompanyName = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const getEmployeeById = (employeeId: number) => {
    return employees.find(e => e.id === employeeId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const compareDate = new Date(dateString);
    compareDate.setHours(0, 0, 0, 0);
    
    const diffTime = today.getTime() - compareDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'default';
      case 'Late':
        return 'secondary';
      case 'Absent':
        return 'destructive';
      case 'Half Day':
        return 'outline';
      case 'On Leave':
        return 'outline';
      case 'Work From Home':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle2 className="size-4" />;
      case 'Late':
        return <Clock className="size-4" />;
      case 'Absent':
        return <XCircle className="size-4" />;
      case 'Half Day':
        return <Timer className="size-4" />;
      case 'On Leave':
        return <Calendar className="size-4" />;
      case 'Work From Home':
        return <TrendingUp className="size-4" />;
      default:
        return <AlertCircle className="size-4" />;
    }
  };

  const getStatusBgColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900';
      case 'Late':
        return 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900';
      case 'Absent':
        return 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900';
      case 'Half Day':
        return 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900';
      case 'On Leave':
        return 'bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900';
      case 'Work From Home':
        return 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900';
      default:
        return 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-900';
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5" />
              <CardTitle>Attendance Tracker</CardTitle>
            </div>
            <CardDescription>Real-time employee attendance monitoring</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Search and Filter Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by employee, ID, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>

            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-[180px]"
            />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="size-4 text-muted-foreground" />

            <Select value={dateCategoryFilter} onValueChange={setDateCategoryFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last7days">Last 7 Days</SelectItem>
                <SelectItem value="last30days">Last 30 Days</SelectItem>
                <SelectItem value="thisMonth">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id.toString()}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Present">Present</SelectItem>
                <SelectItem value="Late">Late</SelectItem>
                <SelectItem value="Absent">Absent</SelectItem>
                <SelectItem value="Half Day">Half Day</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Work From Home">Work From Home</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Attendance Timeline */}
        <div className="rounded-md border bg-muted/30">
          <div className="bg-muted px-4 py-2 border-b">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredAttendanceRecords.length} attendance {filteredAttendanceRecords.length === 1 ? 'record' : 'records'}
              </span>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="p-4">
              {groupedByDate.length > 0 ? (
                groupedByDate.map(({ date, records }) => (
                  <div key={date} className="mb-6 last:mb-0">
                    {/* Date Header */}
                    <div className="sticky top-0 bg-background z-10 pb-3 mb-4 border-b">
                      <div className="flex items-center gap-2">
                        <Calendar className="size-5 text-primary" />
                        <h3 className="font-semibold text-lg">{formatDate(date)}</h3>
                        <Badge variant="secondary" className="ml-2">
                          {records.length} {records.length === 1 ? 'record' : 'records'}
                        </Badge>
                      </div>
                    </div>

                    {/* Attendance Records Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {records.map((attendance) => {
                        const employee = getEmployeeById(attendance.employeeId);
                        
                        return (
                          <div
                            key={attendance.id}
                            className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${getStatusBgColor(attendance.status)}`}
                          >
                            {/* Employee Info */}
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar className="size-12 border-2 border-background">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                  {employee ? getInitials(employee.firstName, employee.lastName) : '??'}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold truncate">
                                      {employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee'}
                                    </h4>
                                    <p className="text-xs text-muted-foreground">
                                      {employee?.employeeId} • {getCompanyName(attendance.companyId)}
                                    </p>
                                  </div>
                                  <Badge variant={getStatusColor(attendance.status)} className="flex items-center gap-1 shrink-0">
                                    {getStatusIcon(attendance.status)}
                                    {attendance.status}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            {/* Attendance Details */}
                            <div className="space-y-2 pl-[60px]">
                              {/* Time Info */}
                              <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1.5">
                                  <Clock className="size-3.5 text-muted-foreground" />
                                  <span className="font-medium">In:</span>
                                  <span className="text-muted-foreground">{attendance.checkIn}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                  <Clock className="size-3.5 text-muted-foreground" />
                                  <span className="font-medium">Out:</span>
                                  <span className="text-muted-foreground">{attendance.checkOut}</span>
                                </div>
                              </div>

                              {/* Work Hours */}
                              <div className="flex items-center gap-1.5 text-sm">
                                <Timer className="size-3.5 text-muted-foreground" />
                                <span className="font-medium">Duration:</span>
                                <Badge variant="outline" className="text-xs">
                                  {attendance.workHours}
                                </Badge>
                              </div>

                              {/* Location */}
                              {attendance.location !== '-' && (
                                <div className="flex items-center gap-1.5 text-sm">
                                  <MapPin className="size-3.5 text-muted-foreground" />
                                  <span className="text-muted-foreground">{attendance.location}</span>
                                </div>
                              )}

                              {/* Notes */}
                              {attendance.notes && (
                                <div className="bg-background/50 rounded p-2 text-xs text-muted-foreground border">
                                  {attendance.notes}
                                </div>
                              )}

                              {/* Attendance ID */}
                              <div className="text-xs text-muted-foreground pt-2 border-t">
                                ID: {attendance.attendanceId}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Calendar className="size-12 mx-auto mb-4 opacity-20" />
                  <p>No attendance records found matching your filters</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Attendance Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-muted/50 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold">{filteredAttendanceRecords.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {filteredAttendanceRecords.filter((a) => a.status === 'Present').length}
            </div>
            <div className="text-xs text-muted-foreground">Present</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
              {filteredAttendanceRecords.filter((a) => a.status === 'Late').length}
            </div>
            <div className="text-xs text-muted-foreground">Late</div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
              {filteredAttendanceRecords.filter((a) => a.status === 'Absent').length}
            </div>
            <div className="text-xs text-muted-foreground">Absent</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {filteredAttendanceRecords.filter((a) => a.status === 'On Leave').length}
            </div>
            <div className="text-xs text-muted-foreground">On Leave</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {filteredAttendanceRecords.filter((a) => a.status === 'Work From Home').length}
            </div>
            <div className="text-xs text-muted-foreground">WFH</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}