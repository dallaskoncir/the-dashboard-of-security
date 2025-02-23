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

export default function ClientDashboard() { // Remove initialVulns prop
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/vulnerabilities")
      .then(res => res.json())
      .then(data => setVulnerabilities(data))
      .catch(err => console.error("Fetch failed:", err));
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
