import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { MetricCard } from "@/components/ui/reusable-cards"

const metrics = [
  {
    title: "Total Revenue",
    description: "Total Revenue",
    value: "$1,250.00",
    badge: { text: "+12.5%", variant: "outline" as const },
    footer: { text: "Trending up this month", icon: IconTrendingUp }
  },
  {
    title: "New Customers", 
    description: "New Customers",
    value: "1,234",
    badge: { text: "-20%", variant: "outline" as const },
    footer: { text: "Down 20% this period", icon: IconTrendingDown }
  },
  {
    title: "Active Accounts",
    description: "Active Accounts", 
    value: "45,678",
    badge: { text: "+12.5%", variant: "outline" as const },
    footer: { text: "Strong user retention", icon: IconTrendingUp }
  },
  {
    title: "Growth Rate",
    description: "Growth Rate",
    value: "4.5%", 
    badge: { text: "+4.5%", variant: "outline" as const },
    footer: { text: "Steady performance increase", icon: IconTrendingUp }
  }
];

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          description={metric.description}
          value={metric.value}
          badge={metric.badge}
          footer={metric.footer}
          className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs"
        />
      ))}
    </div>
  )
}
