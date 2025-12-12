import { ColumnDef } from "@tanstack/react-table"
import { ActionButtons } from "@/components/action-buttons"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Company Interface and Columns
export interface Company {
  id: number
  companyId: string
  name: string
  description: string
}

export const createCompanyColumns = (
  handleEdit: (item: Company) => void,
  handleDelete: (item: Company) => void,
  handleView: (item: Company) => void
): ColumnDef<Company>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "companyId",
    header: "Company ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        item={row.original}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    ),
  },
]

// Designation Interface and Columns
export interface Designation {
  id: number
  designationId: string
  companyName: string
  title: string
  description: string
}

export const createDesignationColumns = (
  handleEdit: (item: Designation) => void,
  handleDelete: (item: Designation) => void,
  handleView: (item: Designation) => void
): ColumnDef<Designation>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "designationId",
    header: "Designation ID",
  },
  {
    accessorKey: "companyName",
    header: "Company Name",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        item={row.original}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    ),
  },
]

// Role Interface and Columns
export interface Role {
  id: number
  roleName: string
  description: string
  status: string
}

export const createRoleColumns = (
  handleEdit: (item: Role) => void,
  handleDelete: (item: Role) => void,
  handleView: (item: Role) => void
): ColumnDef<Role>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "roleName",
    header: "Role Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        item={row.original}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    ),
  },
]

// Employee Interface and Columns
export interface Employee {
  id: number
  employeeId: string
  name: string
  email: string
  phone: string
  company: string
  designation: string
  joinDate: string
  status: string
}

export const createEmployeeColumns = (
  handleEdit: (item: Employee) => void,
  handleDelete: (item: Employee) => void,
  handleView: (item: Employee) => void
): ColumnDef<Employee>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
  },
  {
    accessorKey: "employeeId",
    header: "Employee ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <Badge variant="outline" className="rounded-full">
        {row.original.company}
      </Badge>
    ),
  },
  {
    accessorKey: "designation",
    header: "Designation",
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-full">
        {row.original.designation}
      </Badge>
    ),
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "Active" ? "default" : "secondary"}>
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        item={row.original}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
      />
    ),
  },
]