import { Vulnerability } from "@/app/page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type SeverityBreakdownWidgetProps = {
  loading: boolean;
  vulnerabilities: Vulnerability[];
};

export const SeverityBreakdownWidget = ({ loading, vulnerabilities }: SeverityBreakdownWidgetProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </CardContent>
      </Card>
    );
  }
  const low = vulnerabilities.filter(v => v.severity <= 3).length;
  const medium = vulnerabilities.filter(v => v.severity > 3 && v.severity <= 6).length;
  const high = vulnerabilities.filter(v => v.severity > 6).length;
  const total = vulnerabilities.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Severity Distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-24">Low (1-3)</span>
          <div className="relative flex-1 h-6 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-gradient-to-r from-green-400 to-green-600 rounded text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(low / total) * 100}%` }}
            >
              {low} ({((low / total) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-24">Medium (4-6)</span>
          <div className="relative flex-1 h-6 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(medium / total) * 100}%` }}
            >
              {medium} ({((medium / total) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium w-24">High (7-10)</span>
          <div className="relative flex-1 h-6 bg-gray-200 rounded">
            <div
              className="absolute h-full bg-gradient-to-r from-red-400 to-red-600 rounded text-white text-xs flex items-center justify-end pr-2"
              style={{ width: `${(high / total) * 100}%` }}
            >
              {high} ({((high / total) * 100).toFixed(1)}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
