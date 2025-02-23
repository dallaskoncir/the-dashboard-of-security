"use client";

import { useState, useEffect } from "react";
import { Vulnerability } from "./page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ClientDashboard() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/vulnerabilities")
      .then(res => res.json())
      .then(data => {
        setVulnerabilities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch failed:", err);
        setLoading(false);
      });
  }, []);

  const filteredVulns = filter === "all"
    ? vulnerabilities
    : vulnerabilities.filter(v => v.status === filter);

  const getSeverityVariant = (severity: number) => {
    if (severity >= 8) return "destructive"; // Red
    if (severity >= 6) return "warning";     // Yellow
    if (severity >= 4) return "default";     // Gray
    return "secondary";                      // Light gray
  };

  // Widget 1: Detailed Vulnerability Table
  const TableWidget = () => (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Vulnerability Details</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[300px] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVulns.map(v => (
              <TableRow key={v.id}>
                <TableCell>{v.type}</TableCell>
                <TableCell>{v.description}</TableCell>
                <TableCell>
                  <Badge variant={getSeverityVariant(v.severity)}>{v.severity}</Badge>
                </TableCell>
                <TableCell>{v.region}</TableCell>
                <TableCell>{v.category}</TableCell>
                <TableCell>{v.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Widget 2: Severity Breakdown (Bar-like with Tailwind)
  const SeverityBreakdownWidget = () => {
    const low = vulnerabilities.filter(v => v.severity <= 3).length;
    const medium = vulnerabilities.filter(v => v.severity > 3 && v.severity <= 6).length;
    const high = vulnerabilities.filter(v => v.severity > 6).length;
    const total = vulnerabilities.length;
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Severity Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="text-sm">Low (1-3):</span>
              <div className="h-4 bg-secondary rounded" style={{ width: `${(low / total) * 100}%` }} />
              <span className="text-xs">{low} ({((low / total) * 100).toFixed(1)}%)</span>
            </div>
            <div>
              <span className="text-sm">Medium (4-6):</span>
              <div className="h-4 bg-default rounded" style={{ width: `${(medium / total) * 100}%` }} />
              <span className="text-xs">{medium} ({((medium / total) * 100).toFixed(1)}%)</span>
            </div>
            <div>
              <span className="text-sm">High (7-10):</span>
              <div className="h-4 bg-destructive rounded" style={{ width: `${(high / total) * 100}%` }} />
              <span className="text-xs">{high} ({((high / total) * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Widget 3: Status Summary
  const StatusSummaryWidget = () => {
    const open = vulnerabilities.filter(v => v.status === "Open").length;
    const inProgress = vulnerabilities.filter(v => v.status === "In Progress").length;
    const resolved = vulnerabilities.filter(v => v.status === "Resolved").length;
    const total = vulnerabilities.length;
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Status Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span className="text-sm">Open:</span>
              <div className="h-4 bg-red-500 rounded" style={{ width: `${(open / total) * 100}%` }} />
              <span className="text-xs">{open} ({((open / total) * 100).toFixed(1)}%)</span>
            </div>
            <div>
              <span className="text-sm">In Progress:</span>
              <div className="h-4 bg-yellow-500 rounded" style={{ width: `${(inProgress / total) * 100}%` }} />
              <span className="text-xs">{inProgress} ({((inProgress / total) * 100).toFixed(1)}%)</span>
            </div>
            <div>
              <span className="text-sm">Resolved:</span>
              <div className="h-4 bg-green-500 rounded" style={{ width: `${(resolved / total) * 100}%` }} />
              <span className="text-xs">{resolved} ({((resolved / total) * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Widget 4: Region Activity (Pseudo-Heat Map Table)
  const RegionActivityWidget = () => {
    const regions = [...new Set(vulnerabilities.map(v => v.region))];
    return (
      <Card className="mb-8">
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

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-[180px]" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Select onValueChange={setFilter} defaultValue="all">
        <SelectTrigger className="mb-8 w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableWidget />
        <SeverityBreakdownWidget />
        <StatusSummaryWidget />
        <RegionActivityWidget />
      </div>
    </div>
  );
}
