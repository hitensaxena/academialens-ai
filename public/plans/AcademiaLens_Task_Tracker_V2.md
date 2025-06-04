# AcademiaLens - Project Task Tracker (V2)

This document serves as a centralized task tracker for the AcademiaLens project, organized by development phases and functional areas.

## Legend
- 🔄 In Progress
- ✅ Completed
- ⏳ Pending
- 🔴 Blocked
- 👥 Needs Review
- 📅 [YYYY-MM-DD] - Target completion date
- 👤 [Initials] - Task owner
- 🔗 [T-XXX] - Related task ID
- ⚠️ - Potential risk/blocker

## Project Timeline Overview

### Phase 1: MVP - Core Ingestion & Basic Insight (Weeks 1-4)
- **Start Date**: 2025-06-03
- **End Date**: 2025-06-30
- **Focus**: Core functionality, basic AI features, and essential infrastructure.
- **Key Goals**: User authentication, document upload, basic semantic search, initial summarization.

### Phase 2: Expand Core & Interaction (Weeks 5-8)
- **Start Date**: 2025-07-01
- **End Date**: 2025-07-28
- **Focus**: Enhanced features, user interaction, performance improvements, and expanded AI capabilities.
- **Key Goals**: Advanced search filters, user feedback mechanisms, Q&A model integration.

### Phase 3: Full Suite & Advanced Inputs (Weeks 9-12)
- **Start Date**: 2025-07-29
- **End Date**: 2025-08-25
- **Focus**: Comprehensive feature set, advanced input methods, optimizations, and polish.
- **Key Goals**: Multi-document analysis, collaborative features, advanced analytics.

### Phase 4: Polish & Launch (Weeks 13-16)
- **Start Date**: 2025-08-26 (Estimated, assuming Phase 3 ends on 2025-08-25)
- **End Date**: 2025-09-22 (Estimated, 4 weeks duration)
- **Focus**: Refinement, production readiness, final testing, and launch.
- **Key Goals**: UI/UX refinements, performance optimization, security audit, UAT, official launch.

## Progress Tracking

### Overall Project Progress
- **Phase 1: MVP - Core Ingestion & Basic Insight**: ~36% (Calculated based on component progress)
- **Phase 2: Expand Core & Interaction**: 0%
- **Phase 3: Full Suite & Advanced Inputs**: 0%
- **Phase 4: Polish & Launch**: 0%

### Phase 1 Component Progress (MVP)
- **Frontend Development**: ~69%
- **Backend Development**: ~84%
- **UX/UI Design and Prototyping**: 25%
- **AI/ML Components**: 0%
- **DevOps & Infrastructure**: ~10%
- **Security**: ~22%

*(Note: Percentages are calculated by (completed_main_tasks / total_main_tasks_in_component_for_phase) * 100. Sub-tasks are not counted directly in this calculation but contribute to the completion of their parent task.)*


## Code Ownership & Component Registry

| Component                       | Owner(s)          | Location(s)                                                                 | Status          | Dependencies                                      |
|---------------------------------|-------------------|-----------------------------------------------------------------------------|-----------------|---------------------------------------------------|
| Frontend Core                   | FE Team           | `frontend/src`                                                              | 🔄 In Progress  | Next.js, Tailwind, Shadcn UI                      |
| Authentication Service (Backend)| BE Team           | `backend/app/api/v1/login`, `backend/app/core/security`                     | ✅ Completed    | User DB, Pydantic Schemas, JWT                      |
| User Management API (Backend)   | BE Team           | `backend/app/api/v1/users`, `backend/app/crud/crud_user.py`, `backend/app/schemas/user.py` | ✅ Completed    | User DB (SQLAlchemy), Alembic, Pydantic Schemas |
| Database Models (SQLAlchemy)    | BE Team           | `backend/app/db/models/`                                                    | 🔄 In Progress  | SQLAlchemy, PostgreSQL                            |
| Alembic Migrations              | BE Team           | `backend/alembic`                                                           | 🔄 In Progress  | SQLAlchemy Models                                 |
| Main Backend API (FastAPI)      | BE Team           | `backend/app/main.py`, `backend/app/api/v1/`                                | 🔄 In Progress  | All Routers, Auth Service, DB Session             |
| Frontend Auth UI                | FE Team           | `frontend/src/app/(auth)/`, `frontend/src/components/auth/`                 | 🔄 In Progress  | Backend Auth API, State Management, Shadcn UI     |
| Document Upload Service         | BE Team, FE Team  | `frontend/src/components/upload/`, `backend/app/api/v1/upload.py` (planned) | ⏳ Pending      | File Storage, Backend API                         |
| Text Extraction Service         | AI Team           | `backend/app/services/ai/text_extraction.py` (planned)                      | ⏳ Pending      | PyPDF2, python-docx, Tika                         |
| Embedding Generation Service    | AI Team           | `backend/app/services/ai/embedding_service.py` (planned)                    | ⏳ Pending      | SentenceTransformers, OpenAI API                  |
| Vector Store Integration        | AI Team, BE Team  | `backend/app/services/ai/vector_store.py` (planned)                         | ⏳ Pending      | Vector DB (e.g., PGVector, Pinecone, Weaviate)    |
| Semantic Search Service         | AI Team           | `backend/app/services/ai/semantic_search.py` (planned)                      | ⏳ Pending      | Vector Store, Embedding Service                   |
| Summarization Service           | AI Team           | `backend/app/services/ai/summarization_service.py` (planned)                | ⏳ Pending      | LLM (Gemini/GPT-4)                                |
| NER Service                     | AI Team           | `backend/app/services/ai/ner_service.py` (planned)                          | ⏳ Pending      | SpaCy, Transformers                               |
| Q&A Service                     | AI Team           | `backend/app/services/ai/qa_service.py` (planned)                           | ⏳ Pending      | LLM (Gemini/GPT-4), Vector Store                  |
| CI/CD Pipeline                  | DevOps Team       | `.github/workflows/`, `Dockerfile`s                                         | 🔄 In Progress  | Git, Docker, GitHub Actions, Cloud Provider       |
| Storybook Components            | FE Team           | `frontend/.storybook/`, `frontend/src/stories/`                             | 🔄 In Progress  | Frontend UI Components                            |
| Environment Config              | BE Team, FE Team  | `backend/.env`, `backend/app/core/config.py`, `frontend/.env`               | ✅ Completed    | Pydantic BaseSettings                             |

