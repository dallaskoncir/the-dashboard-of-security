import ClientDashboard from "./ClientDashboard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberGuard - The Dashboard of Security",
  description: "A simple security dashboard for tracking vulnerabilities.",
};

export default function Dashboard() {
  return <ClientDashboard />;
}

export interface Vulnerability {
  id: string;
  type: string;
  severity: number;
  description: string;
  affectedSystem: string;
  timestamp: string;
  status: string;
  region: string;
  category: string;
}
