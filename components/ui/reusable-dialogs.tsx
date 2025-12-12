import * as React from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./alert-dialog"
import { Button } from "./button"
import { Label } from "./label"
import { Input } from "./input"
import { Textarea } from "./textarea"
import { Badge } from "./badge"

// View Dialog Component
interface ViewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  data: Record<string, any> | null
  fields: Array<{
    key: string
    label: string
    render?: (value: any) => React.ReactNode
  }>
}

export function ViewDialog({ open, onOpenChange, title, description, data, fields }: ViewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        {data && (
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div key={field.key} className="grid gap-2">
                <Label className="text-muted-foreground">{field.label}</Label>
                <div className="text-sm">
                  {field.render ? field.render(data[field.key]) : data[field.key]}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Edit Dialog Component
interface EditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  children: React.ReactNode
}

export function EditDialog({ open, onOpenChange, title, description, onSubmit, onCancel, children }: EditDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {children}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Add/Create Dialog Component
interface AddDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  onSubmit: (e: React.FormEvent) => void
  onCancel: () => void
  children: React.ReactNode
  trigger?: React.ReactNode
  submitText?: string
}

export function AddDialog({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  onSubmit, 
  onCancel, 
  children, 
  trigger,
  submitText = "Save"
}: AddDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {children}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{submitText}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Delete Confirmation Dialog Component
interface DeleteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description: string
  onConfirm: () => void
  confirmText?: string
}

export function DeleteDialog({ 
  open, 
  onOpenChange, 
  title = "Are you sure?", 
  description, 
  onConfirm,
  confirmText = "Delete"
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

// Form Field Components for Edit Dialog
export function FormField({ 
  label, 
  children, 
  required = false 
}: { 
  label: string
  children: React.ReactNode
  required?: boolean 
}) {
  return (
    <div className="grid gap-2">
      <Label>{label}{required && <span className="text-destructive">*</span>}</Label>
      {children}
    </div>
  )
}

export function TextFormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <FormField label={label} required={required}>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </FormField>
  )
}

export function TextareaFormField({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required = false
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  rows?: number
  required?: boolean
}) {
  return (
    <FormField label={label} required={required}>
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        required={required}
      />
    </FormField>
  )
}