export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="animate-pulse">
        {/* Header skeleton */}
        <div className="h-16 bg-muted"></div>

        {/* Hero skeleton */}
        <div className="h-64 bg-gradient-to-br from-muted to-muted/50"></div>

        {/* Content skeleton */}
        <div className="container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="h-96 bg-muted rounded-lg"></div>
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
            <div className="space-y-6">
              <div className="h-48 bg-muted rounded-lg"></div>
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
