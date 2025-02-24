import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Vulnerability } from "@/app/page";

type RegionActivityWidgetProps = {
  loading: boolean;
  vulnerabilities: Vulnerability[];
};

export const RegionActivityWidget = ({ loading, vulnerabilities }: RegionActivityWidgetProps) => {
  const getSeverityVariant = (severity: number) => {
    if (severity >= 8) return "destructive"; // Red
    if (severity >= 6) return "warning";     // Yellow
    if (severity >= 4) return "default";     // Gray
    return "secondary";                      // Light gray
  };
  const regions = [...new Set(vulnerabilities.map(v => v.region))];

  if (loading) {
    return (
      <Card className="min-h-[400px]">
        <CardHeader>
          <Skeleton className="h-6 w-36" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-full mb-2" />
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full mb-1" />
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-h-[400px]">
      <CardHeader>
        <CardTitle>Region Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Region</TableHead>
              <TableHead>Avg Severity</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.map(region => {
              const regionVulns = vulnerabilities.filter(v => v.region === region);
              const avgSeverity = regionVulns.reduce((sum, v) => sum + v.severity, 0) / regionVulns.length || 0;
              const count = regionVulns.length;
              return (
                <TableRow key={region}>
                  <TableCell>{region}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityVariant(Math.round(avgSeverity))}>
                      {avgSeverity.toFixed(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{count}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
