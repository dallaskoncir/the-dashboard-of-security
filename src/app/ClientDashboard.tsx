"use client";

import { useState } from "react";
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

export default function ClientDashboard({ initialVulns }: { initialVulns: Vulnerability[] }) {
  const [filter, setFilter] = useState("all");

  const filteredVulns = filter === "all"
    ? initialVulns
    : initialVulns.filter(v => v.status === filter);

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
              <TableCell>{v.severity}</TableCell>
              <TableCell>{v.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
