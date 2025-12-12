import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Search, Filter, Megaphone, Calendar, AlertCircle, Building2, Pin } from 'lucide-react';
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
}

interface Announcement {
  id: number;
  announcementId: string;
  title: string;
  description: string;
  content: string;
  companyId: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Inactive';
  publishDate: string;
  expiryDate: string;
  createdAt: string;
  updatedAt: string;
}

interface AnnouncementProps {
  companies: Company[];
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    announcementId: 'ANN-001',
    title: 'Company Holiday - Christmas',
    description: 'Office will be closed for Christmas celebration',
    content: 'Dear Team, Please note that the office will remain closed on December 25th for Christmas. We wish everyone a Merry Christmas and happy holidays!',
    companyId: 1,
    priority: 'High',
    status: 'Active',
    publishDate: '2024-12-01',
    expiryDate: '2024-12-25',
    createdAt: '2024-12-01T09:00:00',
    updatedAt: '2024-12-01T09:00:00',
  },
  {
    id: 2,
    announcementId: 'ANN-002',
    title: 'New Health Insurance Policy',
    description: 'Updated health insurance benefits for all employees',
    content: 'We are pleased to announce an enhanced health insurance policy with better coverage and benefits. Please check your email for detailed information.',
    companyId: 1,
    priority: 'High',
    status: 'Active',
    publishDate: '2024-11-15',
    expiryDate: '2025-01-15',
    createdAt: '2024-11-15T10:00:00',
    updatedAt: '2024-11-20T14:30:00',
  },
  {
    id: 3,
    announcementId: 'ANN-003',
    title: 'Team Building Event',
    description: 'Annual team building activity scheduled for next month',
    content: 'Join us for our annual team building event on January 20th. Activities include outdoor games, workshops, and team dinner. RSVP by January 10th.',
    companyId: 2,
    priority: 'Medium',
    status: 'Active',
    publishDate: '2024-12-10',
    expiryDate: '2025-01-20',
    createdAt: '2024-12-10T11:00:00',
    updatedAt: '2024-12-10T11:00:00',
  },
  {
    id: 4,
    announcementId: 'ANN-004',
    title: 'IT System Maintenance',
    description: 'Scheduled maintenance window this weekend',
    content: 'The IT team will perform system maintenance this Saturday from 10 PM to 2 AM. Email and internal systems may be temporarily unavailable.',
    companyId: 2,
    priority: 'High',
    status: 'Active',
    publishDate: '2024-12-08',
    expiryDate: '2024-12-15',
    createdAt: '2024-12-08T15:00:00',
    updatedAt: '2024-12-08T15:00:00',
  },
  {
    id: 5,
    announcementId: 'ANN-005',
    title: 'Updated Work From Home Policy',
    description: 'Revised remote work guidelines effective immediately',
    content: 'We have updated our work-from-home policy. Employees can now work remotely up to 3 days per week with manager approval. Please review the updated guidelines.',
    companyId: 3,
    priority: 'Medium',
    status: 'Active',
    publishDate: '2024-11-20',
    expiryDate: '2025-02-20',
    createdAt: '2024-11-20T09:00:00',
    updatedAt: '2024-11-25T10:00:00',
  },
  {
    id: 6,
    announcementId: 'ANN-006',
    title: 'Q4 Performance Review',
    description: 'Quarterly performance reviews starting next week',
    content: 'Q4 performance reviews will begin next week. Please complete your self-assessment forms by Friday. Managers will schedule one-on-one meetings accordingly.',
    companyId: 3,
    priority: 'High',
    status: 'Inactive',
    publishDate: '2024-10-01',
    expiryDate: '2024-11-30',
    createdAt: '2024-10-01T08:00:00',
    updatedAt: '2024-11-30T17:00:00',
  },
  {
    id: 7,
    announcementId: 'ANN-007',
    title: 'Office Parking Update',
    description: 'New parking arrangements for all staff',
    content: 'Due to construction work, parking lot B will be closed temporarily. Please use parking lot A or nearby street parking. We apologize for any inconvenience.',
    companyId: 1,
    priority: 'Low',
    status: 'Active',
    publishDate: '2024-12-05',
    expiryDate: '2024-12-31',
    createdAt: '2024-12-05T07:00:00',
    updatedAt: '2024-12-05T07:00:00',
  },
];

