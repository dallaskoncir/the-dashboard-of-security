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
    if (severity >= 8) return "destructive";
    if (severity >= 6) return "warning";
    if (severity >= 4) return "default";
    return "secondary";
  };

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-10 w-[180px]" /> {/* Select placeholder */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" /> {/* Table header */}
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" /> /* Table rows */
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Select onValueChange={setFilter} defaultValue="all">
        <SelectTrigger className="w-[180px] mb-4">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="Open">Open</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredVulns.map(v => (
            <TableRow key={v.id}>
              <TableCell>{v.type}</TableCell>
              <TableCell>{v.description}</TableCell>
              <TableCell>
                <Badge variant={getSeverityVariant(v.severity)}>
                  {v.severity}
                </Badge>
              </TableCell>
              <TableCell>{v.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
