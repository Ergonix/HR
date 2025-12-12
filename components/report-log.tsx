'use client';

import { useState, useMemo } from 'react';
import { FileText, Search, Filter, Download } from 'lucide-react';
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

interface Company {
  id: number;
  companyId: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface LogEntry {
  id: number;
  timestamp: string;
  logType: 'System' | 'User Action' | 'Security' | 'Data Change' | 'Error' | 'Warning';
  severity: 'Info' | 'Warning' | 'Error' | 'Critical' | 'Success';
  user: string;
  action: string;
  module: string;
  companyId: number;
  ipAddress: string;
  details: string;
  metadata?: {
    oldValue?: string;
    newValue?: string;
    affectedRecords?: number;
  };
}

interface ReportLogProps {
  companies: Company[];
}

const initialLogEntries: LogEntry[] = [
  {
    id: 1,
    timestamp: '2024-12-11T14:32:15',
    logType: 'User Action',
    severity: 'Success',
    user: 'Admin User',
    action: 'Approved leave request',
    module: 'Leave Management',
    companyId: 1,
    ipAddress: '192.168.1.101',
    details: 'Leave request LVE-002 approved for Jane Smith (EMP-002) - Annual Leave from 2024-12-20 to 2024-12-27',
    metadata: {
      oldValue: 'Pending',
      newValue: 'Approved',
      affectedRecords: 1,
    },
  },
  {
    id: 2,
    timestamp: '2024-12-11T14:15:48',
    logType: 'Data Change',
    severity: 'Info',
    user: 'Admin User',
    action: 'Updated employee record',
    module: 'Employee',
    companyId: 1,
    ipAddress: '192.168.1.101',
    details: 'Modified employee details for John Doe (EMP-001) - Updated phone number and address',
    metadata: {
      oldValue: '+1-555-0100',
      newValue: '+1-555-0101',
      affectedRecords: 1,
    },
  },
  {
    id: 3,
    timestamp: '2024-12-11T13:45:22',
    logType: 'System',
    severity: 'Success',
    user: 'System',
    action: 'Attendance auto-sync completed',
    module: 'Attendance',
    companyId: 0,
    ipAddress: 'SYSTEM',
    details: 'Daily attendance records synchronized successfully. Processed 45 employee records across 3 companies.',
    metadata: {
      affectedRecords: 45,
    },
  },
  {
    id: 4,
    timestamp: '2024-12-11T13:20:10',
    logType: 'User Action',
    severity: 'Success',
    user: 'Admin User',
    action: 'Created new announcement',
    module: 'Announcement',
    companyId: 1,
    ipAddress: '192.168.1.101',
    details: 'Published new announcement "Holiday Schedule Update" for Tech Solutions Inc. (Priority: High)',
  },
  {
    id: 5,
    timestamp: '2024-12-11T12:50:33',
    logType: 'Warning',
    severity: 'Warning',
    user: 'System',
    action: 'Multiple failed login attempts',
    module: 'Security',
    companyId: 2,
    ipAddress: '203.45.67.89',
    details: 'Detected 3 failed login attempts from IP 203.45.67.89 for user account emily.brown@globalinnovations.com',
  },
  {
    id: 6,
    timestamp: '2024-12-11T12:15:07',
    logType: 'Data Change',
    severity: 'Info',
    user: 'Admin User',
    action: 'Deleted company record',
    module: 'Company',
    companyId: 4,
    ipAddress: '192.168.1.101',
    details: 'Permanently deleted company "Cloud Systems Corp." (COM-004) with Inactive status',
    metadata: {
      affectedRecords: 1,
    },
  },
  {
    id: 7,
    timestamp: '2024-12-11T11:42:55',
    logType: 'User Action',
    severity: 'Success',
    user: 'Admin User',
    action: 'Rejected leave request',
    module: 'Leave Management',
    companyId: 3,
    ipAddress: '192.168.1.101',
    details: 'Leave request LVE-005 rejected for David Wilson (EMP-005) - Casual Leave from 2024-12-18 to 2024-12-19. Reason: Project deadline approaching',
    metadata: {
      oldValue: 'Pending',
      newValue: 'Rejected',
      affectedRecords: 1,
    },
  },
  {
    id: 8,
    timestamp: '2024-12-11T11:10:28',
    logType: 'System',
    severity: 'Info',
    user: 'System',
    action: 'Database backup completed',
    module: 'System',
    companyId: 0,
    ipAddress: 'SYSTEM',
    details: 'Scheduled database backup completed successfully. Backup size: 2.4 GB. Location: /backups/db_2024-12-11_11-10.sql',
  },
  {
    id: 9,
    timestamp: '2024-12-11T10:35:19',
    logType: 'Error',
    severity: 'Error',
    user: 'System',
    action: 'Email notification failed',
    module: 'Notification',
    companyId: 2,
    ipAddress: 'SYSTEM',
    details: 'Failed to send leave approval email to employee michael.j@globalinnovations.com. SMTP connection timeout.',
  },
  {
    id: 10,
    timestamp: '2024-12-11T10:05:42',
    logType: 'Data Change',
    severity: 'Info',
    user: 'Admin User',
    action: 'Created new employee',
    module: 'Employee',
    companyId: 6,
    ipAddress: '192.168.1.101',
    details: 'Added new employee Lisa Anderson (EMP-008) to Data Analytics Pro as Data Scientist',
    metadata: {
      affectedRecords: 1,
    },
  },
  {
    id: 11,
    timestamp: '2024-12-11T09:50:14',
    logType: 'User Action',
    severity: 'Success',
    user: 'Admin User',
    action: 'Updated designation',
    module: 'Designation',
    companyId: 1,
    ipAddress: '192.168.1.101',
    details: 'Modified designation "Senior Developer" (DES-002) - Updated description and responsibilities',
    metadata: {
      affectedRecords: 1,
    },
  },
  {
    id: 12,
    timestamp: '2024-12-11T09:22:37',
    logType: 'Security',
    severity: 'Critical',
    user: 'System',
    action: 'Unauthorized access attempt',
    module: 'Security',
    companyId: 0,
    ipAddress: '45.89.123.45',
    details: 'Blocked unauthorized access attempt to admin panel from suspicious IP address 45.89.123.45. Location: Unknown',
  },
  {
    id: 13,
    timestamp: '2024-12-11T09:00:05',
    logType: 'System',
    severity: 'Success',
    user: 'System',
    action: 'Daily report generated',
    module: 'Report Log',
    companyId: 0,
    ipAddress: 'SYSTEM',
    details: 'Generated daily attendance and activity report. Total active employees: 42, Total attendance records: 156, Pending leave requests: 3',
  },
  {
    id: 14,
    timestamp: '2024-12-11T08:45:11',
    logType: 'User Action',
    severity: 'Success',
    user: 'Admin User',
    action: 'Logged in',
    module: 'Authentication',
    companyId: 1,
    ipAddress: '192.168.1.101',
    details: 'Admin user successfully authenticated and logged into the HR Portal dashboard',
  },
  {
    id: 15,
    timestamp: '2024-12-10T17:30:22',
    logType: 'System',
    severity: 'Info',
    user: 'System',
    action: 'Attendance auto-checkout',
    module: 'Attendance',
    companyId: 0,
    ipAddress: 'SYSTEM',
    details: 'Automatic checkout performed for 5 employees who forgot to check out. Total hours calculated based on last activity.',
    metadata: {
      affectedRecords: 5,
    },
  },
];

export function ReportLog({ companies }: ReportLogProps) {
  const [logEntries] = useState<LogEntry[]>(initialLogEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [logTypeFilter, setLogTypeFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [moduleFilter, setModuleFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('');

  const filteredLogs = useMemo(() => {
    return logEntries.filter((log) => {
      const matchesSearch =
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLogType = logTypeFilter === 'all' || log.logType === logTypeFilter;
      const matchesSeverity = severityFilter === 'all' || log.severity === severityFilter;
      const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
      const matchesCompany = companyFilter === 'all' || log.companyId.toString() === companyFilter;
      
      const matchesDate = !dateFilter || log.timestamp.startsWith(dateFilter);

      return matchesSearch && matchesLogType && matchesSeverity && matchesModule && matchesCompany && matchesDate;
    });
  }, [logEntries, searchTerm, logTypeFilter, severityFilter, moduleFilter, companyFilter, dateFilter]);

  const getCompanyName = (companyId: number) => {
    if (companyId === 0) return 'All Companies';
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Success':
        return 'default';
      case 'Info':
        return 'secondary';
      case 'Warning':
        return 'outline';
      case 'Error':
        return 'destructive';
      case 'Critical':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getLogTypeColor = (logType: string) => {
    switch (logType) {
      case 'System':
        return 'secondary';
      case 'User Action':
        return 'default';
      case 'Security':
        return 'destructive';
      case 'Data Change':
        return 'outline';
      case 'Error':
        return 'destructive';
      case 'Warning':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const handleExportLogs = () => {
    const logText = filteredLogs
      .map(
        (log) =>
          `[${formatTimestamp(log.timestamp)}] [${log.severity.toUpperCase()}] [${log.logType}] [${log.module}] ${log.user} - ${log.action}\n${log.details}\nIP: ${log.ipAddress} | Company: ${getCompanyName(log.companyId)}\n${'='.repeat(100)}`
      )
      .join('\n\n');

    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report-log-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <FileText className="size-5" />
              <CardTitle>Report Log</CardTitle>
            </div>
            <CardDescription>System activity logs and audit trail</CardDescription>
          </div>
          <Button onClick={handleExportLogs} variant="outline">
            <Download className="size-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
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

            <Select value={logTypeFilter} onValueChange={setLogTypeFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Log Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="User Action">User Action</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Data Change">Data Change</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
              </SelectContent>
            </Select>

            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severity</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Info">Info</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>

            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="Authentication">Authentication</SelectItem>
                <SelectItem value="Employee">Employee</SelectItem>
                <SelectItem value="Attendance">Attendance</SelectItem>
                <SelectItem value="Leave Management">Leave Management</SelectItem>
                <SelectItem value="Announcement">Announcement</SelectItem>
                <SelectItem value="Company">Company</SelectItem>
                <SelectItem value="Designation">Designation</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Notification">Notification</SelectItem>
                <SelectItem value="Report Log">Report Log</SelectItem>
              </SelectContent>
            </Select>

            <Select value={companyFilter} onValueChange={setCompanyFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Companies</SelectItem>
                <SelectItem value="0">System/Global</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id.toString()}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border bg-muted/30">
          <div className="bg-muted px-4 py-2 border-b">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredLogs.length} log {filteredLogs.length === 1 ? 'entry' : 'entries'}
              </span>
              <span className="text-muted-foreground">
                {dateFilter ? `Filtered by: ${dateFilter}` : 'All dates'}
              </span>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="p-4 space-y-3">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-background rounded-md border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={getSeverityColor(log.severity)} className="text-xs">
                          {log.severity}
                        </Badge>
                        <Badge variant={getLogTypeColor(log.logType)} className="text-xs">
                          {log.logType}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {log.module}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatTimestamp(log.timestamp)}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span className="font-medium">{log.user}</span>
                      <span className="text-muted-foreground"> - {log.action}</span>
                    </div>

                    <div className="text-sm text-muted-foreground mb-3 bg-muted/50 p-3 rounded">
                      {log.details}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span>IP: {log.ipAddress}</span>
                      <span>•</span>
                      <span>Company: {getCompanyName(log.companyId)}</span>
                      {log.metadata?.affectedRecords && (
                        <>
                          <span>•</span>
                          <span>Affected Records: {log.metadata.affectedRecords}</span>
                        </>
                      )}
                      {log.metadata?.oldValue && log.metadata?.newValue && (
                        <>
                          <span>•</span>
                          <span>
                            Changed: <span className="line-through">{log.metadata.oldValue}</span> →{' '}
                            <span className="font-medium">{log.metadata.newValue}</span>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No logs found matching your filters
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-muted/50 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold">{filteredLogs.length}</div>
            <div className="text-xs text-muted-foreground">Total Entries</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {filteredLogs.filter((l) => l.severity === 'Success').length}
            </div>
            <div className="text-xs text-muted-foreground">Success</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
              {filteredLogs.filter((l) => l.severity === 'Warning').length}
            </div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
              {filteredLogs.filter((l) => l.severity === 'Error').length}
            </div>
            <div className="text-xs text-muted-foreground">Errors</div>
          </div>
          <div className="bg-red-100 dark:bg-red-900/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-red-700 dark:text-red-300">
              {filteredLogs.filter((l) => l.severity === 'Critical').length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}