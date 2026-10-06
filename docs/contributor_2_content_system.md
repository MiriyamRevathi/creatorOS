# Contributor 2 — Ideas, Content Studio & Content Library

## Overview
Contributor 2 owns the core content creation and idea lifecycle within **CreatorOS**:
1. **Idea Vault**: Capturing raw thoughts, tagging, priority assignments, stage tracking, and 1-click conversion to content drafts.
2. **Content Studio**: Live authoring workspace with word/character metrics, estimated reading/speaking duration, multi-platform preview simulator (YouTube, Instagram, LinkedIn, Blog), and 100% offline deterministic creative writing assistant.
3. **Content Library**: Centralized repository of all drafts, scheduled posts, and published media with search, multi-axis filtering, grid/table view modes, and JSON backup export.
4. **Dashboard Overview**: Summary KPI analytics and funnel lifecycle progress.

---

## Architecture & Zero-Database Persistence
In accordance with team guidelines:
- **No external database** is used (no PostgreSQL, MySQL, MongoDB, Firebase, Supabase).
- Data is stored in atomic file-based repositories:
  - `data/ideas/ideas.json`
  - `data/content/content.json`
- `BaseFileRepository` implements atomic temp-file write-and-replace (`.tmp` -> replace) to guarantee durability and handle process interruptions or corrupt files safely with automatic backup recovery.

---

## API Endpoints

### Ideas (`/api/ideas`)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/ideas` | List ideas (supports `search`, `status`, `content_type`, `priority`, `sort_by`, `sort_order`) |
| `GET` | `/api/ideas/stats` | Aggregate metrics (total, by status, by type, by priority) |
| `GET` | `/api/ideas/<id>` | Fetch single idea by ID |
| `POST` | `/api/ideas` | Create new idea with validation |
| `PUT` | `/api/ideas/<id>` | Update idea with validation |
| `DELETE` | `/api/ideas/<id>` | Safe delete idea |

### Content (`/api/content`)
| Method | Route | Description |
|---|---|---|
| `GET` | `/api/content` | List content items (supports `search`, `status`, `content_type`, `platform`, `tags`, `sort_by`, `sort_order`) |
| `GET` | `/api/content/stats` | Content library metrics (drafts, scheduled, published, words written, duration) |
| `GET` | `/api/content/<id>` | Fetch single content item by ID |
| `POST` | `/api/content` | Create new content draft with validation |
| `PUT` | `/api/content/<id>` | Update content item and recalculate metadata |
| `DELETE` | `/api/content/<id>` | Delete content item |
| `POST` | `/api/content/convert-idea/<idea_id>` | Convert an idea into Content Studio draft |
| `POST` | `/api/content/demo-assist` | Offline deterministic creative helper (hooks, headlines, hashtags) |

---

## Team Integration Contracts
- **Contributor 1 (Core & Auth)**:
  Ideas and content items carry `created_at`, `updated_at`, and can easily accept `creator_id` when authentication sessions are ready.
- **Contributor 3 (Calendar & Scheduling)**:
  `target_date` and `published_date` are standardized in ISO `YYYY-MM-DD` / ISO 8601 timestamps, ready for the Calendar view to query `/api/content` and display upcoming scheduled content.
- **Contributor 4 (Analytics & Insights)**:
  `/api/ideas/stats` and `/api/content/stats` provide aggregated metrics on output volume, platforms, formats, and word counts.
- **Contributor 7 (AI, QA, DevOps)**:
  Full pytest suite in `tests/` and frontend production build via `npm run build`.

---

## Verification & Commands
- **Backend Tests**: `python -m pytest tests/ -v` (28/28 passing)
- **Frontend Build**: `cd frontend && npm run build` (Vite build successful)
- **Start Backend**: `python -m backend.app`
- **Start Frontend**: `cd frontend && npm run dev`
