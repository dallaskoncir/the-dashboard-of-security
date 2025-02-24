import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vulnerability } from "@/app/page";

type StatusSummaryWidgetProps = {
  loading: boolean;
  vulnerabilities: Vulnerability[];
};

export const StatusSummaryWidget = ({ loading, vulnerabilities }: StatusSummaryWidgetProps) => {
  if (loading) {
    return (
      <Card className="min-h-[400px]">
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent className="space-y-2">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-6 w-3/4" />
          ))}
        </CardContent>
      </Card>
    );
  }
  const open = vulnerabilities.filter(v => v.status === "Open").length;
  const inProgress = vulnerabilities.filter(v => v.status === "In Progress").length;
  const resolved = vulnerabilities.filter(v => v.status === "Resolved").length;
  const total = vulnerabilities.length;

  return (
    <Card className="min-h-[400px]">
      <CardHeader>
        <CardTitle>Status Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-24">Open:</span>
          <div className="relative flex-1 h-6 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-red-500 rounded text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(open / total) * 100}%` }}
            >
              {open} ({((open / total) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-24">In Progress:</span>
          <div className="relative flex-1 h-6 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-yellow-500 rounded text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(inProgress / total) * 100}%` }}
            >
              {inProgress} ({((inProgress / total) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-24">Resolved:</span>
          <div className="relative flex-1 h-6 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-green-500 rounded text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(resolved / total) * 100}%` }}
            >
              {resolved} ({((resolved / total) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
