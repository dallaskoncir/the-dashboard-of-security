import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  await prisma.vulnerability.deleteMany(); // Clear existing data
  await prisma.vulnerability.createMany({
    data: [
      { id: "VULN-001", type: "XSS", severity: 7, description: "Script injection in login form.", affectedSystem: "Web Portal", timestamp: new Date("2025-02-15T09:00:00Z"), status: "Open", region: "US-East", category: "Web" },
      { id: "VULN-002", type: "SQL Injection", severity: 9, description: "Unsanitized query in API.", affectedSystem: "CRM Backend", timestamp: new Date("2025-02-16T14:30:00Z"), status: "In Progress", region: "EU-West", category: "Database" },
      { id: "VULN-003", type: "Phishing", severity: 4, description: "Fake email targeting creds.", affectedSystem: "Email Server", timestamp: new Date("2025-02-17T10:15:00Z"), status: "Resolved", region: "US-West", category: "Social" },
      { id: "VULN-004", type: "DDoS", severity: 8, description: "Flood attack on API gateway.", affectedSystem: "API Gateway", timestamp: new Date("2025-02-18T03:45:00Z"), status: "Open", region: "APAC", category: "Network" },
      { id: "VULN-005", type: "Privilege Escalation", severity: 6, description: "Role misconfig.", affectedSystem: "Auth Service", timestamp: new Date("2025-02-19T22:00:00Z"), status: "In Progress", region: "EU-East", category: "Auth" },
      { id: "VULN-006", type: "Malware", severity: 5, description: "Trojan in app dependency.", affectedSystem: "Client App", timestamp: new Date("2025-02-20T11:30:00Z"), status: "Resolved", region: "US-East", category: "App" },
      { id: "VULN-007", type: "Brute Force", severity: 3, description: "Login attempt spike.", affectedSystem: "Login Service", timestamp: new Date("2025-02-21T08:00:00Z"), status: "Open", region: "APAC", category: "Auth" },
      { id: "VULN-008", type: "XSS", severity: 6, description: "Injection in comment field.", affectedSystem: "Web Portal", timestamp: new Date("2025-02-22T13:15:00Z"), status: "Open", region: "US-West", category: "Web" },
      { id: "VULN-009", type: "SQL Injection", severity: 10, description: "Critical DB exploit.", affectedSystem: "CRM Backend", timestamp: new Date("2025-02-23T17:45:00Z"), status: "Open", region: "EU-West", category: "Database" },
      { id: "VULN-010", type: "DDoS", severity: 7, description: "Server overload attack.", affectedSystem: "API Gateway", timestamp: new Date("2025-02-24T02:30:00Z"), status: "In Progress", region: "US-East", category: "Network" },
      { id: "VULN-011", type: "Phishing", severity: 5, description: "Spoofed HR email.", affectedSystem: "Email Server", timestamp: new Date("2025-02-25T09:45:00Z"), status: "Resolved", region: "EU-East", category: "Social" },
      { id: "VULN-012", type: "Malware", severity: 8, description: "Ransomware in update.", affectedSystem: "Client App", timestamp: new Date("2025-02-26T15:00:00Z"), status: "Open", region: "APAC", category: "App" },
      { id: "VULN-013", type: "XSS", severity: 4, description: "Script in search bar.", affectedSystem: "Web Portal", timestamp: new Date("2025-02-27T12:20:00Z"), status: "Resolved", region: "US-West", category: "Web" },
      { id: "VULN-014", type: "SQL Injection", severity: 7, description: "Query bypass in auth.", affectedSystem: "CRM Backend", timestamp: new Date("2025-02-28T18:10:00Z"), status: "In Progress", region: "EU-West", category: "Database" },
      { id: "VULN-015", type: "DDoS", severity: 9, description: "Massive traffic spike.", affectedSystem: "API Gateway", timestamp: new Date("2025-03-01T04:00:00Z"), status: "Open", region: "US-East", category: "Network" },
      { id: "VULN-016", type: "Privilege Escalation", severity: 6, description: "Admin access leak.", affectedSystem: "Auth Service", timestamp: new Date("2025-03-02T10:30:00Z"), status: "In Progress", region: "APAC", category: "Auth" },
      { id: "VULN-017", type: "Phishing", severity: 3, description: "Low-impact email scam.", affectedSystem: "Email Server", timestamp: new Date("2025-03-03T14:15:00Z"), status: "Resolved", region: "US-West", category: "Social" },
      { id: "VULN-018", type: "Malware", severity: 7, description: "Spyware in plugin.", affectedSystem: "Client App", timestamp: new Date("2025-03-04T19:00:00Z"), status: "Open", region: "EU-East", category: "App" },
      { id: "VULN-019", type: "XSS", severity: 5, description: "Injection in profile page.", affectedSystem: "Web Portal", timestamp: new Date("2025-03-05T08:45:00Z"), status: "Resolved", region: "US-East", category: "Web" },
      { id: "VULN-020", type: "Brute Force", severity: 4, description: "Credential stuffing.", affectedSystem: "Login Service", timestamp: new Date("2025-03-06T11:00:00Z"), status: "Open", region: "EU-West", category: "Auth" },
    ],
  });
  console.log("Database seeded with 20 vulnerabilities!");
}

seed()
  .catch(e => console.error("Seeding failed:", e))
  .finally(async () => await prisma.$disconnect());