## Shared Components

| Component                       | Location(s)                                                                 | Owner(s)         | Status          | Used By                                           |
|---------------------------------|-----------------------------------------------------------------------------|------------------|-----------------|---------------------------------------------------|
| Shadcn UI Components            | `frontend/src/components/ui/` (e.g., `button.tsx`, `input.tsx`, `card.tsx`) | FE Team          | ✅ Completed    | Entire Frontend Application                       |
| Custom Reusable UI Components   | `frontend/src/components/common/`                                           | FE Team          | 🔄 In Progress  | Various features                                  |
| Layout Components               | `frontend/src/components/layout/` (e.g., `Header.tsx`, `Sidebar.tsx`)       | FE Team          | 🔄 In Progress  | All Pages                                         |
| API Client (Frontend)           | `frontend/src/lib/apiClient.ts`                                             | FE Team          | 🔄 In Progress  | Data fetching hooks, services                     |
| State Management (Zustand)      | `frontend/src/store/`                                                       | FE Team          | 🔄 In Progress  | Auth, User Profile, Search, Global UI State       |
| Theme Provider                  | `frontend/src/components/theme-provider.tsx`                                | FE Team          | ✅ Completed    | Global App (`layout.tsx`)                         |
| Utility Functions (Frontend)    | `frontend/src/lib/utils.ts`                                                 | FE Team          | 🔄 In Progress  | Various components and logic                      |
| Error Handling Utilities        | `frontend/src/utils/errorHandler.ts`, `frontend/src/hooks/useErrorHandler.ts` | FE Team          | ⏳ Pending      | Global error boundaries, API call error handling  |
| Pydantic Schemas (Backend)      | `backend/app/schemas/`                                                      | BE Team          | 🔄 In Progress  | API Endpoints, CRUD ops, Data Validation          |
| Database Session Mgmt (Backend) | `backend/app/db/session.py`, `backend/app/api/deps.py`                      | BE Team          | ✅ Completed    | All CRUD operations, API Endpoints needing DB     |
| Security Utilities (Backend)    | `backend/app/core/security.py`                                              | BE Team          | ✅ Completed    | JWT creation/validation, Password Hashing         |
| Logging Configuration           | `backend/app/core/logging_config.py` (planned)                              | BE Team / DevOps | ⏳ Pending      | Entire Backend Application                        |
| CORS Configuration (Backend)    | `backend/app/main.py` (middleware setup)                                    | BE Team          | ✅ Completed    | FastAPI Application                               |
| Husky Pre-commit Hooks          | `.husky/`                                                                   | Dev Team         | ✅ Completed    | Code linting/formatting. Refined: Husky script updated (deprecated lines removed), lint-staged config path set. 👤 CS 📅 2025-06-04 |

---

## Phase 1: MVP - Core Ingestion & Basic Insight

### 1.1 Frontend Development
#### Project Setup
- [x] **T-100** Create new Next.js 14+ project with TypeScript template ✅ 📅 2025-06-02
  - [x] **T-101** Configure `next.config.js` with necessary plugins 👤 FE1 ✅ 📅 2025-06-02
    - [x] Add bundle analyzer
    - [x] Configure image optimization
    - [x] Set up internationalization
  - [x] **T-102** Set up absolute imports configuration 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-103** Add `.editorconfig` for consistent code style 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-104** Initialize Git repository with `.gitignore` 👤 FE1 ✅ 📅 2025-06-02
- [x] **T-105** Configure Development Environment ✅ 📅 2025-06-02
  - [x] **T-106** Set up ESLint with TypeScript and React Hooks plugins 👤 FE2 ✅ 📅 2025-06-02
  - [x] **T-107** Configure Prettier with shared config 👤 FE2 ✅ 📅 2025-06-02
  - [x] **T-108** Add Husky for git hooks 👤 FE2 ✅ 📅 2025-06-02
  - [x] **T-109** Set up lint-staged for pre-commit checks 👤 FE2 ✅ 📅 2025-06-02
    - *Note: Refined by explicitly setting `lint-staged` config path to `package.json` in Husky script to resolve warnings, and removed deprecated Husky script lines. 👤 CS 📅 2025-06-04*

#### UI Component Library & Styling
- [x] **T-110** UI Component Library & Styling ✅ 📅 2025-06-02
  - [x] **T-111** Install and configure Tailwind CSS v4+ 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-112** Set up CSS variables for theming 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-113** Create base components (Button, Input, Form) 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-114** Implement responsive layout components 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-115** Set up global styles and CSS reset 👤 FE3 ✅ 📅 2025-06-02
    - *Note: Fixed Tailwind CSS `@apply` warning in `globals.css` by using direct CSS property. 👤 CS 📅 2025-06-04*
    - Updated to use Tailwind v4 syntax with `@import "tailwindcss/preflight"`
    - Configured PostCSS with necessary plugins
  - [x] **T-129** Component Library Completion 👤 FE3 ✅ 📅 2025-06-03
    - [x] **T-129.1** Core Form Components ✅ 📅 2025-06-03
      - [x] Form (React Hook Form integration) ✅ 📅 2025-06-02
      - [x] Enhance Input component ✅ 📅 2025-06-02
      - [x] Enhance Textarea component ✅ 📅 2025-06-03
      - [x] Create Select component ✅ 📅 2025-06-02
      - [x] Enhance Checkbox component ✅ 📅 2025-06-02
      - [x] Create Radio Group ✅ 📅 2025-06-03
      - [x] Create Switch ✅ 📅 2025-06-03
      - [x] Create Combobox/Autocomplete ✅ 📅 2025-06-03
    - [x] **T-129.2** Layout Components ✅ 📅 2025-06-03
      - [x] Enhance Card component ✅ 📅 2025-06-03
      - [x] Create Dialog/Modal ✅ 📅 2025-06-03
      - [x] Create Dropdown Menu ✅ 📅 2025-06-03
      - [x] Create Tabs ✅ 📅 2025-06-03
      - [x] Create Table ✅ 📅 2025-06-03
      - [x] Create Alert ✅ 📅 2025-06-03
      - [x] Review Toast component ✅ 📅 2025-06-03
    - [x] **T-129.3** Navigation Components ✅ 📅 2025-06-03
      - [x] Create Navigation Menu ✅ 📅 2025-06-03
      - [x] Create Breadcrumb ✅ 📅 2025-06-03
      - [x] Create Pagination ✅ 📅 2025-06-03
    - [ ] **T-129.4** Feedback Components
      - [x] Create Skeleton ✅ 📅 2025-06-03
      - [x] Create Progress ✅ 📅 2025-06-03
      - [x] Create Tooltip ✅ 📅 2025-06-03
