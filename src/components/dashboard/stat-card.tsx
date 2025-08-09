import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Skeleton } from "../ui/skeleton"

type StatCardProps = Readonly<{
  stat: {
    title: string
    icon: React.ReactNode
    helperText: string
    value: string | number | undefined
    className: string
  }
  loading?: boolean
}>

export const StatCard = ({ stat, loading }: StatCardProps) => (
  <Card key={stat.title} className={cn(stat.className, "shadow")}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {stat.title}
      </CardTitle>
      {stat.icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">
        {loading ? (
          <Skeleton>
            <span className="opacity-0">0</span>
          </Skeleton>
        ) : (
          stat.value
        )}
      </div>
      <p className="pt-1 text-xs text-muted-foreground">{stat.helperText}</p>
    </CardContent>
  </Card>
)
