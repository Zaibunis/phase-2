# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

**Language/Version**: TypeScript 5.x, JavaScript (ES2022), Next.js 16+ (React 19)
**Primary Dependencies**: Next.js App Router, Better Auth, React, Tailwind CSS, Axios/Fetch API
**Storage**: None (client-side only)
**Testing**: Jest, React Testing Library, Cypress (for E2E)
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge)
**Project Type**: Web application (frontend-only)
**Performance Goals**: <1000ms initial load, <300ms navigation, <500ms API response time (UI perceived)
**Constraints**: <500ms p95, JWT-based authentication, responsive design, no direct backend logic in UI
**Scale/Scope**: 10k concurrent users, 50 tasks per user average

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [ ] Spec exists and includes acceptance scenarios + edge cases sufficient for
      autonomous execution.
- [ ] All user-facing actions are authenticated; backend endpoints require JWT and
      return 401 on missing/invalid token.
- [ ] Data access is scoped to the authenticated user; cross-user access is prevented.
- [ ] Stack constraints honored (Next.js App Router, FastAPI, SQLModel, Neon, Better
      Auth JWT with `Authorization: Bearer <token>`).
- [ ] Backend remains stateless; REST conventions + status codes are explicit.
- [ ] Work will be executed via Claude Code workflows (no manual coding) and a PHR will
      be recorded for this prompt.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
├── cli/
└── lib/

tests/
├── contract/
├── integration/
└── unit/

# [REMOVE IF UNUSED] Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/

# [REMOVE IF UNUSED] Option 3: Mobile + API (when "iOS/Android" detected)
api/
└── [same as backend above]

ios/ or android/
└── [platform-specific structure: feature modules, UI flows, platform tests]
```

**Structure Decision**: [Document the selected structure and reference the real
directories captured above]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
