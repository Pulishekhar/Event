# Event & Attendee Management Dashboard

A full-stack event management dashboard built to demonstrate real-world engineering practices including relational data modeling, API design, schema validation, and server-state management.

This project was developed as part of a technical evaluation to showcase clean architecture, correctness, and production-ready patterns.
<img width="1855" height="965" alt="Screenshot 2026-01-08 132449" src="https://github.com/user-attachments/assets/8e251163-5682-4332-9980-660108697062" />

---

## 🚀 Features

### Event Management
- Create events with title, description, date, and capacity
- Persistent storage using PostgreSQL
- Schema validation using Zod

### Attendee Registration
- Register attendees for specific events
- Enforces event capacity at the API level
- Prevents duplicate registrations per event

### Data & State Handling
- Prisma ORM with relational schema
- API routes built using Next.js App Router
- Server-state management with TanStack Query
- Automatic cache invalidation after mutations

### Reliability & UX
- React Hook Form for form handling
- Zod-based validation
- Toast notifications for success and failure
- Graceful handling of empty and error states

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React Hook Form
- Zod
- TanStack Query
- Shadcn UI
- Tailwind CSS

### Backend
- Next.js API Routes
- Prisma ORM
- PostgreSQL

### Tooling
- Docker (PostgreSQL)
- Git & GitHub

---

## 🧩 Database Schema

### Event
- `id`
- `title`
- `description`
- `date`
- `capacity`
- `createdAt`

### Attendee
- `id`
- `name`
- `email`
- `eventId`
- `createdAt`

**Constraints**
- One attendee can register only once per event
- Event capacity is enforced server-side

---

## 🏗️ Architecture Overview

- API routes act as a thin service layer
- Prisma enforces relational integrity and constraints
- TanStack Query manages server-state and caching
- Forms are validated using shared schemas
- UI is decoupled from business logic

This architecture ensures maintainability, scalability, and predictable data flow.

---

## ▶️ Running Locally

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/event-attendee-dashboard.git
cd event-attendee-dashboard
