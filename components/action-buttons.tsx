import { Button } from "@/components/ui/button"

interface ActionButtonsProps<T> {
  item: T
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onView?: (item: T) => void
}

export function ActionButtons<T>({
  item,
  onEdit,
  onDelete,
  onView,
}: ActionButtonsProps<T>) {
  return (
    <div className="flex items-center gap-2">
      {onView && (
        <Button variant="secondary" size="sm" onClick={() => onView(item)}>
          View
        </Button>
      )}
      {onEdit && (
        <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
          Edit
        </Button>
      )}
      {onDelete && (
        <Button variant="destructive" size="sm" onClick={() => onDelete(item)}>
          Delete
        </Button>
      )}
    </div>
  )
}