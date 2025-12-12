import { useState, useMemo } from 'react';
import { Plus, Eye, Pencil, Trash2, Search, Building2, Calendar, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { InfoCard, ListCard, EmptyStateCard } from './ui/reusable-cards';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { ViewDialog, EditDialog, DeleteDialog, TextFormField, TextareaFormField } from './ui/reusable-dialogs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

import { ScrollArea } from './ui/scroll-area';

interface Company {
  id: number;
  companyId: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  updatedAt: string;
}

const initialCompanies: Company[] = [
  {
    id: 1,
    companyId: 'COM-001',
    name: 'TechCorp Solutions',
    description: 'Leading technology solutions provider specializing in enterprise software development and digital transformation services.',
    status: 'Active',
    createdAt: '2024-01-15T09:00:00',
    updatedAt: '2024-01-15T09:00:00',
  },
  {
    id: 2,
    companyId: 'COM-002',
    name: 'Global Innovations Ltd',
    description: 'International consulting firm focused on business process optimization and strategic planning for Fortune 500 companies.',
    status: 'Active',
    createdAt: '2024-02-20T10:30:00',
    updatedAt: '2024-03-10T14:20:00',
  },
  {
    id: 3,
    companyId: 'COM-003',
    name: 'DataFlow Systems',
    description: 'Cloud-based data analytics and business intelligence solutions for modern enterprises.',
    status: 'Active',
    createdAt: '2024-03-05T11:15:00',
    updatedAt: '2024-03-05T11:15:00',
  },
  {
    id: 4,
    companyId: 'COM-004',
    name: 'Legacy Corp',
    description: 'Traditional manufacturing company transitioning to digital operations and automation.',
    status: 'Inactive',
    createdAt: '2023-12-01T08:00:00',
    updatedAt: '2024-11-30T17:00:00',
  },
];

export function Company() {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [formData, setFormData] = useState({
    companyId: '',
    name: '',
    description: '',
  });

  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter and search logic
  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = 
        company.companyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    }).sort((a, b) => {
      // Sort by status (Active first), then by name
      if (a.status !== b.status) {
        return a.status === 'Active' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }, [companies, searchTerm, statusFilter]);

  // Statistics
  const stats = useMemo(() => {
    const total = companies.length;
    const active = companies.filter(c => c.status === 'Active').length;
    const inactive = companies.filter(c => c.status === 'Inactive').length;
    const recentlyUpdated = companies.filter(c => {
      const updatedDate = new Date(c.updatedAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return updatedDate > weekAgo;
    }).length;

    return { total, active, inactive, recentlyUpdated };
  }, [companies]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const newCompany: Company = {
      id: companies.length + 1,
      companyId: formData.companyId,
      name: formData.name,
      description: formData.description,
      status: 'Active',
      createdAt: now,
      updatedAt: now,
    };
    
    setCompanies([...companies, newCompany]);
    setFormData({ companyId: '', name: '', description: '' });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedCompany) {
      setCompanies(companies.map(company => 
        company.id === selectedCompany.id
          ? {
              ...company,
              companyId: formData.companyId,
              name: formData.name,
              description: formData.description,
              updatedAt: new Date().toISOString(),
            }
          : company
      ));
      setIsEditDialogOpen(false);
      setSelectedCompany(null);
      setFormData({ companyId: '', name: '', description: '' });
    }
  };

  const handleDelete = () => {
    if (selectedCompany) {
      setCompanies(companies.filter(company => company.id !== selectedCompany.id));
      setIsDeleteDialogOpen(false);
      setSelectedCompany(null);
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

  const openViewDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsViewDialogOpen(true);
  };

  const openEditDialog = (company: Company) => {
    setSelectedCompany(company);
    setFormData({
      companyId: company.companyId,
      name: company.name,
      description: company.description,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (company: Company) => {
    setSelectedCompany(company);
    setIsDeleteDialogOpen(true);
  };

  const getPriorityIcon = (status: string) => {
    return status === 'Active' ? (
      <Building2 className="size-4 text-green-600" />
    ) : (
      <AlertCircle className="size-4 text-gray-500" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InfoCard
          icon={Building2}
          title="Total Companies"
          value={stats.total}
        />
        <InfoCard
          icon={Building2}
          title="Active"
          value={stats.active}
          status={{ text: "Active", variant: "default" }}
        />
        <InfoCard
          icon={AlertCircle}
          title="Inactive"
          value={stats.inactive}
          status={{ text: "Inactive", variant: "secondary" }}
        />
        <InfoCard
          icon={Calendar}
          title="Recently Updated"
          value={stats.recentlyUpdated}
        />
      </div>

      {/* Main Content */}
      <ListCard
        title="Company Management"
        description="Manage company information and settings"
        action={
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4" />
                  Add Company
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleAddSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                    <DialogDescription>
                      Enter the company details below. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <TextFormField
                      label="Company ID"
                      name="companyId"
                      value={formData.companyId}
                      onChange={handleInputChange}
                      placeholder="COM-005"
                      required
                    />
                    <TextFormField
                      label="Company Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      required
                    />
                    <TextareaFormField
                      label="Description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter company description"
                      required
                    />
                  </div>
                  
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Company</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
          </Dialog>
        }
      >
          {/* Search and Filter Section */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search companies by ID, name, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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

          {/* Companies Feed */}
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((company) => (
                  <Card key={company.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3">
                            {getPriorityIcon(company.status)}
                            <div>
                              <h3 className="font-semibold text-lg">{company.name}</h3>
                              <p className="text-sm text-muted-foreground">ID: {company.companyId}</p>
                            </div>
                            <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                              {company.status}
                            </Badge>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed">
                            {company.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="size-4" />
                              <span>Created: {formatDate(company.createdAt)}</span>
                            </div>
                            {company.updatedAt !== company.createdAt && (
                              <div className="flex items-center gap-1">
                                <Calendar className="size-4" />
                                <span>Updated: {formatDate(company.updatedAt)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openViewDialog(company)}
                          >
                            <Eye className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(company)}
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openDeleteDialog(company)}
                          >
                            <Trash2 className="size-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <EmptyStateCard
                  icon={Building2}
                  title="No companies found"
                  description={
                    searchTerm || statusFilter !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Get started by adding your first company.'
                  }
                />
              )}
            </div>
          </ScrollArea>
      </ListCard>

      <ViewDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        title="Company Details"
        description="View complete information about this company."
        data={selectedCompany}
        fields={[
          { key: 'companyId', label: 'Company ID' },
          { key: 'name', label: 'Company Name' },
          { key: 'description', label: 'Description' },
          { 
            key: 'status', 
            label: 'Status',
            render: (value) => (
              <Badge variant={value === 'Active' ? 'default' : 'secondary'}>
                {value}
              </Badge>
            )
          },
          { key: 'createdAt', label: 'Created Date', render: (value) => formatDate(value) },
          { key: 'updatedAt', label: 'Last Updated', render: (value) => formatDate(value) }
        ]}
      />

      <EditDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Company"
        description="Update the company details below. Click save when you're done."
        onSubmit={handleEditSubmit}
        onCancel={() => {
          setIsEditDialogOpen(false);
          setFormData({ companyId: '', name: '', description: '' });
        }}
      >
        <TextFormField
          label="Company ID"
          name="companyId"
          value={formData.companyId}
          onChange={handleInputChange}
          required
        />
        <TextFormField
          label="Company Name"
          name="name"
          value={formData.name}
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
      </EditDialog>

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        description={`This action cannot be undone. This will permanently delete the company ${selectedCompany?.name} and remove all associated data from the system.`}
        onConfirm={handleDelete}
      />
    </div>
  );
}