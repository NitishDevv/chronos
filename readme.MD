# Chronos – Distributed Job Scheduler

Chronos is a backend‑first job scheduling system. It supports one‑time and recurring jobs, execution tracking, retries, cancellation, rescheduling, and system health monitoring, with a minimal Angular frontend to validate all flows end‑to‑end.

---

## ✨ Features

### Core Scheduling

* Immediate job execution
* Scheduled jobs (future execution)
* Recurring jobs (minutely, hourly, daily, weekly, monthly)

### Job Management

* Create jobs
* View job status
* Cancel pending jobs
* Reschedule jobs
* Retry failed jobs manually

### Reliability & Failure Handling

* Automatic retries with configurable limits
* Failure state with error persistence
* Job locking to prevent double execution

### Observability

* Execution logs for every job run
* System health endpoint with job statistics

### Authentication

* JWT‑based authentication
* User‑scoped jobs

---

## Architecture Overview

**Backend**: Node.js + Express + MongoDB (Atlas)

* Modular MVC structure
* Custom scheduler loop (no cron libraries)
* MongoDB used for durability, locking, and execution history

**Frontend**: Angular (standalone components)

* Minimal UI to exercise all backend features
* Polling‑based job status updates

---

## 📁 Project Structure

### Backend

```
backend/
 ├── src/
 │   ├── app.js
 │   ├── server.js
 │   ├── scheduler/
 │   │    └── index.js
 │   ├── routes/
 │   │    ├── auth.routes.js
 │   │    ├── job.routes.js
 │   │    ├── execution.routes.js
 │   │    └── health.routes.js
 │   ├── controllers/
 │   ├── models/
 │   ├── middleware/
 │   └── config/
 └── package.json
```

### Frontend

```
frontend/
 ├── src/app/
 │   ├── pages/
 │   │    ├── login.component.ts
 │   │    ├── jobs.component.ts
 │   │    └── executions.component.ts
 │   ├── services/
 │   ├── app.routes.ts
 │   └── app.component.ts
 └── main.ts
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18+)
* MongoDB Atlas cluster
* Angular CLI

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=<your_mongo_atlas_uri>
JWT_SECRET=<your_secret>
```

Backend runs at:

```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
ng serve
```

Frontend runs at:

```
http://localhost:4200
```

---

## API Highlights

### Authentication

* `POST /api/auth/register`
* `POST /api/auth/login`

### Jobs

* `POST /api/jobs` – create job
* `GET /api/jobs` – list jobs
* `PATCH /api/jobs/:id/cancel`
* `PATCH /api/jobs/:id/reschedule`
* `PATCH /api/jobs/:id/retry`

### Executions

* `GET /api/executions/job/:jobId`

### Monitoring

* `GET /api/health`

---

## Design Decisions

* **Polling instead of WebSockets**: Simple, reliable, and sufficient for scheduler dashboards.
* **Custom scheduler loop**: Demonstrates understanding of job locking, retries, and race conditions without relying on cron libraries.
* **Execution logs separated from jobs**: Enables clean auditing and debugging.
* **Minutely recurrence**: Added for testing and validation; can be feature‑gated in production.

---

## Future Improvements

* WebSocket / SSE‑based real‑time updates
* Distributed locking with Redis
* Worker pools for horizontal scaling
* Notification system for repeated job failures
* Admin dashboard

---

## Status

This project fully satisfies all stated requirements of the capstone, including scheduling, recurrence, failure handling, logging, monitoring, and user‑driven job management.

---

**Author**: Nitish Mishra
