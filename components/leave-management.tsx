import { useState, useMemo } from 'react';
import { Calendar, Search, Filter, CheckCircle2, XCircle, Pencil, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';

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

interface LeaveRequest {
  id: number;
  leaveId: string;
  employeeId: number;
  companyId: number;
  leaveType: 'Sick Leave' | 'Casual Leave' | 'Annual Leave' | 'Maternity Leave' | 'Paternity Leave' | 'Unpaid Leave';
  fromDate: string;
  toDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  rejectionReason?: string;
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

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    leaveId: 'LVE-001',
    employeeId: 1,
    companyId: 1,
    leaveType: 'Sick Leave',
    fromDate: '2024-12-15',
    toDate: '2024-12-17',
    totalDays: 3,
    reason: 'Suffering from fever and need rest',
    status: 'Approved',
    appliedDate: '2024-12-10',
    approvedBy: 'John Manager',
    approvedDate: '2024-12-11',
    createdAt: '2024-12-10T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 2,
    leaveId: 'LVE-002',
    employeeId: 2,
    companyId: 1,
    leaveType: 'Annual Leave',
    fromDate: '2024-12-20',
    toDate: '2024-12-27',
    totalDays: 8,
    reason: 'Family vacation during Christmas holidays',
    status: 'Pending',
    appliedDate: '2024-12-08',
    createdAt: '2024-12-08T14:00:00',
    updatedAt: '2024-12-08T14:00:00',
  },
  {
    id: 3,
    leaveId: 'LVE-003',
    employeeId: 3,
    companyId: 2,
    leaveType: 'Casual Leave',
    fromDate: '2024-12-12',
    toDate: '2024-12-12',
    totalDays: 1,
    reason: 'Personal work - Bank appointment',
    status: 'Approved',
    appliedDate: '2024-12-09',
    approvedBy: 'Sarah Director',
    approvedDate: '2024-12-09',
    createdAt: '2024-12-09T11:00:00',
    updatedAt: '2024-12-09T15:00:00',
  },
  {
    id: 4,
    leaveId: 'LVE-004',
    employeeId: 4,
    companyId: 2,
    leaveType: 'Maternity Leave',
    fromDate: '2024-12-01',
    toDate: '2025-03-31',
    totalDays: 121,
    reason: 'Maternity leave for childbirth',
    status: 'Approved',
    appliedDate: '2024-11-15',
    approvedBy: 'Sarah Director',
    approvedDate: '2024-11-16',
    createdAt: '2024-11-15T10:00:00',
    updatedAt: '2024-11-16T09:00:00',
  },
  {
    id: 5,
    leaveId: 'LVE-005',
    employeeId: 5,
    companyId: 3,
    leaveType: 'Casual Leave',
    fromDate: '2024-12-18',
    toDate: '2024-12-19',
    totalDays: 2,
    reason: 'Attending family wedding ceremony',
    status: 'Rejected',
    appliedDate: '2024-12-11',
    approvedBy: 'Mike Admin',
    approvedDate: '2024-12-11',
    rejectionReason: 'Project deadline approaching, cannot approve leave during this period',
    createdAt: '2024-12-11T16:00:00',
    updatedAt: '2024-12-11T17:00:00',
  },
];

