"use client";

import { useState, useEffect } from "react";
import { Vulnerability } from "./page";


import { TableWidget } from "@/components/widgets/TableWidget";
import { SeverityBreakdownWidget } from "@/components/widgets/SeverityBreakdownWidget";
import { StatusSummaryWidget } from "@/components/widgets/StatusSummaryWidget";
import { RegionActivityWidget } from "@/components/widgets/RegionActivityWidget";

export default function ClientDashboard() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);
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

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableWidget loading={loading} vulnerabilities={vulnerabilities} />
        <SeverityBreakdownWidget loading={loading} vulnerabilities={vulnerabilities} />
        <StatusSummaryWidget loading={loading} vulnerabilities={vulnerabilities} />
        <RegionActivityWidget loading={loading} vulnerabilities={vulnerabilities} />
      </div>
    </div>
  );
}
