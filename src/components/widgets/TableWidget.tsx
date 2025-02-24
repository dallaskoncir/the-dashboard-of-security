import { useState } from "react";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vulnerability } from "@/app/page";

type TableWidgetProps = {
  loading: boolean;
  vulnerabilities: Vulnerability[];
};

export const TableWidget = ({ loading, vulnerabilities }: TableWidgetProps) => {
  const [filter, setFilter] = useState("all");

  const filteredVulns = filter === "all"
    ? vulnerabilities
    : vulnerabilities.filter(v => v.status === filter);

  const getSeverityVariant = (severity: number) => {
    if (severity >= 8) return "destructive"; // Red
    if (severity >= 6) return "warning";     // Yellow
    if (severity >= 4) return "default";     // Gray
    return "secondary";                      // Light gray
  };

  if (loading) {
    return (
      <Card className="min-h-[400px]">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vulnerability Details</CardTitle>
        <Select onValueChange={setFilter} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Open">Open</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
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
};
