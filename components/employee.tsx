import { useState, useMemo } from 'react';
import { Plus, Eye, Pencil, Trash2, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface Company {
  id: number;
  companyId: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
}

interface Designation {
  id: number;
  designationId: string;
  title: string;
  description: string;
  companyId: number;
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

interface EmployeeProps {
  companies: Company[];
  designations: Designation[];
}

const initialEmployees: Employee[] = [
  {
    id: 1,
    employeeId: 'EMP-001',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@techsolutions.com',
    phone: '+1-555-0101',
    dateOfBirth: '1990-05-15',
    joinDate: '2020-01-15',
    status: 'Active',
    companyId: 1,
    designationId: 1,
    address: '123 Main St, New York, NY 10001',
    createdAt: '2020-01-15T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 2,
    employeeId: 'EMP-002',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@techsolutions.com',
    phone: '+1-555-0102',
    dateOfBirth: '1988-08-22',
    joinDate: '2019-03-20',
    status: 'Active',
    companyId: 1,
    designationId: 2,
    address: '456 Oak Ave, Brooklyn, NY 11201',
    createdAt: '2019-03-20T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 3,
    employeeId: 'EMP-003',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.j@globalinnovations.com',
    phone: '+1-555-0103',
    dateOfBirth: '1992-12-10',
    joinDate: '2021-06-01',
    status: 'Active',
    companyId: 2,
    designationId: 3,
    address: '789 Park Blvd, Manhattan, NY 10022',
    createdAt: '2021-06-01T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 4,
    employeeId: 'EMP-004',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@globalinnovations.com',
    phone: '+1-555-0104',
    dateOfBirth: '1995-03-18',
    joinDate: '2022-02-14',
    status: 'Active',
    companyId: 2,
    designationId: 4,
    address: '321 Elm St, Queens, NY 11375',
    createdAt: '2022-02-14T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 5,
    employeeId: 'EMP-005',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@digitalventures.com',
    phone: '+1-555-0105',
    dateOfBirth: '1987-07-25',
    joinDate: '2018-11-05',
    status: 'Inactive',
    companyId: 3,
    designationId: 5,
    address: '654 Pine Rd, Bronx, NY 10451',
    createdAt: '2018-11-05T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 6,
    employeeId: 'EMP-006',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.davis@digitalventures.com',
    phone: '+1-555-0106',
    dateOfBirth: '1993-11-30',
    joinDate: '2021-09-12',
    status: 'Active',
    companyId: 3,
    designationId: 6,
    address: '987 Cedar Ln, Staten Island, NY 10301',
    createdAt: '2021-09-12T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 7,
    employeeId: 'EMP-007',
    firstName: 'Robert',
    lastName: 'Martinez',
    email: 'robert.m@techsolutions.com',
    phone: '+1-555-0107',
    dateOfBirth: '1991-04-08',
    joinDate: '2020-07-20',
    status: 'Active',
    companyId: 1,
    designationId: 7,
    address: '147 Maple Dr, New York, NY 10003',
    createdAt: '2020-07-20T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
  {
    id: 8,
    employeeId: 'EMP-008',
    firstName: 'Lisa',
    lastName: 'Anderson',
    email: 'lisa.anderson@dataanalytics.com',
    phone: '+1-555-0108',
    dateOfBirth: '1994-09-14',
    joinDate: '2022-05-18',
    status: 'Active',
    companyId: 6,
    designationId: 8,
    address: '258 Birch Ave, Brooklyn, NY 11215',
    createdAt: '2022-05-18T09:00:00',
    updatedAt: '2024-12-11T10:30:00',
  },
];

export function Employee({ companies, designations }: EmployeeProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    joinDate: '',
    companyId: '',
    designationId: '',
    address: '',
  });

  // Pagination and filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter and search logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch = 
        employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
      const matchesCompany = companyFilter === 'all' || employee.companyId.toString() === companyFilter;
      
      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [employees, searchTerm, statusFilter, companyFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEmployees = filteredEmployees.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleCompanyFilterChange = (value: string) => {
    setCompanyFilter(value);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const newEmployee: Employee = {
      id: employees.length + 1,
      employeeId: `EMP-${String(employees.length + 1).padStart(3, '0')}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      joinDate: formData.joinDate,
      status: 'Active',
      companyId: Number(formData.companyId),
      designationId: Number(formData.designationId),
      address: formData.address,
      createdAt: now,
      updatedAt: now,
    };
    
    setEmployees([...employees, newEmployee]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      joinDate: '',
      companyId: '',
      designationId: '',
      address: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedEmployee) {
      setEmployees(employees.map(employee => 
        employee.id === selectedEmployee.id
          ? {
              ...employee,
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: formData.phone,
              dateOfBirth: formData.dateOfBirth,
              joinDate: formData.joinDate,
              companyId: Number(formData.companyId),
              designationId: Number(formData.designationId),
              address: formData.address,
              updatedAt: new Date().toISOString(),
            }
          : employee
      ));
      setIsEditDialogOpen(false);
      setSelectedEmployee(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        joinDate: '',
        companyId: '',
        designationId: '',
        address: '',
      });
    }
  };

  const handleDelete = () => {
    if (selectedEmployee) {
      setEmployees(employees.filter(employee => employee.id !== selectedEmployee.id));
      setIsDeleteDialogOpen(false);
      setSelectedEmployee(null);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openViewDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setFormData({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      dateOfBirth: employee.dateOfBirth,
      joinDate: employee.joinDate,
      companyId: employee.companyId.toString(),
      designationId: employee.designationId.toString(),
      address: employee.address,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDeleteDialogOpen(true);
  };

  const getCompanyName = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  const getDesignationTitle = (designationId: number) => {
    const designation = designations.find(d => d.id === designationId);
    return designation ? designation.title : 'Unknown Designation';
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
      minute: '2-digit'
    });
  };

  // Get available designations for selected company
  const availableDesignations = formData.companyId
    ? designations.filter(d => d.companyId === Number(formData.companyId) && d.status === 'Active')
    : [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Manage employee information</CardDescription>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4" />
                Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleAddSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                  <DialogDescription>
                    Enter the employee details below. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="employee@company.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1-555-0100"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="joinDate">Join Date</Label>
                      <Input
                        id="joinDate"
                        name="joinDate"
                        type="date"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="companyId">Company</Label>
                    <Select
                      value={formData.companyId}
                      onValueChange={(value) => {
                        handleSelectChange('companyId', value);
                        handleSelectChange('designationId', '');
                      }}
                    >
                      <SelectTrigger id="companyId">
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.filter(c => c.status === 'Active').map((company) => (
                          <SelectItem key={company.id} value={company.id.toString()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="designationId">Designation</Label>
                    <Select
                      key={formData.companyId}
                      value={formData.designationId}
                      onValueChange={(value) => handleSelectChange('designationId', value)}
                      disabled={!formData.companyId}
                    >
                      <SelectTrigger id="designationId">
                        <SelectValue placeholder={formData.companyId ? "Select designation" : "Select company first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableDesignations.length > 0 ? (
                          availableDesignations.map((designation) => (
                            <SelectItem key={designation.id} value={designation.id.toString()}>
                              {designation.title}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="px-2 py-1.5 text-sm text-muted-foreground">
                            No designations available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      name="address"
                      placeholder="Enter full address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Employee</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Search and Filter Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, phone, or ID..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Select value={companyFilter} onValueChange={handleCompanyFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by company" />
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
          
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.employeeId}</TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {employee.firstName} {employee.lastName}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{employee.email}</TableCell>
                    <TableCell className="text-muted-foreground">{employee.phone}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getCompanyName(employee.companyId)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {getDesignationTitle(employee.designationId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(employee.joinDate)}</TableCell>
                    <TableCell>
                      <Badge variant={employee.status === 'Active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openViewDialog(employee)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openEditDialog(employee)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => openDeleteDialog(employee)}
                        >
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No employees found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredEmployees.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} row(s)
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Rows per page</span>
              <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-[70px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground min-w-[100px] text-center">
                Page {currentPage} of {totalPages || 1}
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  <ChevronsLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronRight className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCurrentPage(totalPages || 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  <ChevronsRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>
              View complete information about this employee.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEmployee && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Employee ID</Label>
                  <div className="text-sm">{selectedEmployee.employeeId}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Status</Label>
                  <div>
                    <Badge variant={selectedEmployee.status === 'Active' ? 'default' : 'secondary'}>
                      {selectedEmployee.status}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">First Name</Label>
                  <div className="text-sm">{selectedEmployee.firstName}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Last Name</Label>
                  <div className="text-sm">{selectedEmployee.lastName}</div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Email</Label>
                <div className="text-sm">{selectedEmployee.email}</div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Phone</Label>
                <div className="text-sm">{selectedEmployee.phone}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Date of Birth</Label>
                  <div className="text-sm">{formatDate(selectedEmployee.dateOfBirth)}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Join Date</Label>
                  <div className="text-sm">{formatDate(selectedEmployee.joinDate)}</div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Company</Label>
                <div>
                  <Badge variant="outline">
                    {getCompanyName(selectedEmployee.companyId)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Designation</Label>
                <div>
                  <Badge variant="secondary">
                    {getDesignationTitle(selectedEmployee.designationId)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Address</Label>
                <div className="text-sm">{selectedEmployee.address}</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Created At</Label>
                  <div className="text-sm">{formatDateTime(selectedEmployee.createdAt)}</div>
                </div>
                
                <div className="grid gap-2">
                  <Label className="text-muted-foreground">Updated At</Label>
                  <div className="text-sm">{formatDateTime(selectedEmployee.updatedAt)}</div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogDescription>
                Update the employee details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-firstName">First Name</Label>
                  <Input
                    id="edit-firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-lastName">Last Name</Label>
                  <Input
                    id="edit-lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-dateOfBirth">Date of Birth</Label>
                  <Input
                    id="edit-dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-joinDate">Join Date</Label>
                  <Input
                    id="edit-joinDate"
                    name="joinDate"
                    type="date"
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-companyId">Company</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => {
                    handleSelectChange('companyId', value);
                    handleSelectChange('designationId', '');
                  }}
                >
                  <SelectTrigger id="companyId">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.filter(c => c.status === 'Active').map((company) => (
                      <SelectItem key={company.id} value={company.id.toString()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-designationId">Designation</Label>
                <Select
                  key={formData.companyId}
                  value={formData.designationId}
                  onValueChange={(value) => handleSelectChange('designationId', value)}
                  disabled={!formData.companyId}
                >
                  <SelectTrigger id="designationId">
                    <SelectValue placeholder={formData.companyId ? "Select designation" : "Select company first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDesignations.length > 0 ? (
                      availableDesignations.map((designation) => (
                        <SelectItem key={designation.id} value={designation.id.toString()}>
                          {designation.title}
                        </SelectItem>
                      ))
                    ) : (
                      <div className="px-2 py-1.5 text-sm text-muted-foreground">
                        No designations available
                      </div>
                    )}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                  id="edit-address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  required
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditDialogOpen(false);
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    dateOfBirth: '',
                    joinDate: '',
                    companyId: '',
                    designationId: '',
                    address: '',
                  });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the employee
              <span className="font-semibold"> {selectedEmployee?.firstName} {selectedEmployee?.lastName}</span> and remove 
              all associated data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}