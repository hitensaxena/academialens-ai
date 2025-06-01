# Backend Implementation Tasks (AcademiaLens)

This document outlines the detailed backend development tasks for the AcademiaLens application, broken down by development phase, using Python (FastAPI), PostgreSQL (with pgvector), Celery, and the Gemini API.

## Phase 1: MVP - Core Ingestion & Basic Insight

**Goal:** Establish the core backend infrastructure, API endpoints for authentication and basic document handling, asynchronous PDF processing pipeline, and initial Gemini API integration for summarization and entity extraction.

**Tasks:**

1.  **Project Setup & Infrastructure:**
    *   Initialize FastAPI project structure.
    *   Set up virtual environment and manage dependencies (e.g., using Poetry or pip).
    *   Configure database connection to PostgreSQL.
    *   Install and configure the `pgvector` extension in PostgreSQL.
    *   Set up Celery with Redis as the message broker.
    *   Configure basic logging.
    *   Containerize the application using Docker (Dockerfile, docker-compose.yml).
2.  **Database Schema (Initial):**
    *   Design and implement database models (e.g., using SQLAlchemy or Tortoise ORM) for Users, Documents (metadata, status, path), and potentially basic AnalysisResults.
    *   Include fields for storing vector embeddings (`vector` type from pgvector) in the relevant table (e.g., Document Chunks).
    *   Set up database migrations (e.g., using Alembic).
3.  **User Authentication:**
    *   Implement API endpoints for user registration, login (e.g., using JWT tokens), and potentially password reset.
    *   Implement password hashing and secure token handling.
    *   Set up authentication middleware/dependencies in FastAPI.