- [x] T-FE-SB-001: Configure Storybook with Tailwind CSS and PostCSS (Owner: FE Team) ✅ (Related to T-127)

#### State Management & Project Structure
- [x] **T-116** State Management ✅ 📅 2025-06-02
  - [x] **T-117** Set up React Query for server state 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-118** Configure Zustand for client state 👤 FE2 ✅ 📅 2025-06-02
  - [x] **T-119** Create API client with axios 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-120** Implement global error boundary 👤 FE2 ✅ 📅 2025-06-02
- [x] **T-121** Project Structure ✅ 📅 2025-06-02
  - [x] **T-122** Create directory structure 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-123** Set up UI components structure 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-124** Configure shared utilities and types 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-125** Set up TypeScript path aliases 👤 FE1 ✅ 📅 2025-06-02
  - [x] **T-126** Configure environment variables handling 👤 FE2 ✅ 📅 2025-06-02

#### Authentication & User Profile
- [x] **T-700** Authentication UI Implementation ✅
  - [x] **T-701** Create Login, Signup, Forgot Password, Reset Success Screens 👤 FE1 📅 2025-06-05 ✅
    - 🔄 Implement OAuth2 password bearer flow
    - [x] Add social login buttons (Google styled, functionality pending)
    - [x] Add "Forgot Password" link
    - [x] Add "Create Account" / "Login Now" links
    - [x] Implement form validation (via react-hook-form & Zod)
    - [x] Add loading states (buttons disable, show spinner)
    - [x] Pixel-perfect styling for all auth screens based on Figma designs.
  - ✅ **T-405** Authentication API (JWT, OAuth2) 👤 BE4 📅 2025-06-10 (Backend Task)
    - [x] Create AuthLayout component
    - [x] Implement form input components
    - [x] Create social login buttons
    - [x] Add loading spinners
    - [x] Implement error message components
    - [x] Add request validation and error handling
  - [x] **T-706** Authentication State Management 👤 FE1 ✅ (Corresponds to T-210)
    - [x] Implement auth context/provider (T-211/T-216)
    - [x] Add user session management (T-212)
    - [x] Implement protected routes (T-213)
    - [x] Add auth state persistence (T-217, T-217.1, T-217.2)
    - [x] Handle authentication errors (T-214)
    - [x] Add loading states during auth operations (T-215)
- [ ] **T-218** User Profile
  - ✅ **T-401** User Profile Management API (FastAPI) 👤 BE3 📅 2025-06-07 (Backend Task)
  - [ ] **T-220** Account settings form 👤 FE6 📅 2025-06-04
    - [~] Update personal information (Frontend form integrated with user store, fetches user data, and submits updates. Pending E2E testing with login flow)
    - [~] Change password functionality (Frontend and Backend implemented. Pending E2E testing with login flow)
    - [ ] Notification preferences
  - [!] **T-221** Password change form 👤 FE6 📅 2025-06-03 (Original component not found/re-evaluated; new ChangePasswordForm.tsx created under T-220)

#### Dashboard & Core Navigation
- [ ] **T-230** Dashboard Implementation & Core Navigation 👤 FE_TEAM 📅 2025-07-15
  - [ ] **T-231** Design main dashboard structure & layout (high-fidelity mockups) 👤 UX_USER 📅 2025-06-18 (UX Task)
    - [ ] **T-231.1** Define key dashboard information/widgets 👤 PM_USER 📅 2025-06-15 (Product Task)
  - [ ] **T-232** Implement responsive main layout (Sidebar, Topbar, Content Area) 👤 FE_USER 📅 2025-06-25
    - [ ] **T-232.1** Ensure layout is responsive across mobile, tablet, and desktop breakpoints.
    - [ ] **T-232.2** Implement interactive elements within navigation.
  - [ ] **T-233** Create placeholder content areas for dashboard widgets 👤 FE_USER 📅 2025-06-28
    - [ ] **T-233.1** Identify and define API endpoints required for initial dashboard widgets.
  - [ ] **T-234** Integrate basic routing for authenticated sections 👤 FE_USER 📅 2025-07-05
    - [ ] **T-234.1** Set up Next.js App Router structure for authenticated areas.
    - [ ] **T-234.2** Implement route protection.

#### Other Frontend Tasks
- [x] **T-130** Notification System ✅ 📅 2025-06-02
  - [x] **T-131** Implement toast notification component 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-132** Create custom toast hook with TypeScript support 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-133** Add success/error/info toast variants 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-134** Implement auto-dismiss functionality 👤 FE3 ✅ 📅 2025-06-02
  - [x] **T-135** Add accessibility support 👤 FE3 ✅ 📅 2025-06-02
- [ ] T-FE-MVP-004: Create Document Upload Interface (Owner: FE Team) <!-- Retained from placeholder -->
- [ ] T-FE-MVP-005: Implement Basic Search Results Display (Owner: FE Team) <!-- Retained from placeholder -->
- [ ] **T-125** Documentation (Project Level)
  - [x] **T-126** Add README with setup instructions 👤 FE1 ✅ 📅 2025-06-02
  - [ ] **T-127** Document component patterns & Integrate Storybook 👤 FE3 📅 2025-06-20
    - [x] **T-127.1** Integrate Storybook into the Next.js project 👤 User/Cascade ✅ (Related to T-FE-SB-001)
    - [ ] **T-127.2** Create comprehensive stories for each ui-kit component 👤 FE_USER 📅 2025-06-28
    - [ ] **T-127.3** Finalize documentation for all shared UI components 👤 FE_USER 📅 2025-06-30
  - [ ] **T-128** Create contribution guidelines 👤 FE1 📅 2025-06-12
