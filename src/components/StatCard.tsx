import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const statCardVariants = cva(
  "relative overflow-hidden rounded-lg border p-5 shadow-card transition-all hover:shadow-elevated",
  {
    variants: {
      variant: {
        default: "bg-card border-border",
        primary: "bg-primary text-primary-foreground border-transparent",
        success: "bg-card border-l-4 border-l-success",
        warning: "bg-card border-l-4 border-l-warning",
        danger: "bg-card border-l-4 border-l-destructive",
        info: "bg-card border-l-4 border-l-info",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  ({ title, value, subtitle, icon, trend, variant, className }, ref) => (
    <div ref={ref} className={cn(statCardVariants({ variant }), className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className={cn("text-sm font-medium", variant === "primary" ? "text-primary-foreground/80" : "text-muted-foreground")}>{title}</p>
          <p className="text-2xl font-heading font-bold animate-count-up">{value}</p>
          {subtitle && <p className={cn("text-xs", variant === "primary" ? "text-primary-foreground/60" : "text-muted-foreground")}>{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs font-medium", trend.value >= 0 ? "text-success" : "text-destructive")}>
              {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
            </p>
          )}
        </div>
        {icon && (
          <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", variant === "primary" ? "bg-primary-foreground/10" : "bg-muted")}>
            {icon}
          </div>
        )}
      </div>
    </div>
  )
);

StatCard.displayName = "StatCard";
export { StatCard };