4.  **Document Upload & Processing Pipeline:**
    *   Create API endpoint to handle PDF file uploads (streaming large files if necessary).
    *   Store uploaded PDFs securely (e.g., in a designated volume or cloud storage).
    *   Develop a Celery task for asynchronous PDF processing:
        *   Task 1: Text Extraction: Use PyMuPDF to extract text content from the PDF, handling potential OCR needs (may require integrating an OCR library if PyMuPDF isn't sufficient for scanned images).
        *   Task 2: Text Chunking: Implement a strategy to split extracted text into manageable chunks suitable for LLM processing and vector embedding generation.
        *   Task 3: Embedding Generation: Call the appropriate embedding model (via Gemini API or another service) to generate vector embeddings for each text chunk.
        *   Task 4: Database Storage: Store document metadata, extracted text (or reference), text chunks, and their corresponding vector embeddings in the PostgreSQL database.
        *   Update document status (e.g., pending, processing, complete, failed) in the database.
    *   Implement API endpoint to check the processing status of a document.
5.  **Core API Endpoints:**
    *   API endpoint to list user's uploaded documents with metadata and status.
    *   API endpoint to retrieve the processed text content of a document (or relevant chunks).
    *   API endpoint to delete a document.
6.  **AI Integration (Basic Insight Extractor):**
    *   Develop Celery tasks or API endpoints (potentially synchronous if fast enough for small requests) to interact with the Gemini API:
        *   Summarization: Send document text (or relevant chunks) to Gemini to generate TL;DR and Abstract summaries. Implement basic prompt engineering.
        *   Key Entity/Keyword Extraction: Use Gemini to identify key entities and keywords from the text.
    *   Store generated insights linked to the document in the database.
    *   Implement API endpoints for the frontend to request and retrieve these basic insights.
7.  **RAG Foundation (Vector Search):**
    *   Implement basic vector similarity search functionality using pgvector within PostgreSQL to find relevant text chunks based on a query vector (foundation for future Q&A).
8.  **Error Handling & Logging:**
    *   Implement robust error handling in API endpoints and Celery tasks.
    *   Configure structured logging to capture relevant information for debugging.

## Phase 2: Expand Core & Interaction

**Goal:** Implement backend logic for expanded "Insight Extractor" features (ELI-PhD, JargonBuster), basic "Deconstruction" (Methodology Blueprint), basic "Synthesis" (Comparative Analyzer), single-document Q&A, and website URL processing.

**Tasks:**

1.  **AI Integration (Expanded Insight Extractor):**
    *   Develop API endpoints/Celery tasks for ELI-PhD:
        *   Implement prompt engineering strategies to instruct Gemini to tailor explanations for different audience levels (Layperson, Executive, PhD).
        *   Handle requests based on user-selected audience level.
    *   Implement JargonBuster backend logic:
        *   Potentially use Gemini to identify and define jargon/acronyms within the text context.
        *   Store definitions or link to external resources.
        *   Develop API endpoint to provide definitions for terms identified by the frontend.
2.  **AI Integration (Deconstruction - Basic):**
    *   Develop API endpoint/Celery task for Methodology Blueprint:
        *   Use Gemini with specific prompts to extract experimental design, protocols, variables, etc., from the methods section (requires identifying the methods section first).
        *   Structure the extracted information for frontend display.
3.  **AI Integration (Synthesis - Basic):**
    *   Develop API endpoint/Celery task for Comparative Analyzer (Two Documents):
        *   Retrieve relevant text/chunks for the two selected documents.
        *   Use Gemini to compare the documents and identify key similarities and differences.
        *   Implement logic to handle potentially large amounts of text from two documents.
4.  **AI Integration (Interactive Q&A - Single Document):**
    *   Develop API endpoint for handling user questions about a specific document:
        *   Convert the user's question into a vector embedding.
        *   Perform vector similarity search (using pgvector) against the document's text chunks to find the most relevant context (RAG - Retrieval step).
        *   Construct a prompt for Gemini including the user's question and the retrieved context.
        *   Call Gemini API to generate an answer based on the provided context (RAG - Generation step).
        *   Return the generated answer to the frontend.
5.  **Website URL Processing:**
    *   Create an API endpoint to accept a website URL.
    *   Develop a Celery task to:
        *   Fetch the content of the URL (using libraries like `requests` and `BeautifulSoup` or potentially a headless browser for dynamic sites).
        *   Extract the main text content from the HTML.
        *   Process the extracted text through the existing pipeline (chunking, embedding, storage) similar to PDFs.
        *   Handle potential errors during fetching or parsing.
6.  **Database Schema Enhancements:**
    *   Update database models to store results from new features (ELI-PhD explanations, methodology components, comparison results, Q&A history if needed).
    *   Optimize database queries for performance, especially vector searches.
7.  **Feedback Mechanism Backend:**
    *   Create API endpoint to receive feedback data (e.g., ratings, comments) from the frontend.
    *   Store feedback in the database, linked to the specific analysis or document.
8.  **API Enhancements:**
    *   Refine existing API endpoints based on frontend needs.
    *   Implement pagination for list endpoints (e.g., document list).
    *   Add necessary authorization checks to all relevant endpoints.
9.  **Testing & Refinement:**
    *   Write unit and integration tests for new API endpoints and Celery tasks.
    *   Monitor performance and optimize long-running tasks or database queries.

## Phase 3: Full Suite & Advanced Inputs

**Goal:** Implement the full set of Deconstruction, Synthesis, and Application/Foresight features, add video processing, custom glossary, optimize performance and cost, and enhance security.

**Tasks:**

1.  **AI Integration (Full Deconstruction):**
    *   Claims & Evidence Mapper: Develop logic (likely Gemini-driven) to identify claims and map them to supporting evidence within the text. Design prompts for structured output.
    *   Reproducibility Auditor: Implement logic to identify and flag sections or statements related to assumptions, limitations, data/code availability using targeted Gemini prompts.
    *   Quick Reference Card Generator: Use Gemini to extract key formulas, definitions, etc., based on document type or user request, formatting them concisely.
    *   Develop API endpoints for each new feature.
2.  **AI Integration (Full Synthesis):**
    *   Cross-Document Weaver: Extend comparative analysis logic to handle multiple documents. Implement strategies for aggregating information and identifying consensus, conflicts, and themes across a larger corpus using Gemini.
    *   Knowledge Gap Identifier: Develop sophisticated prompts for Gemini to analyze the aggregated information from multiple documents and explicitly identify contradictions or unexplored areas.
    *   Conceptual Mind Maps: Use Gemini to generate structured data (e.g., nodes and edges) representing the conceptual relationships within or across documents. Develop API endpoint to provide this data to the frontend for visualization.
3.  **AI Integration (Application & Foresight):**
    *   Literature Review Assistant: Implement logic to synthesize information across multiple documents into a structured literature review format, guided by Gemini.
    *   Hypothesis Generator: Use Gemini to brainstorm potential research hypotheses based on identified gaps or themes.
    *   Novelty Checker: Develop logic to compare a new idea/abstract against the processed documents (potentially using vector similarity and Gemini analysis) to assess novelty.
    *   Trend Analyzer & Forecaster: Integrate Gemini (or potentially other specialized models/APIs if needed) to analyze extracted information for trends and generate forecasts (requires careful prompt design and potentially time-series data handling if applicable).
    *   Develop API endpoints for each new feature.
4.  **Video Input Processing:**
    *   Create API endpoint to accept video links.
    *   Develop Celery task to:
        *   Download video audio or interact directly with transcription services.
        *   Integrate with a transcription service API (e.g., OpenAI Whisper, Google Cloud Speech-to-Text) to get the transcript.
        *   Process the transcript through the existing text analysis pipeline (chunking, embedding, analysis features).
5.  **Custom Glossary Builder Backend:**
    *   Implement API endpoints for CRUD (Create, Read, Update, Delete) operations on user-specific glossaries.
    *   Store glossary data in the database, linked to users.
    *   Integrate custom glossary terms into the JargonBuster logic (e.g., prioritize user definitions).
6.  **Performance & Cost Optimization:**
    *   Implement caching strategies (e.g., for Gemini API responses, frequently accessed data).
    *   Optimize LLM prompts for efficiency and reduced token usage.
    *   Explore using smaller, task-specific models where appropriate.
    *   Analyze and optimize database performance (indexing, query tuning).
    *   Optimize Celery worker configuration.
7.  **Advanced Security & Compliance:**
    *   Conduct security audits and penetration testing.
    *   Implement rate limiting and input validation rigorously.
    *   Ensure compliance with relevant data privacy regulations (GDPR, etc.) based on user data handling.
    *   Refine access control policies (RBAC).
8.  **Collaboration Features Backend (If applicable):**
    *   Implement API endpoints for sharing documents/analyses.
    *   Develop backend logic for managing shared access permissions.
    *   Implement real-time features (e.g., using WebSockets) if collaborative editing/annotation is required.
9.  **Final Testing & Deployment:**
    *   Comprehensive end-to-end testing.
    *   Load testing to ensure scalability.
    *   Prepare production deployment configurations.

This detailed breakdown provides a roadmap for the backend development effort, ensuring alignment with the overall project phases, technological choices, and feature requirements.
