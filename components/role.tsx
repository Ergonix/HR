import { useState, useMemo } from 'react';
import { Plus, Pencil, Trash2, Search, Filter, Shield, Users, CheckCircle2, XCircle, Settings, Lock, Eye, FileText, Calendar, UserCheck } from 'lucide-react';
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
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: 'Users' | 'Content' | 'Reports' | 'Settings';
}

interface Role {
  id: number;
  roleId: string;
  roleName: string;
  description: string;
  status: 'Active' | 'Inactive';
  userCount: number;
  permissions: string[];
  color: string;
  createdAt: string;
  updatedAt: string;
}

const availablePermissions: Permission[] = [
  { id: 'view_employees', name: 'View Employees', description: 'View employee information', category: 'Users' },
  { id: 'create_employees', name: 'Create Employees', description: 'Add new employees', category: 'Users' },
  { id: 'edit_employees', name: 'Edit Employees', description: 'Modify employee details', category: 'Users' },
  { id: 'delete_employees', name: 'Delete Employees', description: 'Remove employees', category: 'Users' },
  
  { id: 'view_announcements', name: 'View Announcements', description: 'View company announcements', category: 'Content' },
  { id: 'create_announcements', name: 'Create Announcements', description: 'Post new announcements', category: 'Content' },
  { id: 'edit_announcements', name: 'Edit Announcements', description: 'Modify announcements', category: 'Content' },
  { id: 'delete_announcements', name: 'Delete Announcements', description: 'Remove announcements', category: 'Content' },
  
  { id: 'view_leave', name: 'View Leave Requests', description: 'View leave applications', category: 'Content' },
  { id: 'approve_leave', name: 'Approve Leave', description: 'Approve/reject leave requests', category: 'Content' },
  { id: 'view_attendance', name: 'View Attendance', description: 'View attendance records', category: 'Content' },
  
  { id: 'view_reports', name: 'View Reports', description: 'Access system reports', category: 'Reports' },
  { id: 'export_reports', name: 'Export Reports', description: 'Download report data', category: 'Reports' },
  { id: 'view_logs', name: 'View System Logs', description: 'Access activity logs', category: 'Reports' },
  
  { id: 'manage_roles', name: 'Manage Roles', description: 'Create and edit roles', category: 'Settings' },
  { id: 'manage_companies', name: 'Manage Companies', description: 'Add/edit companies', category: 'Settings' },
  { id: 'manage_designations', name: 'Manage Designations', description: 'Add/edit designations', category: 'Settings' },
  { id: 'system_settings', name: 'System Settings', description: 'Configure system settings', category: 'Settings' },
];

const initialRoles: Role[] = [
  {
    id: 1,
    roleId: 'ROL-001',
    roleName: 'Administrator',
    description: 'Full system access with all permissions. Can manage all aspects of the platform.',
    status: 'Active',
    userCount: 3,
    permissions: availablePermissions.map(p => p.id),
    color: 'red',
    createdAt: '2024-01-01T09:00:00',
    updatedAt: '2024-01-01T09:00:00',
  },
  {
    id: 2,
    roleId: 'ROL-002',
    roleName: 'Manager',
    description: 'Manage team members, approve requests, and view reports.',
    status: 'Active',
    userCount: 8,
    permissions: ['view_employees', 'edit_employees', 'view_announcements', 'view_leave', 'approve_leave', 'view_attendance', 'view_reports'],
    color: 'blue',
    createdAt: '2024-01-05T09:00:00',
    updatedAt: '2024-01-05T09:00:00',
  },
  {
    id: 3,
    roleId: 'ROL-003',
    roleName: 'HR Personnel',
    description: 'Manage employee records, attendance, and HR operations.',
    status: 'Active',
    userCount: 5,
    permissions: ['view_employees', 'create_employees', 'edit_employees', 'view_announcements', 'create_announcements', 'view_leave', 'approve_leave', 'view_attendance', 'view_reports', 'manage_designations'],
    color: 'green',
    createdAt: '2024-01-10T09:00:00',
    updatedAt: '2024-01-10T09:00:00',
  },
  {
    id: 4,
    roleId: 'ROL-004',
    roleName: 'Employee',
    description: 'Standard employee access to personal information and company announcements.',
    status: 'Active',
    userCount: 42,
    permissions: ['view_announcements', 'view_leave'],
    color: 'gray',
    createdAt: '2024-01-15T09:00:00',
    updatedAt: '2024-01-15T09:00:00',
  },
  {
    id: 5,
    roleId: 'ROL-005',
    roleName: 'Team Lead',
    description: 'Lead team projects, coordinate with members, and manage team resources.',
    status: 'Active',
    userCount: 12,
    permissions: ['view_employees', 'view_announcements', 'view_leave', 'view_attendance', 'view_reports'],
    color: 'purple',
    createdAt: '2024-02-01T09:00:00',
    updatedAt: '2024-02-01T09:00:00',
  },
  {
    id: 6,
    roleId: 'ROL-006',
    roleName: 'Finance Manager',
    description: 'Manage financial operations, budgets, and financial reports.',
    status: 'Inactive',
    userCount: 0,
    permissions: ['view_employees', 'view_reports', 'export_reports', 'view_logs'],
    color: 'yellow',
    createdAt: '2024-02-10T09:00:00',
    updatedAt: '2024-02-10T09:00:00',
  },
];

