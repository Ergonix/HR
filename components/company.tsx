import { useState, useMemo } from 'react';
import { Plus, Eye, Pencil, Trash2, Search, Building2, Calendar, AlertCircle } from 'lucide-react';
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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="size-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Companies</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building2 className="size-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="size-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Inactive</p>
                <p className="text-2xl font-bold text-gray-500">{stats.inactive}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="size-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Recently Updated</p>
                <p className="text-2xl font-bold text-orange-600">{stats.recentlyUpdated}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="size-5" />
                Company Management
              </CardTitle>
              <CardDescription>Manage company information and settings</CardDescription>
            </div>
            
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
                    <div className="grid gap-2">
                      <Label htmlFor="companyId">Company ID</Label>
                      <Input
                        id="companyId"
                        name="companyId"
                        placeholder="COM-005"
                        value={formData.companyId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="name">Company Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter company name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Enter company description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
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
                    <Button type="submit">Save Company</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent>
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
                <Card>
                  <CardContent className="p-12 text-center">
                    <Building2 className="size-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No companies found</h3>
                    <p className="text-muted-foreground">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Try adjusting your search or filter criteria.'
                        : 'Get started by adding your first company.'
                      }
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Company Details</DialogTitle>
            <DialogDescription>
              View complete information about this company.
            </DialogDescription>
          </DialogHeader>
          
          {selectedCompany && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Company ID</Label>
                <div className="text-sm">{selectedCompany.companyId}</div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Company Name</Label>
                <div className="text-sm">{selectedCompany.name}</div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Description</Label>
                <div className="text-sm">{selectedCompany.description}</div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Status</Label>
                <div>
                  <Badge variant={selectedCompany.status === 'Active' ? 'default' : 'secondary'}>
                    {selectedCompany.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-2">
                <Label className="text-muted-foreground">Created Date</Label>
                <div className="text-sm">{formatDate(selectedCompany.createdAt)}</div>
              </div>

              <div className="grid gap-2">
                <Label className="text-muted-foreground">Last Updated</Label>
                <div className="text-sm">{formatDate(selectedCompany.updatedAt)}</div>
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
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Company</DialogTitle>
              <DialogDescription>
                Update the company details below. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-companyId">Company ID</Label>
                <Input
                  id="edit-companyId"
                  name="companyId"
                  value={formData.companyId}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Company Name</Label>
                <Input
                  id="edit-name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
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
                  setFormData({ companyId: '', name: '', description: '' });
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
              This action cannot be undone. This will permanently delete the company
              <span className="font-semibold"> {selectedCompany?.name}</span> and remove 
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
    </div>
  );
}