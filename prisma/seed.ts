import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.vulnerability.createMany({
    data: [
      {
        id: "VULN-001",
        type: "XSS",
        severity: 7,
        description: "Cross-site scripting vulnerability in user input field allowing script injection.",
        affectedSystem: "Web Portal v3.1",
        timestamp: new Date("2025-02-18T14:23:00Z"),
        status: "Open",
      },
      {
        id: "VULN-002",
        type: "SQL Injection",
        severity: 9,
        description: "Improper sanitization of database queries leading to potential data exposure.",
        affectedSystem: "CRM Backend v2.4",
        timestamp: new Date("2025-02-19T09:15:00Z"),
        status: "In Progress",
      },
      {
        id: "VULN-003",
        type: "Phishing",
        severity: 4,
        description: "Suspicious email campaign targeting employee credentials.",
        affectedSystem: "Corporate Email",
        timestamp: new Date("2025-02-20T17:45:00Z"),
        status: "Resolved",
      },
      {
        id: "VULN-004",
        type: "DDoS",
        severity: 8,
        description: "Distributed denial-of-service attack overwhelming API endpoints.",
        affectedSystem: "API Gateway v1.9",
        timestamp: new Date("2025-02-21T03:10:00Z"),
        status: "Open",
      },
      {
        id: "VULN-005",
        type: "Privilege Escalation",
        severity: 6,
        description: "Misconfigured role allowing unauthorized admin access.",
        affectedSystem: "Auth Service v4.0",
        timestamp: new Date("2025-02-17T22:30:00Z"),
        status: "In Progress",
      },
      {
        id: "VULN-006",
        type: "Malware",
        severity: 5,
        description: "Trojan detected in third-party library dependency.",
        affectedSystem: "Client App v1.2",
        timestamp: new Date("2025-02-19T12:00:00Z"),
        status: "Resolved",
      },
      {
        id: "VULN-007",
        type: "Brute Force",
        severity: 3,
        description: "Repeated login attempts detected on user accounts.",
        affectedSystem: "Login Service v3.0",
        timestamp: new Date("2025-02-20T08:20:00Z"),
        status: "Open",
      },
    ],
  });
  console.log("Database seeded!");
}

seed()
  .catch(e => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