export function LeaveManagement() {
  const [companies] = useState<Company[]>(initialCompanies);
  const [employees] = useState<Employee[]>(initialEmployees);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [editStatus, setEditStatus] = useState<'Pending' | 'Approved' | 'Rejected'>('Pending');
  const [editRejectionReason, setEditRejectionReason] = useState('');

  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [leaveTypeFilter, setLeaveTypeFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');

  // Filter and search logic
  const filteredLeaveRequests = useMemo(() => {
    return leaveRequests.filter((leave) => {
      const employee = employees.find(e => e.id === leave.employeeId);
      const employeeName = employee ? `${employee.firstName} ${employee.lastName}` : '';
      
      const matchesSearch = 
        leave.leaveId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        leave.reason.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || leave.status === statusFilter;
      const matchesLeaveType = leaveTypeFilter === 'all' || leave.leaveType === leaveTypeFilter;
      const matchesCompany = companyFilter === 'all' || leave.companyId.toString() === companyFilter;
      
      return matchesSearch && matchesStatus && matchesLeaveType && matchesCompany;
    });
  }, [leaveRequests, searchTerm, statusFilter, leaveTypeFilter, companyFilter, employees]);

  const openApproveDialog = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setIsApproveDialogOpen(true);
  };

  const openRejectDialog = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setIsRejectDialogOpen(true);
  };

  const openEditDialog = (leave: LeaveRequest) => {
    setSelectedLeave(leave);
    setEditStatus(leave.status);
    setEditRejectionReason(leave.rejectionReason || '');
    setIsEditDialogOpen(true);
  };

  const handleApprove = () => {
    if (selectedLeave) {
      setLeaveRequests(leaveRequests.map(leave =>
        leave.id === selectedLeave.id
          ? {
              ...leave,
              status: 'Approved',
              approvedBy: 'Admin User',
              approvedDate: new Date().toISOString().split('T')[0],
              updatedAt: new Date().toISOString(),
            }
          : leave
      ));
      setIsApproveDialogOpen(false);
      setSelectedLeave(null);
    }
  };

  const handleReject = () => {
    if (selectedLeave && rejectionReason.trim()) {
      setLeaveRequests(leaveRequests.map(leave =>
        leave.id === selectedLeave.id
          ? {
              ...leave,
              status: 'Rejected',
              approvedBy: 'Admin User',
              approvedDate: new Date().toISOString().split('T')[0],
              rejectionReason: rejectionReason,
              updatedAt: new Date().toISOString(),
            }
          : leave
      ));
      setIsRejectDialogOpen(false);
      setSelectedLeave(null);
      setRejectionReason('');
    }
  };

  const handleEdit = () => {
    if (selectedLeave) {
      setLeaveRequests(leaveRequests.map(leave =>
        leave.id === selectedLeave.id
          ? {
              ...leave,
              status: editStatus,
              approvedBy: 'Admin User',
              approvedDate: new Date().toISOString().split('T')[0],
              rejectionReason: editStatus === 'Rejected' ? editRejectionReason : '',
              updatedAt: new Date().toISOString(),
            }
          : leave
      ));
      setIsEditDialogOpen(false);
      setSelectedLeave(null);
      setEditRejectionReason('');
    }
  };

  const getCompanyName = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown Employee';
  };

  const getEmployeeById = (employeeId: number) => {
    return employees.find(e => e.id === employeeId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'default';
      case 'Pending':
        return 'secondary';
      case 'Rejected':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const getLeaveTypeColor = (leaveType: string) => {
    switch (leaveType) {
      case 'Sick Leave':
        return 'destructive';
      case 'Casual Leave':
        return 'secondary';
      case 'Annual Leave':
        return 'default';
      case 'Maternity Leave':
      case 'Paternity Leave':
        return 'outline';
      case 'Unpaid Leave':
        return 'outline';
      default:
        return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5" />
              <CardTitle>Leave Management</CardTitle>
            </div>
            <CardDescription>Manage employee leave requests and approvals</CardDescription>
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
                placeholder="Search leave requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="size-4 text-muted-foreground" />

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
            
            <Select value={leaveTypeFilter} onValueChange={setLeaveTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Leave Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                <SelectItem value="Casual Leave">Casual Leave</SelectItem>
                <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                <SelectItem value="Maternity Leave">Maternity Leave</SelectItem>
                <SelectItem value="Paternity Leave">Paternity Leave</SelectItem>
                <SelectItem value="Unpaid Leave">Unpaid Leave</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Leave Requests Display */}
        <div className="rounded-md border bg-muted/30">
          <div className="bg-muted px-4 py-2 border-b">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredLeaveRequests.length} leave {filteredLeaveRequests.length === 1 ? 'request' : 'requests'}
              </span>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="p-4 space-y-3">
              {filteredLeaveRequests.length > 0 ? (
                filteredLeaveRequests.map((leave) => {
                  const employee = getEmployeeById(leave.employeeId);
                  
                  return (
                    <div
                      key={leave.id}
                      className="bg-background rounded-md border p-4 hover:bg-muted/50 transition-colors"
                    >
                      {/* Leave Request Header */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant={getStatusColor(leave.status)} className="text-xs">
                            {leave.status}
                          </Badge>
                          <Badge variant={getLeaveTypeColor(leave.leaveType)} className="text-xs">
                            {leave.leaveType}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {leave.totalDays} {leave.totalDays === 1 ? 'day' : 'days'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          {leave.status === 'Pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openApproveDialog(leave)}
                                className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              >
                                <CheckCircle2 className="size-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openRejectDialog(leave)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <XCircle className="size-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(leave)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Pencil className="size-4 mr-1" />
                            Edit Status
                          </Button>
                        </div>
                      </div>

                      {/* Employee and Leave ID */}
                      <div className="mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{getEmployeeName(leave.employeeId)}</span>
                          {employee && (
                            <span className="text-xs text-muted-foreground">({employee.employeeId})</span>
                          )}
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{leave.leaveId}</span>
                        </div>
                      </div>

                      {/* Leave Period */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="size-4 text-muted-foreground" />
                          <span className="font-medium">Leave Period:</span>
                          <span className="text-muted-foreground">
                            {formatDate(leave.fromDate)} → {formatDate(leave.toDate)}
                          </span>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="mb-3">
                        <div className="text-sm font-medium mb-1">Reason:</div>
                        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                          {leave.reason}
                        </div>
                      </div>

                      {/* Rejection Reason (if rejected) */}
                      {leave.status === 'Rejected' && leave.rejectionReason && (
                        <div className="mb-3">
                          <div className="text-sm font-medium mb-1 text-red-600">Rejection Reason:</div>
                          <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded border border-red-200 dark:border-red-900">
                            {leave.rejectionReason}
                          </div>
                        </div>
                      )}

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap border-t pt-3 mt-3">
                        <span>Company: {getCompanyName(leave.companyId)}</span>
                        <span>•</span>
                        <span>Applied: {formatDate(leave.appliedDate)}</span>
                        {leave.status !== 'Pending' && (
                          <>
                            <span>•</span>
                            <span>
                              {leave.status === 'Approved' ? 'Approved' : 'Rejected'} by: {leave.approvedBy || 'N/A'}
                            </span>
                            {leave.approvedDate && (
                              <>
                                <span>•</span>
                                <span>
                                  {leave.status === 'Approved' ? 'Approved' : 'Rejected'} on: {formatDate(leave.approvedDate)}
                                </span>
                              </>
                            )}
                          </>
                        )}
                        <span>•</span>
                        <span>Updated: {formatDateTime(leave.updatedAt)}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No leave requests found matching your filters
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Leave Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold">{filteredLeaveRequests.length}</div>
            <div className="text-xs text-muted-foreground">Total Requests</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
              {filteredLeaveRequests.filter((l) => l.status === 'Pending').length}
            </div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {filteredLeaveRequests.filter((l) => l.status === 'Approved').length}
            </div>
            <div className="text-xs text-muted-foreground">Approved</div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
              {filteredLeaveRequests.filter((l) => l.status === 'Rejected').length}
            </div>
            <div className="text-xs text-muted-foreground">Rejected</div>
          </div>
        </div>
      </CardContent>

      {/* Approve Dialog */}
      <AlertDialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Leave Request</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this leave request for{' '}
              <span className="font-medium">{selectedLeave && getEmployeeName(selectedLeave.employeeId)}</span>?
              <br />
              <br />
              <span className="font-medium">Leave Period:</span> {selectedLeave && formatDate(selectedLeave.fromDate)} to {selectedLeave && formatDate(selectedLeave.toDate)} ({selectedLeave?.totalDays} days)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
              Approve Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Leave Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this leave request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Employee</Label>
              <div className="text-sm font-medium">
                {selectedLeave && getEmployeeName(selectedLeave.employeeId)}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Leave Period</Label>
              <div className="text-sm">
                {selectedLeave && formatDate(selectedLeave.fromDate)} to {selectedLeave && formatDate(selectedLeave.toDate)} ({selectedLeave?.totalDays} days)
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="rejection-reason">Rejection Reason *</Label>
              <Textarea
                id="rejection-reason"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Leave Request Status</DialogTitle>
            <DialogDescription>
              Update the status of this leave request.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Leave ID</Label>
              <div className="text-sm font-medium">{selectedLeave?.leaveId}</div>
            </div>
            
            <div className="grid gap-2">
              <Label>Employee</Label>
              <div className="text-sm font-medium">
                {selectedLeave && getEmployeeName(selectedLeave.employeeId)}
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label>Leave Period</Label>
              <div className="text-sm">
                {selectedLeave && formatDate(selectedLeave.fromDate)} to {selectedLeave && formatDate(selectedLeave.toDate)} ({selectedLeave?.totalDays} days)
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="edit-status">New Status *</Label>
              <Select value={editStatus} onValueChange={(value: 'Pending' | 'Approved' | 'Rejected') => setEditStatus(value)}>
                <SelectTrigger id="edit-status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {editStatus === 'Rejected' && (
              <div className="grid gap-2">
                <Label htmlFor="edit-rejection-reason">Rejection Reason {editStatus === 'Rejected' && '*'}</Label>
                <Textarea
                  id="edit-rejection-reason"
                  placeholder="Enter reason for rejection..."
                  value={editRejectionReason}
                  onChange={(e) => setEditRejectionReason(e.target.value)}
                  rows={4}
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleEdit}
              disabled={editStatus === 'Rejected' && !editRejectionReason.trim()}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}