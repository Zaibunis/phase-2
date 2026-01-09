---
id: 0001
title: Update CLAUDE.md agent routing
stage: general
date: 2026-01-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: Zaibunis
command: update-CLAUDE-md
labels: [claude-code, spec-kit-plus, agents, project-requirements]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - CLAUDE.md
tests:
 - none
---

## Prompt

Update the `claude.md` file based on my project requirements.
In this file:
-Use Auth Agent for authentication
-Use Frontend Agent for frontend development (e.g., Next.js)
-Use DB Agent for database design and operations
-Use Backend Agent for FastAPI development

Below are my project requirements:
'''
Phase II: Todo Full-Stack Web Application
Basic Level Functionality
Objective: Using Claude Code and Spec-Kit Plus transform the console app into a modern multi-user web application with persistent storage.
💡Development Approach: Use the Agentic Dev Stack workflow: Write spec → Generate plan → Break into tasks → Implement via Claude Code. No manual coding allowed. We will review the process, prompts, and iterations to judge each phase and project.
Requirements
Implement all 5 Basic Level features as a web application
Create RESTful API endpoints
Build responsive frontend interface
Store data in Neon Serverless PostgreSQL database
Authentication – Implement user signup/signin using Better Auth
Technology Stack
Layer
Technology
Frontend
Next.js 16+ (App Router)
Backend
Python FastAPI
ORM
SQLModel
Database
Neon Serverless PostgreSQL
Spec-Driven
Claude Code + Spec-Kit Plus
Authentication
Better Auth

Better Auth can be configured to issue JWT (JSON Web Token) tokens when users log in. These tokens are self-contained credentials that include user information and can be verified by any service that knows the secret key.
How It Works
User logs in on Frontend → Better Auth creates a session and issues a JWT token
Frontend makes API call → Includes the JWT token in the Authorization: Bearer <token> header
Backend receives request → Extracts token from header, verifies signature using shared secret
Backend identifies user → Decodes token to get user ID, email, etc. and matches it with the user ID in the URL
Backend filters data → Returns only tasks belonging to that user

'''

## Response snapshot

Updated `CLAUDE.md` to add Phase II project requirements (stack, auth/JWT flow) and explicit agent routing rules: Auth → `auth-flow-engineer`, Frontend → `nextjs-ui-builder`, DB → `neon-db-architect`, Backend → `fastapi-backend-engineer`.

## Outcome

- ✅ Impact: Project instructions now encode the required full-stack stack and ensure future work is routed through the correct specialized agents.
- 🧪 Tests: none
- 📁 Files: Modified `CLAUDE.md`.
- 🔁 Next prompts: Generate a feature spec for Phase II (e.g., `/sp.specify "Todo web app basic level"`).
- 🧠 Reflection: Making agent routing explicit early reduces inconsistent implementations across layers.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Add a short checklist of which agent to use for common tasks (auth, routes, schema, UI) if confusion persists.
