import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"

// Stats Card Component
interface StatsCardProps {
  label: string
  value: string | number
  subValue?: string
  change?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  color?: string
  bgAccent?: string
  className?: string
}

export function StatsCard({
  label,
  value,
  subValue,
  change,
  trend = 'neutral',
  icon: Icon,
  color = 'bg-gradient-to-br from-blue-500 to-blue-600',
  bgAccent = 'bg-blue-50 dark:bg-blue-950/20',
  className
}: StatsCardProps) {
  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600 dark:text-green-400'
      case 'down': return 'text-red-600 dark:text-red-400'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className={cn("overflow-hidden hover:shadow-lg transition-shadow", className)}>
      <CardContent className="p-0">
        <div className={cn(bgAccent, "p-6")}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-muted-foreground font-medium">{label}</p>
            </div>
            <div className={cn(color, "size-12 rounded-xl flex items-center justify-center shadow-lg")}>
              <Icon className="size-6 text-white" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-3xl font-bold">{value}</h3>
            {subValue && <p className="text-sm text-muted-foreground">{subValue}</p>}
          </div>
          
          {change && (
            <div className="flex items-center gap-1 mt-3">
              <span className={cn("text-xs font-medium", getTrendColor())}>
                {change}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  description?: string
  value: string | number
  badge?: {
    text: string
    variant?: 'default' | 'secondary' | 'outline'
  }
  footer?: {
    text: string
    icon?: LucideIcon
  }
  className?: string
}

export function MetricCard({
  title,
  description,
  value,
  badge,
  footer,
  className
}: MetricCardProps) {
  return (
    <Card className={cn("@container/card", className)}>
      <CardHeader>
        <CardDescription>{description}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {value}
        </CardTitle>
        {badge && (
          <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
            <Badge variant={badge.variant || 'outline'}>
              {badge.text}
            </Badge>
          </div>
        )}
      </CardHeader>
      {footer && (
        <div className="flex-col items-start gap-1.5 text-sm px-6 pb-6">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {footer.text}
            {footer.icon && <footer.icon className="size-4" />}
          </div>
        </div>
      )}
    </Card>
  )
}

// Info Card Component
interface InfoCardProps {
  icon: LucideIcon
  title: string
  description?: string
  value: string | number
  status?: {
    text: string
    variant?: 'default' | 'secondary' | 'outline' | 'destructive'
  }
  className?: string
}

export function InfoCard({
  icon: Icon,
  title,
  description,
  value,
  status,
  className
}: InfoCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-2">
          <Icon className="size-5 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          {status && (
            <Badge variant={status.variant || 'default'}>
              {status.text}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// List Card Component
interface ListCardProps {
  title: string
  description?: string
  children: React.ReactNode
  action?: React.ReactNode
  className?: string
}

export function ListCard({
  title,
  description,
  children,
  action,
  className
}: ListCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {action}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

// Chart Card Component
interface ChartCardProps {
  title: string
  description?: string
  children: React.ReactNode
  trend?: {
    value: string
    direction: 'up' | 'down'
    icon?: LucideIcon
  }
  className?: string
}

export function ChartCard({
  title,
  description,
  children,
  trend,
  className
}: ChartCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-2 text-sm font-medium",
              trend.direction === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            )}>
              {trend.icon && <trend.icon className="size-4" />}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}

// Empty State Card Component
interface EmptyStateCardProps {
  icon: LucideIcon
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  action,
  className
}: EmptyStateCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-12 text-center">
        <Icon className="size-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {action}
      </CardContent>
    </Card>
  )
}