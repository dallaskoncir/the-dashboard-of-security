# CyberGuard Inc. Cybersecurity Dashboard

A modern, full-stack cybersecurity dashboard showcasing real-time vulnerability tracking for "CyberGuard Inc."—a fictional security firm. Built to demonstrate advanced front-end and back-end skills, this project features dynamic data visualizations, responsive design, and a polished UI with dark mode support.

**[Live Demo](https://the-dashboard-of-security-kappa.vercel.app/)**

## Features

- **Four Security Widgets**:
  - **Vulnerability Details**: Filterable table of all vulnerabilities (type, severity, region, etc.).
  - **Severity Distribution**: Gradient-bar breakdown of low, medium, high severity counts.
  - **Status Summary**: Visual summary of Open, In Progress, and Resolved statuses.
  - **Region Activity**: Pseudo-heat map of average severity by region.
- **Dark Mode**: Toggleable theme (light/dark) with persistent state via `localStorage`.
- **Responsive Design**: Tailwind CSS grid adapts from 1-column (mobile) to 2-column (desktop).
- **Dynamic Data**: Fetches live vulnerability data from a cloud-hosted PostgreSQL database via Prisma Accelerate.

## Tech Stack

- **Frontend**: Next.js (React) with App Router, Tailwind CSS, Shadcn/UI components (`Table`, `Card`, `Select`, `Badge`, `Switch`, `Skeleton`).
- **Backend**: Prisma ORM with Accelerate (cloud DB proxy), PostgreSQL hosted via Prisma Data Platform.
- **Deployment**: Vercel—auto-deployed from GitHub with API Route (`/api/vulnerabilities`).
- **Branding**: Custom "CyberGuard Inc." header/footer—blue (`bg-blue-900`) theme for a security-tech vibe.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- Git
- Vercel account (for deployment)
- Prisma Data Platform access (for Accelerate setup)

### Installation
1. **Clone the Repo**:
   ```bash
   git clone https://github.com/dallaskoncir/the-dashboard-of-security.git
   cd the-dashboard-of-security
2. Run `npm install`
3. Run `npm run dev` and view at http://localhost:3000/
  