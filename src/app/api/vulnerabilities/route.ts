import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const vulnerabilities = await prisma.vulnerability.findMany();
  return NextResponse.json(vulnerabilities);
}
