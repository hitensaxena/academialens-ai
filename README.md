# AcademiaLens - AI-Powered Research Assistant

AcademiaLens is an AI-powered research assistant that helps researchers, students, and academics analyze and extract insights from academic papers and research documents. Built with modern web technologies, AcademiaLens provides a seamless experience for managing and understanding research materials.

## 🚀 Features

### 🔐 Authentication & Security
- Secure user authentication with email/password
- Password reset functionality
- Email verification
- Protected routes and role-based access control

### 📚 Document Management
- Upload and organize research papers (PDF, DOCX, etc.)
- Document preview and search
- AI-powered document analysis
- Categorization and tagging system

### 🧠 AI-Powered Analysis
- Automatic document summarization
- Key concept extraction
- Citation and reference analysis
- Research gap identification
- Smart search across document contents

### 🎨 User Experience
- Light and dark mode
- Responsive design for all devices
- Intuitive user interface
- Keyboard shortcuts for power users

## 🛠 Tech Stack

### Frontend
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: 
  - [Tailwind CSS v4](https://tailwindcss.com/) with modern syntax
  - [shadcn/ui](https://ui.shadcn.com/) components
  - CSS Modules
- **State Management**:
  - [React Query](https://tanstack.com/query) (Server State)
  - [Zustand](https://github.com/pmndrs/zustand) (Client State)
- **UI Components**:
  - Custom toast notification system
  - Accessible form components
  - Responsive layout components
- **Form Handling**:
  - [React Hook Form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/) for schema validation

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Database**: PostgreSQL with Prisma ORM
- **Search**: Vector database for semantic search
- **AI/ML**: Gemini API for document analysis
- **API**: RESTful API with OpenAPI documentation

### DevOps
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Infrastructure as Code**: Terraform
- **Monitoring**: Prometheus + Grafana

## 🏁 Getting Started

### Prerequisites

- Node.js 20+ and npm 10+
- Git
- VS Code (recommended)
- PostgreSQL (for local development)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/acadialens.git
   cd acadialens
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Update the values in .env.local with your configuration
   # Run database migrations
   cd backend
   poetry run alembic upgrade head
   ```

5. **Start the development servers**
   ```bash
   # In the root directory
   npm run dev
   
   # In a new terminal, run Storybook
   npm run storybook
   
   # In another terminal, from the backend directory
   cd backend
   poetry run uvicorn app.main:app --reload
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run frontend tests
npm test:frontend

# Run backend tests
cd backend
poetry run pytest

# Run tests with coverage
npm run test:coverage
```

## 🛠 Development

### Code Style

We use:
- Prettier for code formatting
- ESLint for JavaScript/TypeScript linting
- Black and isort for Python code formatting
- TypeScript for type safety

Before committing, run:

```bash
# Format and lint code
npm run format
npm run lint

# Type checking
npm run typecheck
```

### Git Workflow

1. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bugfix-name
   ```

2. Make your changes and commit them with a descriptive message:
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

3. Push your changes and create a pull request.

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation only changes
- `style:` Changes that don't affect the meaning of the code
- `refactor:` A code change that neither fixes a bug nor adds a feature
- `perf:` A code change that improves performance
- `test:` Adding missing tests or correcting existing tests
- `chore:` Changes to the build process or auxiliary tools

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)

## 🚀 Recent Updates (June 2025)

### 2025-06-03: Component Library & Storybook
- 🎨 Implemented comprehensive UI component library with Radix UI
- 📚 Set up Storybook for component documentation and testing
- ♿ Enhanced accessibility across all components
- 🎨 Added dark/light theme support
- 📱 Ensured all components are fully responsive

### 2025-06-02: Authentication & User Management
- ✅ Implemented secure authentication system with NextAuth.js
- 🔐 Added email/password and Google OAuth login
- ✉️ Set up email verification and password reset flows
- 🎨 Improved auth UI with responsive design
- 🛡️ Added protected routes and middleware
- 🚀 Optimized client-side auth state management

### 2025-06-02: Project Setup
- 🎨 Initialized Next.js 14 project with TypeScript
- 🛠️ Configured Tailwind CSS v4 with modern syntax
- 🔧 Set up ESLint, Prettier, and Husky
- 🧩 Added shadcn/ui components
- 📦 Configured project structure and dependencies

### 2025-06-02 - Authentication & Routing Improvements
- 🛠 Fixed 404 error on dashboard route by restructuring route groups
- 🔄 Improved authentication flow with proper redirects
- 🛡 Enhanced middleware for protected routes
- 🐛 Fixed auth token handling in cookies
- 🔍 Added comprehensive debug logging for auth state
- 🧹 Code cleanup and linting fixes
- 📝 Updated documentation for auth flow

### 2025-06-01 - Project Initialization
- 🎉 Initialized Next.js 14 project with TypeScript
- 🎨 Set up Tailwind CSS v4 with modern syntax
- 🔧 Configured ESLint, Prettier, and Husky
- 📦 Installed core dependencies
- 📝 Created project documentation

### 🛠 Fixed
- Resolved 404 error on dashboard route by restructuring route groups
- Improved authentication flow with proper redirects
- Enhanced middleware for protected routes
- Added comprehensive debug logging for auth state management
- Fixed route guard implementation for authenticated routes

## 🚧 Current Focus (Week 1 - June 2025)

### In Progress
- 🔄 **Authentication System**
  - Email verification flow
  - Protected routes implementation
  - Session management
- 🛠 **Core UI Components**
  - Dashboard layout
  - Document management interface
  - Responsive navigation

### Next Up
- 🔜 **Document Management**
  - File upload component
  - Document listing and search
  - AI analysis integration

## 📅 Project Timeline

### Phase 1: MVP - Core Features (June 2025)
- [x] Project setup and authentication
- [ ] Document management system
- [ ] Basic AI analysis features
- [ ] User dashboard

### Phase 2: Enhanced Features (July 2025)
- Advanced search capabilities
- Collaboration tools
- Enhanced AI insights

### Phase 3: Polish & Scale (August 2025)
- Performance optimization
- User feedback implementation
- Scaling infrastructure

## 🎯 Recent Improvements

### Authentication & UI
- Implemented secure authentication flow with email/password
- Added password reset and email verification
- Created responsive auth pages with form validation
- Built a custom toast notification system
- Standardized UI components with consistent theming

### Code Quality
- Set up TypeScript with strict type checking
- Configured ESLint and Prettier for code consistency
- Fixed all TypeScript and ESLint errors
- Improved type safety across the codebase
- Organized UI components with consistent import paths

### Developer Experience
- Set up Next.js 14 with App Router
- Configured Tailwind CSS v4 with modern syntax
- Added shadcn/ui components
- Set up React Query for server state management
- Implemented Zustand for client state management

## 📝 Project Status

🚧 Under active development. See our [project board](https://github.com/yourusername/academialens/projects/1) for current progress and upcoming features.
