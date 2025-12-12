import { useState, useMemo } from 'react';
import { Plus, Eye, Pencil, Trash2, Search, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Award } from 'lucide-react';
import { ListCard } from './ui/reusable-cards';
import { ViewDialog, EditDialog, DeleteDialog, AddDialog, TextFormField, TextareaFormField } from './ui/reusable-dialogs';
import { DialogTrigger } from './ui/dialog';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Input } from './ui/input';

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

const initialCompanies: Company[] = [
  { id: 1, companyId: 'COM-001', name: 'TechCorp Solutions', description: 'Technology company', status: 'Active' },
  { id: 2, companyId: 'COM-002', name: 'Global Innovations Ltd', description: 'Consulting firm', status: 'Active' },
  { id: 3, companyId: 'COM-003', name: 'DataFlow Systems', description: 'Data analytics', status: 'Active' },
];

const initialDesignations: Designation[] = [
  { id: 1, designationId: 'DES-001', title: 'Software Engineer', description: 'Develops and maintains software applications', companyId: 1, status: 'Active' },
  { id: 2, designationId: 'DES-002', title: 'Project Manager', description: 'Manages project timelines and deliverables', companyId: 1, status: 'Active' },
  { id: 3, designationId: 'DES-003', title: 'Business Analyst', description: 'Analyzes business requirements and processes', companyId: 2, status: 'Active' },
  { id: 4, designationId: 'DES-004', title: 'Data Scientist', description: 'Analyzes complex data sets and creates insights', companyId: 3, status: 'Active' },
  { id: 5, designationId: 'DES-005', title: 'HR Manager', description: 'Manages human resources and employee relations', companyId: 2, status: 'Inactive' },
];

export function Designation() {
  const [companies] = useState<Company[]>(initialCompanies);
  const [designations, setDesignations] = useState<Designation[]>(initialDesignations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);
  const [formData, setFormData] = useState({
    designationId: '',
    title: '',
    description: '',
    companyId: '',
  });

  // Pagination and filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter and search logic
  const filteredDesignations = useMemo(() => {
    return designations.filter((designation) => {
      const matchesSearch = 
        designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        designation.designationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        designation.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || designation.status === statusFilter;
      const matchesCompany = companyFilter === 'all' || designation.companyId.toString() === companyFilter;
      
      return matchesSearch && matchesStatus && matchesCompany;
    });
  }, [designations, searchTerm, statusFilter, companyFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredDesignations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDesignations = filteredDesignations.slice(startIndex, endIndex);

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
    
    const newDesignation: Designation = {
      id: designations.length + 1,
      designationId: formData.designationId,
      title: formData.title,
      description: formData.description,
      companyId: Number(formData.companyId),
      status: 'Active',
    };
    
    setDesignations([...designations, newDesignation]);
    setFormData({ designationId: '', title: '', description: '', companyId: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDesignation) {
      setDesignations(designations.map(designation => 
        designation.id === selectedDesignation.id
          ? { ...designation, designationId: formData.designationId, title: formData.title, description: formData.description, companyId: Number(formData.companyId) }
          : designation
      ));
      setIsEditDialogOpen(false);
      setSelectedDesignation(null);
      setFormData({ designationId: '', title: '', description: '', companyId: '' });
    }
  };

  const handleDelete = () => {
    if (selectedDesignation) {
      setDesignations(designations.filter(designation => designation.id !== selectedDesignation.id));
      setIsDeleteDialogOpen(false);
      setSelectedDesignation(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleCompanyChange = (value: string) => {
    setFormData({ ...formData, companyId: value });
  };

  const openViewDialog = (designation: Designation) => {
    setSelectedDesignation(designation);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (designation: Designation) => {
    setSelectedDesignation(designation);
    setFormData({
      designationId: designation.designationId,
      title: designation.title,
      description: designation.description,
      companyId: designation.companyId.toString(),
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (designation: Designation) => {
    setSelectedDesignation(designation);
    setIsDeleteDialogOpen(true);
  };
  
  const getCompanyName = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
  };

  return (
    <>
      <ListCard
        title="Designations"
        description="Manage designation information"
        action={
          <AddDialog
            open={isAddDialogOpen}
            onOpenChange={setIsAddDialogOpen}
            title="Add New Designation"
            description="Enter the designation details below. Click save when you're done."
            onSubmit={handleAddSubmit}
            onCancel={() => setIsAddDialogOpen(false)}
            submitText="Save Designation"
            trigger={
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4" />
                  Add Designation
                </Button>
              </DialogTrigger>
            }
          >
            <TextFormField
              label="Designation ID"
              name="designationId"
              value={formData.designationId}
              onChange={handleInputChange}
              placeholder="DES-013"
              required
            />
            <TextFormField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter designation title"
              required
            />
            <TextareaFormField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter designation description"
              required
            />
            <div className="grid gap-2">
              <label className="text-sm font-medium">Company<span className="text-destructive">*</span></label>
              <Select value={formData.companyId} onValueChange={handleCompanyChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map(company => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </AddDialog>
        }
      >
        {/* Search and Filter Section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, ID, or description..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
          
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

          <Select value={companyFilter} onValueChange={handleCompanyFilterChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {companies.map(company => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Designation ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedDesignations.length > 0 ? (
                paginatedDesignations.map((designation) => (
                  <TableRow key={designation.id}>
                    <TableCell className="font-medium">{designation.designationId}</TableCell>
                    <TableCell>{designation.title}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {getCompanyName(designation.companyId)}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <div className="truncate text-muted-foreground">
                        {designation.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={designation.status === 'Active' ? 'default' : 'secondary'}>
                        {designation.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openViewDialog(designation)}>
                          <Eye className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(designation)}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(designation)}>
                          <Trash2 className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No designations found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination Section */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Showing {filteredDesignations.length === 0 ? 0 : startIndex + 1} to{' '}
            {Math.min(endIndex, filteredDesignations.length)} of {filteredDesignations.length} row(s)
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
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                  <ChevronsLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  <ChevronLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages || totalPages === 0}>
                  <ChevronRight className="size-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => setCurrentPage(totalPages || 1)} disabled={currentPage === totalPages || totalPages === 0}>
                  <ChevronsRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ListCard>

      <ViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        title="Designation Details"
        description="View complete information about this designation."
        data={selectedDesignation}
        fields={[
          { key: 'designationId', label: 'Designation ID' },
          { key: 'title', label: 'Title' },
          { 
            key: 'companyId', 
            label: 'Company',
            render: (value) => <Badge variant="outline">{getCompanyName(value)}</Badge>
          },
          { key: 'description', label: 'Description' },
          { 
            key: 'status', 
            label: 'Status',
            render: (value) => (
              <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
                {value}
              </Badge>
            )
          }
        ]}
      />

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Designation"
        description="Update the designation details below. Click save when you're done."
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setIsEditDialogOpen(false);
          setFormData({ designationId: '', title: '', description: '', companyId: '' });
        }}
      >
        <TextFormField
          label="Designation ID"
          name="designationId"
          value={formData.designationId}
          onChange={handleInputChange}
          required
        />
        <TextFormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <TextareaFormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
        <div className="grid gap-2">
          <label className="text-sm font-medium">Company<span className="text-destructive">*</span></label>
          <Select value={formData.companyId} onValueChange={handleCompanyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companies.map(company => (
                <SelectItem key={company.id} value={company.id.toString()}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </EditDialog>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description={`This action cannot be undone. This will permanently delete the designation ${selectedDesignation?.title} and remove all associated data from the system.`}
        onConfirm={handleDelete}
      />
    </>
  );
}