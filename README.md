# HealthSphere AI

> An intelligent, production-grade health education platform built with React + Vite + TypeScript + Tailwind CSS.

![HealthSphere AI](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite)

---

## Overview

HealthSphere AI is a frontend-only SaaS health education platform designed to help users understand diseases, track personal health metrics, and engage with evidence-based health content. All information is sourced from authoritative organizations including WHO, CDC, and NIH.

**This platform is for educational purposes only. It does not provide medical advice, diagnosis, or treatment.**

---

## Features

### Public Access (No Login Required)
- **Disease Encyclopedia** – 8+ diseases with full clinical detail: overview, causes, symptoms, risk factors, prevention strategies, when to see a doctor, ICD-10 codes, and WHO/CDC source citations
- **Pandemic Analytics** – Interactive visualizations of major historical pandemics with death tolls, milestones, and global impact data
- **Disclaimer & References** – Full legal disclaimer and curated authoritative source citations

### Protected Access (Login Required)
- **Health Dashboard** – BMI, heart rate, caloric intake, steps, sleep metrics with trend visualization
- **AI Health Assistant** – Conversational health Q&A with mock AI responses sourced from WHO/CDC guidelines
- **BMI/BMR Calculator** – Using the validated Mifflin-St Jeor equation; calculates BMI, BMR, and TDEE
- **Health Charts** – Area, line, and bar charts for weight, BMI, steps, sleep, heart rate, and caloric trends
- **Risk Score Assessment** – Multi-factor health risk questionnaire with scoring and recommendations
- **Gamification** – Points, levels, badges, and daily challenges for engagement

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 + Vite 5 | Frontend framework and build tool |
| TypeScript 5 | Type safety throughout |
| Tailwind CSS 3 | Utility-first styling |
| React Router v6 | Client-side routing and protected routes |
| Recharts | Responsive data visualization |
| Lucide React | Icon library |
| Context API | Auth and health state management |
| localStorage | Client-side auth simulation |

---

## Authentication

Authentication is simulated entirely on the client side using `localStorage`. No backend or real auth system is involved.

**How it works:**

1. **Registration** – Creates a user profile object and stores it in `localStorage` under `hs_users`. Passwords are stored in plaintext in this demo (not production-safe).
2. **Login** – Looks up the user in `hs_users` by email/password match. On success, stores `{ isAuthenticated: true, user: { ...profile } }` in `hs_auth`.
3. **Session persistence** – On app load, `AuthContext` reads from `hs_auth` to restore the session.
4. **Logout** – Clears `hs_auth` from localStorage.
5. **Protected Routes** – `ProtectedRoute` component checks `isAuthenticated` and redirects to `/login` if false.

---

## Project Structure

```
healthsphere-ai/
├── src/
│   ├── components/
│   │   ├── ui/          # Button, Card, Badge, Modal, Chart
│   │   ├── layout/      # Sidebar, Topbar, ProtectedRoute
│   │   └── Disclaimer   # Reusable disclaimer component
│   ├── context/
│   │   ├── AuthContext  # Auth state + localStorage simulation
│   │   └── HealthContext # Health metrics state
│   ├── data/
│   │   ├── diseases.ts  # 8 fully-documented diseases
│   │   ├── pandemics.ts # 5 major pandemic records
│   │   └── references.ts # 8 authoritative source references
│   ├── pages/
│   │   ├── public/      # Landing, Encyclopedia, DiseaseDetail, Pandemic, Disclaimer
│   │   ├── auth/        # Login, Register
│   │   └── protected/   # Dashboard, Assistant, BMICalculator, HealthCharts, RiskScore, Gamification
│   └── routes/
│       └── AppRoutes.tsx # Centralized routing with layout
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation

```bash
# Clone or unzip the project
cd healthsphere-ai

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Demo Usage

1. Visit `http://localhost:5173` — the landing page is public
2. Browse the **Encyclopedia** and **Pandemic Analytics** without logging in
3. Click **Get Started** → Register with any name/email/password
4. Explore the full dashboard, AI assistant, calculators, and charts

---

## Design Philosophy

HealthSphere AI uses a **deep obsidian dark theme** with **teal accents**, inspired by medical monitoring interfaces and sci-fi data dashboards. Typography pairs **Playfair Display** (headlines) with **DM Sans** (body) for a sophisticated, editorial feel.

---

## Medical Disclaimer

HealthSphere AI is an educational platform only. All content is for general informational purposes and does **not** constitute:
- Medical advice
- Diagnosis of any medical condition
- Prescription or treatment recommendations
- A doctor-patient relationship

Always consult a qualified healthcare professional for personal health decisions. In an emergency, call your local emergency services immediately.

Sources: World Health Organization (WHO), Centers for Disease Control and Prevention (CDC), National Institutes of Health (NIH), American Heart Association (AHA), American Diabetes Association (ADA).

---

© 2024 HealthSphere AI — Educational purposes only. Not a medical device.