- [ ] T-204: Style Guide & Component Design Specs (Owner: UX Team, FE Team) 📅 2025-06-14 (UX Task, FE implements)
  - [ ] Sub-task: Define typography, color palettes, spacing, and grid systems.
  - [ ] Sub-task: Design base components (buttons, forms, cards, navigation).
  - [ ] Sub-task: Specify interaction patterns and animations.
  - [ ] Sub-task: Document accessibility guidelines (WCAG 2.1 AA).
  - [ ] Sub-task: Create a living style guide (e.g., using Storybook or Zeroheight).
- [x] **T-707** Testing (Authentication specific) 👤 QA1 ✅
    - [x] Write unit tests for auth components
    - [x] Add integration tests for auth flow
    - [x] Test error scenarios
    - [x] Test responsive behavior
    - [ ] Add end-to-end tests
    - [ ] Test cross-browser compatibility
- [x] **T-708** Documentation (Authentication specific) 👤 FE1 ✅
    - [x] Update component documentation
    - [x] Add auth flow diagrams
    - [x] Document error handling
    - [x] Update API integration docs

### 1.2 Backend Development
#### Project Setup & Database
- [x] **T-300** Initialize FastAPI Project Structure ✅ 📅 2025-06-03
  - [x] **T-301** Set up project directories (`app`, `core`, `db`, `schemas`, `crud`, `api`, `tests`) 👤 BE1 ✅ 📅 2025-06-03
  - [x] **T-302** Configure `main.py` with FastAPI app instance and initial routers 👤 BE1 ✅ 📅 2025-06-03
  - [x] **T-303** Implement basic health check endpoint (`/health`) 👤 BE1 ✅ 📅 2025-06-03
- [x] **T-304** Database Setup (PostgreSQL) ✅ 📅 2025-06-05
  - [x] **T-305** Install PostgreSQL and create database 👤 BE2 ✅ 📅 2025-06-04
  - [x] **T-306** Configure SQLAlchemy with async engine (`asyncpg`) 👤 BE2 ✅ 📅 2025-06-04
  - [x] **T-307** Define base model for SQLAlchemy ORM (`db/base_class.py`) 👤 BE2 ✅ 📅 2025-06-04
  - [x] **T-308** Set up Alembic for database migrations 👤 BE2 ✅ 📅 2025-06-05
    - [x] **T-308.1** Initialize Alembic environment.
    - [x] **T-308.2** Configure `env.py` to use `Base.metadata` and `DATABASE_URL`.
    - [x] **T-308.3** Enable `compare_type` and `compare_server_default`.
  - [x] **T-309** Create initial User model (`models/user.py`) 👤 BE2 ✅ 📅 2025-06-05
  - [x] **T-310** Generate and apply initial Alembic migration for User table 👤 BE2 ✅ 📅 2025-06-05 (Revision: 7108734c05fc)

#### User Profile & Authentication API
- [x] **T-400** User Profile Management API (FastAPI) ✅ 📅 2025-06-07
  - [x] **T-401** Define Pydantic schemas for User (User, UserCreate, UserUpdate, UserInDB) (`schemas/user.py`) 👤 BE3 ✅ 📅 2025-06-06
  - [x] **T-402** Implement password hashing utilities (`core/security.py`) 👤 BE3 ✅ 📅 2025-06-06
  - [x] **T-403** Create CRUD operations for User (`crud/crud_user.py`) 👤 BE3 ✅ 📅 2025-06-06
  - [x] **T-404** Develop API endpoints for User CRUD (`api/v1/endpoints/users.py`) 👤 BE3 ✅ 📅 2025-06-07
    - [x] `POST /users/` (create user)
    - [x] `GET /users/me` (get current user)
    - [x] `GET /users/{user_id}` (get user by id - secured)
    - [x] `PUT /users/{user_id}` (update user - secured)
    - [x] `DELETE /users/{user_id}` (delete user - secured)
    - [x] `GET /users/` (get all users - secured, admin only later)
- [x] **T-405** Authentication API (JWT, OAuth2) ✅ 📅 2025-06-10
  - [x] **T-406** Configure OAuth2PasswordBearer flow (`core/security.py`) 👤 BE4 ✅ 📅 2025-06-08
  - [x] **T-407** Implement token creation function (`create_access_token`) 👤 BE4 ✅ 📅 2025-06-08
  - [x] **T-408** Create login endpoint (`/login/access-token`) to issue JWT 👤 BE4 ✅ 📅 2025-06-09
  - [x] **T-409** Implement dependency `get_current_user` to verify token and fetch user (`api/deps.py`) 👤 BE4 ✅ 📅 2025-06-09
  - [x] **T-410** Secure User Profile endpoints using `Depends(get_current_user)` 👤 BE4 ✅ 📅 2025-06-10
  - [x] **T-411** Add Pydantic schemas for Token (`schemas/token.py`) 👤 BE4 ✅ 📅 2025-06-08

#### Environment & Configuration
- [x] **T-500** Environment Variable Configuration ✅ 📅 2025-06-03
  - [x] **T-501** Set up Pydantic `BaseSettings` for config management (`core/config.py`) 👤 BE1 ✅ 📅 2025-06-03
  - [x] **T-502** Define `.env` file with necessary variables (DATABASE_URL, SECRET_KEY, etc.) 👤 BE1 ✅ 📅 2025-06-03
  - [x] **T-503** Ensure `.env` is in `.gitignore` 👤 BE1 ✅ 📅 2025-06-03

#### CORS & Middleware
- [x] **T-504** CORS Configuration ✅ 📅 2025-06-04
  - [x] **T-505** Add `CORSMiddleware` to FastAPI app 👤 BE2 ✅ 📅 2025-06-04
  - [x] **T-506** Configure allowed origins, methods, headers via environment variables 👤 BE2 ✅ 📅 2025-06-04 (BACKEND_CORS_ORIGINS)

#### Linting & Formatting
- [x] **T-507** Linting and Formatting Setup ✅ 📅 2025-06-03
  - [x] **T-508** Configure Flake8 or Ruff for linting 👤 BE1 ✅ 📅 2025-06-03
    - *Note: Configured Flake8 for consistent line length (88 chars), ignored E203/W503, and per-file E501 for `crud_user.py`. 👤 CS 📅 2025-06-04*
  - [x] **T-509** Configure Black for code formatting 👤 BE1 ✅ 📅 2025-06-03
  - [x] **T-510** Add pre-commit hooks for linting and formatting 👤 BE1 ✅ 📅 2025-06-03