export function Role() {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({
    roleName: '',
    description: '',
  });
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Filtering states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter and search logic
  const filteredRoles = useMemo(() => {
    return roles.filter((role) => {
      const matchesSearch = 
        role.roleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.roleId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || role.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [roles, searchTerm, statusFilter]);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const now = new Date().toISOString();
    const newRole: Role = {
      id: roles.length + 1,
      roleId: `ROL-${String(roles.length + 1).padStart(3, '0')}`,
      roleName: formData.roleName,
      description: formData.description,
      status: 'Active',
      userCount: 0,
      permissions: selectedPermissions,
      color: 'blue',
      createdAt: now,
      updatedAt: now,
    };
    
    setRoles([...roles, newRole]);
    setFormData({ roleName: '', description: '' });
    setSelectedPermissions([]);
    setIsAddDialogOpen(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id
          ? { 
              ...role, 
              roleName: formData.roleName,
              description: formData.description,
              updatedAt: new Date().toISOString(),
            }
          : role
      ));
      setIsEditDialogOpen(false);
      setSelectedRole(null);
      setFormData({ roleName: '', description: '' });
    }
  };

  const handlePermissionsUpdate = () => {
    if (selectedRole) {
      setRoles(roles.map(role => 
        role.id === selectedRole.id
          ? { 
              ...role, 
              permissions: selectedPermissions,
              updatedAt: new Date().toISOString(),
            }
          : role
      ));
      setIsPermissionsDialogOpen(false);
      setSelectedRole(null);
      setSelectedPermissions([]);
    }
  };

  const handleDelete = () => {
    if (selectedRole) {
      setRoles(roles.filter(role => role.id !== selectedRole.id));
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setFormData({ roleName: role.roleName, description: role.description });
    setIsEditDialogOpen(true);
  };

  const openPermissionsDialog = (role: Role) => {
    setSelectedRole(role);
    setSelectedPermissions(role.permissions);
    setIsPermissionsDialogOpen(true);
  };

  const openDeleteDialog = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId)
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const getRoleColor = (color: string) => {
    const colors = {
      red: 'bg-red-50 dark:bg-red-950/10 border-red-300 dark:border-red-700',
      blue: 'bg-blue-50 dark:bg-blue-950/10 border-blue-300 dark:border-blue-700',
      green: 'bg-green-50 dark:bg-green-950/10 border-green-300 dark:border-green-700',
      purple: 'bg-purple-50 dark:bg-purple-950/10 border-purple-300 dark:border-purple-700',
      yellow: 'bg-yellow-50 dark:bg-yellow-950/10 border-yellow-300 dark:border-yellow-700',
      orange: 'bg-orange-50 dark:bg-orange-950/10 border-orange-300 dark:border-orange-700',
      cyan: 'bg-cyan-50 dark:bg-cyan-950/10 border-cyan-300 dark:border-cyan-700',
      gray: 'bg-gray-50 dark:bg-gray-950/10 border-gray-300 dark:border-gray-700',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const getRoleIconColor = (color: string) => {
    const colors = {
      red: 'text-orange-300 dark:text-red-400',
      blue: 'text-blue-500 dark:text-blue-400',
      green: 'text-green-500 dark:text-green-400',
      purple: 'text-purple-500 dark:text-purple-400',
      yellow: 'text-yellow-500 dark:text-yellow-400',
      orange: 'text-orange-500 dark:text-orange-400',
      cyan: 'text-cyan-500 dark:text-cyan-400',
      gray: 'text-gray-500 dark:text-gray-400',
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const groupedPermissions = useMemo(() => {
    return availablePermissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Users':
        return <Users className="size-4" />;
      case 'Content':
        return <FileText className="size-4" />;
      case 'Reports':
        return <Calendar className="size-4" />;
      case 'Settings':
        return <Settings className="size-4" />;
      default:
        return <Shield className="size-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Shield className="size-5" />
              <CardTitle>Roles & Permissions</CardTitle>
            </div>
            <CardDescription>Manage user roles and access control</CardDescription>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="size-4 mr-2" />
                New Role
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleAddSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>Define a new role with specific permissions.</DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="roleName">Role Name *</Label>
                    <Input
                      id="roleName"
                      name="roleName"
                      placeholder="Enter role name"
                      value={formData.roleName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Enter role description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Permissions</Label>
                    <div className="border rounded-md p-4 space-y-4 max-h-[300px] overflow-y-auto">
                      {Object.entries(groupedPermissions).map(([category, permissions]) => (
                        <div key={category}>
                          <div className="flex items-center gap-2 mb-2">
                            {getCategoryIcon(category)}
                            <span className="font-medium text-sm">{category}</span>
                          </div>
                          <div className="space-y-2 ml-6">
                            {permissions.map(permission => (
                              <div key={permission.id} className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{permission.name}</div>
                                  <div className="text-xs text-muted-foreground">{permission.description}</div>
                                </div>
                                <Switch
                                  checked={selectedPermissions.includes(permission.id)}
                                  onCheckedChange={() => togglePermission(permission.id)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsAddDialogOpen(false);
                      setFormData({ roleName: '', description: '' });
                      setSelectedPermissions([]);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Create Role</Button>
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
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="size-4 text-muted-foreground" />
            
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

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => (
              <div
                key={role.id}
                className={`border-2 rounded-lg p-5 transition-all hover:shadow-lg ${getRoleColor(role.color)}`}
              >
                {/* Role Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg bg-background border ${getRoleIconColor(role.color)}`}>
                      <Shield className="size-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{role.roleName}</h3>
                      <p className="text-xs text-muted-foreground">{role.roleId}</p>
                    </div>
                  </div>
                  <Badge variant={role.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                    {role.status}
                  </Badge>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
                  {role.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b">
                  <div className="flex items-center gap-2">
                    <Users className="size-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{role.userCount}</span> users
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="size-4 text-muted-foreground" />
                    <span className="text-sm">
                      <span className="font-semibold">{role.permissions.length}</span> permissions
                    </span>
                  </div>
                </div>

                {/* Permissions Preview */}
                <div className="mb-4">
                  <div className="text-xs font-medium mb-2 text-muted-foreground">Key Permissions:</div>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 3).map(permId => {
                      const perm = availablePermissions.find(p => p.id === permId);
                      return perm ? (
                        <Badge key={permId} variant="outline" className="text-xs">
                          {perm.name}
                        </Badge>
                      ) : null;
                    })}
                    {role.permissions.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{role.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openPermissionsDialog(role)}
                    className="flex-1"
                  >
                    <Eye className="size-3 mr-1" />
                    Permissions
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(role)}
                  >
                    <Pencil className="size-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteDialog(role)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>

                {/* Updated timestamp */}
                <div className="text-xs text-muted-foreground mt-3 pt-3 border-t">
                  Updated: {formatDateTime(role.updatedAt)}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <Shield className="size-12 mx-auto mb-4 opacity-20" />
              <p>No roles found matching your filters</p>
            </div>
          )}
        </div>

        {/* Role Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/50 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold">{filteredRoles.length}</div>
            <div className="text-xs text-muted-foreground">Total Roles</div>
          </div>
          <div className="bg-green-50 dark:bg-green-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {filteredRoles.filter(r => r.status === 'Active').length}
            </div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
              {filteredRoles.reduce((sum, r) => sum + r.userCount, 0)}
            </div>
            <div className="text-xs text-muted-foreground">Total Users</div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-950/20 rounded-md p-3 text-center">
            <div className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
              {availablePermissions.length}
            </div>
            <div className="text-xs text-muted-foreground">Permissions</div>
          </div>
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>Update the role details below.</DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-roleName">Role Name *</Label>
                <Input
                  id="edit-roleName"
                  name="roleName"
                  value={formData.roleName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description *</Label>
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
                  setFormData({ roleName: '', description: '' });
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Manage Permissions - {selectedRole?.roleName}</DialogTitle>
            <DialogDescription>Configure access permissions for this role.</DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-4 py-4">
              {Object.entries(groupedPermissions).map(([category, permissions]) => (
                <div key={category} className="border rounded-md p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(category)}
                    <span className="font-medium">{category}</span>
                    <Badge variant="secondary" className="text-xs ml-auto">
                      {permissions.filter(p => selectedPermissions.includes(p.id)).length}/{permissions.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {permissions.map(permission => (
                      <div key={permission.id} className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            {selectedPermissions.includes(permission.id) ? (
                              <CheckCircle2 className="size-4 text-green-600" />
                            ) : (
                              <XCircle className="size-4 text-gray-400" />
                            )}
                            <span className="text-sm font-medium">{permission.name}</span>
                          </div>
                          <div className="text-xs text-muted-foreground ml-6">{permission.description}</div>
                        </div>
                        <Switch
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <DialogFooter className="border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsPermissionsDialogOpen(false);
                setSelectedPermissions([]);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handlePermissionsUpdate}>
              Update Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{selectedRole?.roleName}"?
              This will affect {selectedRole?.userCount} user(s). This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
              Delete Role
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}