export function Announcement({ companies }: AnnouncementProps) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    companyId: '',
    priority: 'Medium' as 'High' | 'Medium' | 'Low',
    publishDate: '',
    expiryDate: '',
  });

  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');

  // Filter and search logic
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const matchesSearch = 
        announcement.announcementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || announcement.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || announcement.priority === priorityFilter;
      const matchesCompany = companyFilter === 'all' || announcement.companyId.toString() === companyFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCompany;
    }).sort((a, b) => {
      // Sort by priority (High first), then by publish date (newest first)
      const priorityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });
  }, [announcements, searchTerm, statusFilter, priorityFilter, companyFilter]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      announcementId: `ANN-${String(announcements.length + 1).padStart(3, '0')}`,
      title: formData.title,
      description: formData.description,
      content: formData.content,
      companyId: Number(formData.companyId),
      priority: formData.priority,
      status: 'Active',
      publishDate: formData.publishDate,
      expiryDate: formData.expiryDate,
      createdAt: now,
      updatedAt: now,
    };
    
    setAnnouncements([...announcements, newAnnouncement]);
    setFormData({
      title: '',
      description: '',
      content: '',
      companyId: '',
      priority: 'Medium',
      publishDate: '',
      expiryDate: '',
    });
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedAnnouncement) {
      setAnnouncements(announcements.map(announcement => 
        announcement.id === selectedAnnouncement.id
          ? {
              ...announcement,
              title: formData.title,
              description: formData.description,
              content: formData.content,
              companyId: Number(formData.companyId),
              priority: formData.priority,
              publishDate: formData.publishDate,
              expiryDate: formData.expiryDate,
              updatedAt: new Date().toISOString(),
            }
          : announcement
      ));
      setIsEditDialogOpen(false);
      setSelectedAnnouncement(null);
      setFormData({
        title: '',
        description: '',
        content: '',
        companyId: '',
        priority: 'Medium',
        publishDate: '',
        expiryDate: '',
      });
    }
  };

  const handleDelete = () => {
    if (selectedAnnouncement) {
      setAnnouncements(announcements.filter(announcement => announcement.id !== selectedAnnouncement.id));
      setIsDeleteDialogOpen(false);
      setSelectedAnnouncement(null);
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

  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      description: announcement.description,
      content: announcement.content,
      companyId: announcement.companyId.toString(),
      priority: announcement.priority,
      publishDate: announcement.publishDate,
      expiryDate: announcement.expiryDate,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDeleteDialogOpen(true);
  };

  const getCompanyName = (companyId: number) => {
    const company = companies.find(c => c.id === companyId);
    return company ? company.name : 'Unknown Company';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'default';
      case 'Low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <AlertCircle className="size-4" />;
      case 'Medium':
        return <Megaphone className="size-4" />;
      case 'Low':
        return <Pin className="size-4" />;
      default:
        return <Megaphone className="size-4" />;
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    return expiry < today;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Megaphone className="size-5" />
              <CardTitle>Announcements</CardTitle>
            </div>
            <CardDescription>Company-wide announcements and important updates</CardDescription>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                New Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleAddSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                  <DialogDescription>
                    Enter the announcement details below. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Enter announcement title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description *</Label>
                    <Input
                      id="description"
                      name="description"
                      placeholder="Brief description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content *</Label>
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Enter detailed announcement content"
                      value={formData.content}
                      onChange={handleInputChange}
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="companyId">Company *</Label>
                    <Select
                      value={formData.companyId}
                      onValueChange={(value) => handleSelectChange('companyId', value)}
                      required
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
                    <Label htmlFor="priority">Priority *</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => handleSelectChange('priority', value)}
                    >
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="publishDate">Publish Date *</Label>
                      <Input
                        id="publishDate"
                        name="publishDate"
                        type="date"
                        value={formData.publishDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="expiryDate">Expiry Date *</Label>
                      <Input
                        id="expiryDate"
                        name="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
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
                  <Button type="submit">Create Announcement</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Search and Filter Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search announcements..."
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
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Announcement Feed */}
        <div className="rounded-md border bg-muted/30">
          <div className="bg-muted px-4 py-2 border-b">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Showing {filteredAnnouncements.length} {filteredAnnouncements.length === 1 ? 'announcement' : 'announcements'}
              </span>
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="p-4 space-y-4">
              {filteredAnnouncements.length > 0 ? (
                filteredAnnouncements.map((announcement) => {
                  const isHighPriority = announcement.priority === 'High';
                  const expiringSoon = isExpiringSoon(announcement.expiryDate);
                  const expired = isExpired(announcement.expiryDate);
                  
                  return (
                    <div
                      key={announcement.id}
                      className={`bg-background rounded-lg border-2 p-5 hover:shadow-md transition-all ${
                        isHighPriority && announcement.status === 'Active' 
                          ? 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/20' 
                          : 'border-border hover:border-primary/30'
                      } ${
                        expired ? 'opacity-60' : ''
                      }`}
                    >
                      {/* Header Section */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`p-3 rounded-lg ${
                            isHighPriority 
                              ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400' 
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {getPriorityIcon(announcement.priority)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h3 className="font-semibold text-lg">{announcement.title}</h3>
                              {isHighPriority && announcement.status === 'Active' && (
                                <Badge variant="destructive" className="text-xs">
                                  Important
                                </Badge>
                              )}
                              {expired && (
                                <Badge variant="secondary" className="text-xs">
                                  Expired
                                </Badge>
                              )}
                              {expiringSoon && !expired && (
                                <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-600">
                                  Expiring Soon
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{announcement.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(announcement)}
                            className="hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openDeleteDialog(announcement)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="mb-4 pl-[60px]">
                        <div className="bg-muted/50 rounded-md p-4 text-sm leading-relaxed">
                          {announcement.content}
                        </div>
                      </div>

                      {/* Metadata Footer */}
                      <div className="pl-[60px] flex items-center gap-4 text-xs text-muted-foreground flex-wrap border-t pt-3">
                        <div className="flex items-center gap-1.5">
                          <Badge variant={getPriorityColor(announcement.priority)} className="text-xs">
                            {announcement.priority}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <Building2 className="size-3" />
                          <span>{getCompanyName(announcement.companyId)}</span>
                        </div>

                        <span>•</span>
                        
                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3" />
                          <span>Published: {formatDate(announcement.publishDate)}</span>
                        </div>

                        <span>•</span>

                        <div className="flex items-center gap-1.5">
                          <Calendar className="size-3" />
                          <span className={expired ? 'text-red-600' : expiringSoon ? 'text-yellow-600' : ''}>
                            Expires: {formatDate(announcement.expiryDate)}
                          </span>
                        </div>

                        <span>•</span>

                        <Badge 
                          variant={announcement.status === 'Active' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {announcement.status}
                        </Badge>

                        <span>•</span>
                        
                        <span className="text-xs">ID: {announcement.announcementId}</span>

                        <span>•</span>

                        <span>Updated: {formatDateTime(announcement.updatedAt)}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <Megaphone className="size-12 mx-auto mb-4 opacity-20" />
                  <p>No announcements found matching your filters</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Announcement Statistics */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold">{filteredAnnouncements.length}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="bg-red-50 dark:bg-red-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-red-600 dark:text-red-400">
              {filteredAnnouncements.filter((a) => a.priority === 'High' && a.status === 'Active').length}
            </div>
            <div className="text-xs text-muted-foreground">High Priority</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {filteredAnnouncements.filter((a) => a.status === 'Active').length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-yellow-600 dark:text-yellow-400">
              {filteredAnnouncements.filter((a) => isExpiringSoon(a.expiryDate) && !isExpired(a.expiryDate)).length}
            </div>
            <div className="text-xs text-muted-foreground">Expiring Soon</div>
          </div>
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>
                Update the announcement details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title *</Label>
                <Input
                  id="edit-title"
                  name="title"
                  placeholder="Enter announcement title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description *</Label>
                <Input
                  id="edit-description"
                  name="description"
                  placeholder="Brief description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Content *</Label>
                <Textarea
                  id="edit-content"
                  name="content"
                  placeholder="Enter detailed announcement content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={5}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-companyId">Company *</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => handleSelectChange('companyId', value)}
                >
                  <SelectTrigger id="edit-companyId">
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
                <Label htmlFor="edit-priority">Priority *</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) => handleSelectChange('priority', value)}
                >
                  <SelectTrigger id="edit-priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-publishDate">Publish Date *</Label>
                  <Input
                    id="edit-publishDate"
                    name="publishDate"
                    type="date"
                    value={formData.publishDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-expiryDate">Expiry Date *</Label>
                  <Input
                    id="edit-expiryDate"
                    name="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Update Announcement</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Announcement</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the announcement "{selectedAnnouncement?.title}"?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}