#### Other Backend Tasks (Phase 1)
- [ ] T-BE-MVP-003: Develop Document Upload API (with storage integration) (Owner: BE3) 📅 2025-06-20
- [ ] T-BE-MVP-004: Create Search API Endpoint (integrating with AI service) (Owner: BE4) 📅 2025-06-28
- [ ] **T-511** Basic API Documentation (Swagger UI / OpenAPI) 🔄
  - [x] **T-511.1** Ensure all Pydantic models have examples for Swagger docs 👤 BE_TEAM ✅
  - [ ] **T-511.2** Add descriptions and tags to all endpoints 👤 BE_TEAM 📅 2025-06-15
- [ ] **T-512** Initial Unit Tests for Core Functionality 👤 BE_TEAM 📅 2025-06-20
  - [ ] Test User CRUD operations
  - [ ] Test Authentication flow
  - [ ] Test helper utilities

### 1.3 UX/UI Design and Prototyping
#### User Research & Analysis
- [ ] **T-UX-100** Conduct User Interviews & Surveys 👤 UX1 📅 2025-06-10
  - [ ] **T-UX-101** Define target user personas
  - [ ] **T-UX-102** Prepare interview scripts and survey questions
  - [ ] **T-UX-103** Recruit participants
  - [ ] **T-UX-104** Analyze feedback and synthesize findings
- [ ] **T-UX-105** Competitive Analysis 👤 UX2 📅 2025-06-12
  - [ ] **T-UX-106** Identify key competitors and comparable products
  - [ ] **T-UX-107** Analyze competitor strengths, weaknesses, and features
  - [ ] **T-UX-108** Document best practices and identify opportunities

#### Wireframing & Prototyping
- [✅] **T-201** Low-Fidelity Wireframes (Core User Flows) 👤 UX1 ✅ 📅 2025-06-07
  - [✅] Authentication (Login, Signup, Forgot Password)
  - [✅] Dashboard Overview
  - [✅] Document Upload Flow
  - [✅] Search Results Page
  - [✅] User Profile/Settings
- [✅] **T-202** Interactive Prototypes (Key Flows - Figma) 👤 UX1 ✅ 📅 2025-06-14
  - [✅] Clickable prototype for core navigation and interactions.
- [ ] **T-UX-110** Usability Testing (Round 1 - on Prototypes) 👤 UX_TEAM 📅 2025-06-21
  - [ ] **T-UX-111** Prepare test plan and scripts
  - [ ] **T-UX-112** Recruit participants
  - [ ] **T-UX-113** Conduct testing sessions
  - [ ] **T-UX-114** Analyze results and iterate on designs

#### High-Fidelity Mockups & UI Design
- [🔄] **T-UX-115** High-Fidelity Mockups (All Screens) 👤 UX_DESIGNER 📅 2025-06-28
  - [🔄] **T-UX-115.1** Dashboard & Core App Screens
  - [ ] **T-UX-115.2** Authentication Screens (Refined)
  - [ ] **T-UX-115.3** Settings & Profile Screens
  - [ ] **T-UX-115.4** Empty states and error states
  - [ ] **T-UX-115.5** Responsive design variations (Mobile, Tablet, Desktop)

#### Style Guide & Component Design
- [🔄] **T-204** Style Guide & Component Design Specs (Living Document) 👤 UX2, FE_TEAM 📅 2025-07-05
  - [🔄] **T-204.1** Define Core Color Palette (Primary, Secondary, Accent, Neutrals, Status)
  - [🔄] **T-204.2** Define Typography System (Fonts, Sizes, Weights, Line Heights for headings, body, captions)
  - [🔄] **T-204.3** Define Spacing & Grid System (margins, paddings, layout grids)
  - [🔄] **T-204.4** Define Iconography Style & Select/Create Icon Set (consistent style, usage guidelines)
  - [ ] **T-204.5** Design Specs for Basic UI Components (Buttons, Inputs, Cards, Modals, Tabs, Tooltips, etc.)
    - [ ] Detailed states (default, hover, active, disabled)
    - [ ] Interaction guidelines
  - [ ] **T-204.6** Document Initial Accessibility Guidelines for Styles (color contrast, focus states)
  - [ ] **T-204.7** Create a shared Figma library for UI components.
  - [ ] **T-204.8** Collaborate with FE team on Storybook integration for living style guide.

#### User Journey & Accessibility
- [ ] **T-203** User Journey Mapping (Detailed for Core Scenarios) 👤 UX1 📅 2025-06-18
  - [ ] Map out user steps, pain points, and opportunities for key tasks.
- [ ] **T-205** Accessibility Review & Guidelines (WCAG 2.1 AA+) 👤 UX_ACCESSIBILITY_LEAD 📅 2025-07-12
  - [ ] **T-205.1** Audit designs against WCAG guidelines.
  - [ ] **T-205.2** Provide recommendations for FE implementation.
  - [ ] **T-205.3** Document accessibility best practices for the team.

### 1.4 AI/ML Components
#### Research & Model Selection
- [ ] **T-AI-100** Research and select foundational LLM (e.g., Gemini, GPT-4) 👤 ML_LEAD 📅 2025-06-10
  - [ ] **T-AI-101** Evaluate API capabilities, pricing, and limitations.
  - [ ] **T-AI-102** Proof of concept for core use cases (summarization, Q&A).
- [ ] **T-AI-103** Research and select embedding models (e.g., Sentence Transformers, OpenAI Embeddings) 👤 ML_ENG 📅 2025-06-12
- [ ] **T-AI-104** Research and select vector database (e.g., Pinecone, Weaviate, FAISS) 👤 ML_ENG, DEVOPS 📅 2025-06-14

#### API Integration & Setup
- [ ] **T-AI-105** Set up Gemini API access and client library 👤 ML_ENG 📅 2025-06-15
  - [ ] **T-AI-105.1** Secure API key management.
