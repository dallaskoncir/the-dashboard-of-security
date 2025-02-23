import ClientDashboard from "./ClientDashboard";

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
