import ClientDashboard from "./ClientDashboard";

export default async function Dashboard() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cybersecurity Dashboard</h1>
      <ClientDashboard />
    </div>
  );
}

export interface Vulnerability {
  id: string;
  type: string;
  severity: number;
  description: string;
  affectedSystem: string;
  timestamp: Date;
  status: string;
}