- [ ] **T-AI-106** Develop wrapper functions for common Gemini API calls 👤 ML_ENG 📅 2025-06-20

#### Data Processing & Pipelines
- [ ] **T-AI-107** Design data pipeline for document ingestion and processing 👤 ML_ENG, BE_TEAM 📅 2025-06-18
  - [ ] **T-AI-107.1** Define steps: text extraction, cleaning, chunking, embedding, storage.
- [ ] **T-AI-108** Implement `TextExtractor` component 👤 ML_ENG1 📅 2025-06-25
  - [ ] **T-AI-108.1** Support for PDF, DOCX, TXT.
  - [ ] **T-AI-108.2** Basic text cleaning (remove headers/footers, special characters if needed).
- [ ] **T-AI-109** Implement `EmbeddingModel` integration 👤 ML_ENG2 📅 2025-06-28
  - [ ] **T-AI-109.1** Function to generate embeddings for text chunks.
  - [ ] **T-AI-109.2** Batch processing capabilities.
- [ ] **T-AI-110** Integrate with selected Vector Database 👤 ML_ENG, DEVOPS 📅 2025-07-05
  - [ ] **T-AI-110.1** Schema design for storing embeddings and metadata.
  - [ ] **T-AI-110.2** Functions for upserting and querying vectors.

#### Core AI/ML Components (Phase 1)
- [ ] **T-AI-111** `SemanticSearch` Component 👤 ML_ENG3 📅 2025-07-10
  - [ ] **T-AI-111.1** API endpoint to receive search query.
  - [ ] **T-AI-111.2** Generate embedding for query.
  - [ ] **T-AI-111.3** Perform similarity search in vector DB.
  - [ ] **T-AI-111.4** Retrieve and rank relevant text chunks/document IDs.
- [ ] **T-AI-112** Basic `Summarization` Component (using Gemini) 👤 ML_ENG1 📅 2025-07-12
  - [ ] **T-AI-112.1** API endpoint to receive document ID or text.
  - [ ] **T-AI-112.2** Prompt engineering for concise and relevant summaries.
  - [ ] **T-AI-112.3** Handle different document lengths.
- [ ] **T-AI-113** `NERService` - Named Entity Recognition (using Gemini or spaCy) 👤 ML_ENG2 📅 2025-07-15
  - [ ] **T-AI-113.1** API endpoint to receive text.
  - [ ] **T-AI-113.2** Identify and categorize entities (e.g., Person, Organization, Location, Key Terms).
- [ ] **T-AI-114** Basic `QAModel` - Question Answering (using Gemini with context) 👤 ML_ENG3 📅 2025-07-20
  - [ ] **T-AI-114.1** API endpoint to receive question and document context.
  - [ ] **T-AI-114.2** Prompt engineering for retrieving answers from provided text.

#### Testing & Evaluation Framework
- [ ] **T-AI-115** Define initial metrics for evaluating AI components (e.g., search relevance, summary quality) 👤 ML_LEAD 📅 2025-06-30
- [ ] **T-AI-116** Set up basic logging and monitoring for AI service calls 👤 ML_ENG, DEVOPS 📅 2025-07-10

### 1.5 DevOps & Infrastructure
#### Version Control & Collaboration
- [x] **T-DO-100** Setup Git Repository & Branching Strategy (e.g., Gitflow) 👤 DevOps1 ✅ 📅 2025-06-05
  - [x] **T-DO-100.1** Initialize main, develop, feature branches.
  - [x] **T-DO-100.2** Define PR templates and contribution guidelines.

#### CI/CD Pipeline
- [ ] **T-DO-101** Configure CI/CD Pipeline (GitHub Actions / GitLab CI) 👤 DevOps2 📅 2025-06-15
  - [ ] **T-DO-101.1** Automated builds for frontend and backend.
  - [ ] **T-DO-101.2** Automated testing (unit, integration) integration.
  - [ ] **T-DO-101.3** Linting and code quality checks.
  - [ ] **T-DO-101.4** Docker image building and pushing to registry (e.g., Docker Hub, ECR).
  - [ ] **T-DO-101.5** Automated deployments to staging environment.

#### Infrastructure Provisioning (Cloud - e.g., AWS, GCP, Azure)
- [ ] **T-DO-102** Provision Cloud Infrastructure (IaC - Terraform / Pulumi) 👤 DevOps3 📅 2025-06-20
  - [ ] **T-DO-102.1** Setup VPC, subnets, security groups.
  - [ ] **T-DO-102.2** Provision managed PostgreSQL database instance.
  - [ ] **T-DO-102.3** Provision compute resources for backend (e.g., ECS, Cloud Run, App Service).
  - [ ] **T-DO-102.4** Provision compute/hosting for frontend (e.g., Vercel, Netlify, S3/CloudFront).
  - [ ] **T-DO-102.5** Provision object storage for document uploads (e.g., S3, GCS, Azure Blob).
  - [ ] **T-DO-102.6** Setup DNS and basic CDN configuration.

#### Containerization & Orchestration (if applicable)
- [ ] **T-DO-103** Dockerize Frontend and Backend Applications 👤 DevOps1, BE_TEAM, FE_TEAM 📅 2025-06-12
  - [ ] **T-DO-103.1** Create `Dockerfile` for backend.
  - [ ] **T-DO-103.2** Create `Dockerfile` for frontend (if not using PaaS like Vercel).
- [ ] **T-DO-104** Setup Docker Compose for local development environment 👤 DevOps2 📅 2025-06-18

#### Logging & Monitoring
- [ ] **T-DO-105** Implement Centralized Logging Solution (e.g., ELK Stack, CloudWatch Logs, Datadog) 👤 DevOps3 📅 2025-06-25
  - [ ] **T-DO-105.1** Configure backend application to send logs.
  - [ ] **T-DO-105.2** Configure frontend application to send logs (if applicable).
- [ ] **T-DO-106** Setup Basic Monitoring & Alerting (e.g., Prometheus/Grafana, CloudWatch Metrics) 👤 DevOps3 📅 2025-06-30
  - [ ] **T-DO-106.1** Monitor CPU, memory, disk space for critical services.
  - [ ] **T-DO-106.2** Monitor API error rates and latency.
  - [ ] **T-DO-106.3** Setup basic alerts for critical issues.

