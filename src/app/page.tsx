import { PrismaClient } from "@prisma/client";
import ClientDashboard from "./ClientDashboard";

const prisma = new PrismaClient();

export default async function Dashboard() {
  const vulnerabilities = await prisma.vulnerability.findMany();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cybersecurity Dashboard</h1>
      <ClientDashboard initialVulns={vulnerabilities} />
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
