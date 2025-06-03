# AcademiaLens Backend

This directory contains the backend service for the AcademiaLens project, built with FastAPI.

## Project Structure

- `app/`: Contains the core application code.
  - `api/`: API endpoint definitions.
    - `v1/`: Version 1 of the API.
      - `endpoints/`: Specific endpoint modules (e.g., users, documents).
      - `api.py`: Main router for API v1.
  - `core/`: Core logic, configuration, and utilities.
    - `config.py`: Pydantic settings management.
    - `logging_config.py`: Logging setup.
  - `db/`: Database interaction logic.
    - `session.py`: Database session and engine setup.
    - `base.py`: Base for ORM models.
    - `models/`: SQLAlchemy ORM models.
    - `schemas/`: Pydantic schemas for data validation and serialization.
    - `crud/`: CRUD operations for database models.
  - `services/`: Business logic and services.
  - `main.py`: Main FastAPI application instance.
- `alembic/`: Alembic migration scripts.
- `tests/`: Unit and integration tests.
- `pyproject.toml`: Project dependencies and build configuration (Poetry).
- `.env.example`: Example environment variables.
- `alembic.ini`: Alembic configuration file.

## Setup and Running

(Instructions to be added for local development, running migrations, and starting the server)

### Prerequisites

- Python 3.10+
- Poetry
- Docker (optional, for database)

### Installation

1.  Navigate to the `backend` directory.
2.  Install dependencies:
    ```bash
    poetry install
    ```
3.  Set up environment variables by copying `.env.example` to `.env` and configuring it.
4.  Initialize pre-commit hooks (optional but recommended):
    ```bash
    poetry run pre-commit install
    ```

### Running Migrations

```bash
poetry run alembic upgrade head