#### Deployment Strategy (Phase 1 - MVP)
- [ ] **T-DO-107** Define and implement deployment strategy for Staging environment 👤 DevOps_LEAD 📅 2025-06-22
- [ ] **T-DO-108** Manual deployment process for Production (MVP initial launch) 👤 DevOps_LEAD 📅 (Align with Phase 4)

### 1.6 Security
#### Authentication & Authorization
- [x] **T-SEC-100** Review and Harden JWT Implementation (Backend) 👤 SecOps1, BE_TEAM ✅ 📅 2025-06-08
  - [x] **T-SEC-100.1** Ensure strong secret keys, appropriate algorithms (e.g., RS256/ES256).
  - [x] **T-SEC-100.2** Implement token expiry and refresh token strategy (if applicable for MVP).
  - [x] **T-SEC-100.3** Secure token storage on client-side (HttpOnly cookies recommended).
- [ ] **T-SEC-101** Implement Role-Based Access Control (RBAC) - Basic Roles 👤 BE_TEAM, SecOps1 📅 2025-06-20
  - [ ] **T-SEC-101.1** Define initial roles (e.g., user, admin).
  - [ ] **T-SEC-101.2** Secure API endpoints based on roles.

#### Data Security
- [ ] **T-SEC-102** Ensure Data Encryption at Rest (Database, Storage) 👤 DevOps3, SecOps2 📅 2025-06-22
  - [ ] **T-SEC-102.1** Verify database encryption settings.
  - [ ] **T-SEC-102.2** Verify object storage encryption settings.
- [x] **T-SEC-103** Ensure Data Encryption in Transit (HTTPS/TLS Everywhere) 👤 DevOps3, FE_TEAM, BE_TEAM 📅 2025-06-10 ✅
  - [x] **T-SEC-103.1** Enforce HTTPS for all client-server communication. ✅
  - [x] **T-SEC-103.2** Use TLS for backend to database connections. ✅
- [ ] **T-SEC-104** Implement Input Validation and Sanitization (Backend & Frontend) 👤 BE_TEAM, FE_TEAM 📅 2025-06-25
  - [ ] **T-SEC-104.1** Protect against XSS, SQL Injection, Command Injection.
  - [ ] **T-SEC-104.2** Use Pydantic for backend validation, appropriate libraries for frontend.

#### Infrastructure Security
- [ ] **T-SEC-105** Basic Security Hardening for Servers & Services 👤 DevOps3, SecOps1 📅 2025-06-15
  - [ ] **T-SEC-105.1** Minimize attack surface (disable unused ports/services).
  - [ ] **T-SEC-105.2** Regular patching and updates (OS, software).
  - [ ] **T-SEC-105.3** Configure firewalls and network security groups.
- [ ] **T-SEC-106** Setup Secure Secret Management (e.g., HashiCorp Vault, AWS Secrets Manager) 👤 SecOps2, DevOps2 📅 2025-06-18
  - [ ] **T-SEC-106.1** Store API keys, database credentials, etc. securely.
  - [ ] **T-SEC-106.2** Integrate applications to fetch secrets at runtime.

#### Dependency & Code Security
- [ ] **T-SEC-107** Implement Dependency Vulnerability Scanning (e.g., Snyk, GitHub Dependabot) 👤 DevOps2, SecOps1 📅 2025-06-28
  - [ ] **T-SEC-107.1** Integrate into CI/CD pipeline.
  - [ ] **T-SEC-107.2** Establish process for reviewing and remediating vulnerabilities.
- [ ] **T-SEC-108** Conduct Basic Static Application Security Testing (SAST) - (e.g. Bandit for Python, ESLint security plugins for JS/TS) 👤 BE_TEAM, FE_TEAM 📅 2025-07-05
  - [ ] **T-SEC-108.1** Integrate SAST tools into CI/CD pipeline or pre-commit hooks.

#### Security Best Practices & Awareness
- [ ] **T-SEC-109** Establish Initial Security Best Practices Documentation 👤 SecOps_LEAD 📅 2025-07-01
  - [ ] **T-SEC-109.1** Secure coding guidelines.
  - [ ] **T-SEC-109.2** Incident response plan (basic).
- [ ] **T-SEC-110** Security awareness for development team (e.g. OWASP Top 10) 👤 SecOps_LEAD 📅 2025-07-10

---

## Phase 2: Expand Core & Interaction
Focus: Enhanced features, user interaction, performance improvements, and expanded AI capabilities.
Key Goals: Advanced search filters, user feedback mechanisms, Q&A model integration, initial multi-document analysis capabilities.

### 2.1 Frontend Development
#### Advanced Search & Filtering
- [ ] **T-FE-200** Implement Advanced Search Filters UI 👤 FE_TEAM 📅 2025-07-08
  - [ ] **T-FE-200.1** Date range pickers.
  - [ ] **T-FE-200.2** Document type selectors (PDF, DOCX, etc.).
  - [ ] **T-FE-200.3** Entity-based filters (if NER is ready).
  - [ ] **T-FE-200.4** UI for saving search queries.
- [ ] **T-FE-201** Integrate Advanced Search Filters with Backend API 👤 FE_TEAM 📅 2025-07-12

#### User Interaction & Feedback
- [ ] **T-FE-202** Implement Document/Snippet Rating System UI 👤 FE1 📅 2025-07-10
- [ ] **T-FE-203** User Feedback Submission Form (for search results, summaries) 👤 FE2 📅 2025-07-15
- [ ] **T-FE-204** Enhanced Document Viewer (e.g., page navigation for PDFs, highlighting) 👤 FE_TEAM 📅 2025-07-18
- [ ] **T-FE-205** User Preferences/Settings Page (e.g., results per page, default sort) 👤 FE1 📅 2025-07-20

#### Performance & UI Polish
- [ ] **T-FE-206** Implement Virtualized Lists for Long Search Results 👤 FE2 📅 2025-07-22
- [ ] **T-FE-207** Code Splitting and Lazy Loading for Non-Critical Components 👤 FE_TEAM 📅 2025-07-25
- [ ] **T-FE-208** UI Polish based on User Feedback (Round 1) 👤 UX_DESIGNER, FE_TEAM 📅 2025-07-28

### 2.2 Backend Development
#### Advanced Search Capabilities
- [ ] **T-BE-200** Extend Search API to Support Advanced Filters 👤 BE_TEAM 📅 2025-07-10
  - [ ] **T-BE-200.1** Filtering by metadata (date, type, source).
  - [ ] **T-BE-200.2** Filtering by extracted entities (if NER is ready).
- [ ] **T-BE-201** API for Saving and Retrieving User Search Queries 👤 BE1 📅 2025-07-12

#### User Feedback & Interaction Support
- [ ] **T-BE-202** API for Storing Document/Snippet Ratings 👤 BE2 📅 2025-07-15
- [ ] **T-BE-203** API for Storing User Feedback Submissions 👤 BE1 📅 2025-07-18
- [ ] **T-BE-204** API for User Preferences/Settings Management 👤 BE2 📅 2025-07-22

#### Performance & Scalability
- [ ] **T-BE-205** Optimize Database Queries for Search and Filtering 👤 BE_TEAM 📅 2025-07-25
- [ ] **T-BE-206** Implement Caching for Frequently Accessed Data (e.g., popular search results, user profiles) 👤 BE_TEAM 📅 2025-07-28

### 2.3 UX/UI Design
#### Feature Enhancements
- [ ] **T-UX-200** Design for Advanced Search Filters 👤 UX_DESIGNER 📅 2025-07-05
- [ ] **T-UX-201** Design for Document/Snippet Rating and Feedback Mechanisms 👤 UX_DESIGNER 📅 2025-07-08
- [ ] **T-UX-202** Design for Enhanced Document Viewer Features 👤 UX_DESIGNER 📅 2025-07-12
- [ ] **T-UX-203** Design for User Preferences/Settings Page 👤 UX_DESIGNER 📅 2025-07-15

#### Usability & Iteration
- [ ] **T-UX-204** Usability Testing (Round 2 - on enhanced features) 👤 UX_TEAM 📅 2025-07-22
  - [ ] **T-UX-204.1** Analyze feedback and iterate on designs.
- [ ] **T-UX-205** Refine UI based on Usability Testing (Round 2) 👤 UX_DESIGNER 📅 2025-07-28

### 2.4 AI/ML Components
#### Q&A Model Integration & Enhancement
- [ ] **T-AI-200** Integrate `QAModel` with Frontend for Document-Specific Q&A 👤 ML_TEAM, FE_TEAM 📅 2025-07-15
  - [ ] **T-AI-200.1** UI for asking questions within a document context.
- [ ] **T-AI-201** Enhance `QAModel` for Conversational Context (basic history) 👤 ML_TEAM 📅 2025-07-20
- [ ] **T-AI-202** Experiment with Re-ranking Search Results using Q&A Model (Exploratory) 👤 ML_TEAM 📅 2025-07-25

#### Multi-Document Analysis (Initial)
- [ ] **T-AI-203** Develop Strategy for Cross-Document Q&A / Summarization 👤 ML_LEAD 📅 2025-07-10
- [ ] **T-AI-204** PoC for Multi-Document Summarization (e.g., summarizing top N search results) 👤 ML_TEAM 📅 2025-07-28

#### Model Monitoring & Retraining Strategy
- [ ] **T-AI-205** Implement Basic Feedback Loop for Model Improvement (e.g., using ratings) 👤 ML_TEAM 📅 2025-07-22
- [ ] **T-AI-206** Define Initial Strategy for Model Retraining/Fine-tuning 👤 ML_LEAD 📅 2025-07-28

### 2.5 DevOps & Infrastructure
#### Scalability & Performance
- [ ] **T-DO-200** Implement Autoscaling for Backend Services 👤 DevOps_TEAM 📅 2025-07-15
- [ ] **T-DO-201** Setup Load Balancing for Backend Services 👤 DevOps_TEAM 📅 2025-07-18
- [ ] **T-DO-202** Optimize CI/CD Pipeline for Faster Builds and Deployments 👤 DevOps_TEAM 📅 2025-07-22

#### Monitoring & Observability
- [ ] **T-DO-203** Enhance Monitoring: Application Performance Monitoring (APM) 👤 DevOps_TEAM 📅 2025-07-25
- [ ] **T-DO-204** Setup Distributed Tracing for Microservices (if applicable) 👤 DevOps_TEAM 📅 2025-07-28

### 2.6 Security
#### API Security
- [ ] **T-SEC-200** Implement Rate Limiting and Brute Force Protection for APIs 👤 SecOps, BE_TEAM 📅 2025-07-15
- [ ] **T-SEC-201** Review and Secure Inter-Service Communication (if microservices) 👤 SecOps 📅 2025-07-20

#### Vulnerability Management
- [ ] **T-SEC-202** Conduct Dynamic Application Security Testing (DAST) - Basic Scan 👤 SecOps 📅 2025-07-25
- [ ] **T-SEC-203** Review and Address Findings from SAST/DAST/Dependency Scans 👤 DEV_TEAMS, SecOps 📅 2025-07-28

---

## Phase 3: Full Suite & Advanced Inputs
*(To be detailed)*

### 3.1 Frontend Development
- **[Add Tasks]**
### 3.2 Backend Development
- **[Add Tasks]**
### 3.3 UX/UI Design
- **[Add Tasks]**
### 3.4 AI/ML Components
- **[Add Tasks]**
### 3.5 DevOps & Infrastructure
- **[Add Tasks]**
### 3.6 Security
- **[Add Tasks]**

---

## Progress Tracking

| Phase         | Frontend | Backend | AI/ML | DevOps | Security | UX/UI |
|---------------|----------|---------|-------|--------|----------|-------|
| 1 - MVP       | 31%      | 88%     | 0%    | 9%     | 9%       | 14%   |
| 2 - Expansion | 0%       | 0%      | 0%    | 0%     | 0%       | 0%    |
| 3 - Full Suite| 0%       | 0%      | 0%    | 0%     | 0%       | 0%    |

*Progress percentages should be updated as tasks are completed.*

## Notes
- Add specific task owners and target dates using the `👤 [Initials]` and `📅 [YYYY-MM-DD]` format.
- Use the legend to mark task status.
- Reference specific PRs or commits for completed tasks where applicable.
- This document is a living plan; update and refine it as the project evolves.
