module.exports = {
  roadmap: {
    title: "Backend Developer",

    slug: "backend-developer",

    targetCareer: "Backend Developer",

    description:
      "A structured roadmap to become a job-ready Backend Developer by mastering server-side programming, REST APIs, databases, authentication, security, testing, backend architecture, deployment, and production-ready development practices.",

    difficulty: "intermediate",

    estimatedDuration: 125,

    totalStages: 7,

    isActive: true,

    version: 1,

    createdBy: "admin",
  },

  stages: [
    // ============================================================
    // STAGE 1
    // ============================================================

    {
      stageOrder: 1,

      title: "Backend and Web Fundamentals",

      description:
        "Understand how backend systems work, including HTTP, APIs, servers, clients, Git, and basic web architecture.",

      estimatedDuration: 12,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Understand Client-Server Architecture",

          description:
            "Learn how clients, servers, requests, responses, APIs, and databases interact in modern web applications.",

          whyItMatters:
            "Understanding client-server communication gives you the foundation needed to design and debug backend applications.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 65,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn HTTP and HTTPS",

          description:
            "Understand HTTP methods, status codes, headers, request bodies, cookies, HTTPS, and common HTTP concepts.",

          whyItMatters:
            "HTTP is the communication protocol behind most web APIs, so backend developers must understand how requests and responses work.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 75,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn REST API Fundamentals",

          description:
            "Understand REST principles, resources, endpoints, CRUD operations, status codes, and API design basics.",

          whyItMatters:
            "REST APIs are a core part of backend development and are commonly used to connect frontend applications with backend services.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Git and GitHub",

          description:
            "Learn commits, branches, pull requests, merging, repository management, and collaborative development workflows.",

          whyItMatters:
            "Professional backend developers use Git to manage code, collaborate with teams, track changes, and contribute to production projects.",

          difficulty: "easy",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create a GitHub repository",
            "Make multiple meaningful commits",
            "Create and merge a branch",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 2
    // ============================================================

    {
      stageOrder: 2,

      title: "Node.js and Express",

      description:
        "Learn Node.js and Express and build structured backend applications and REST APIs.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Node.js Fundamentals",

          description:
            "Understand the Node.js runtime, modules, npm, environment variables, asynchronous programming, and the event loop.",

          whyItMatters:
            "Node.js provides the runtime used to build scalable JavaScript backend applications and is widely used in modern web development.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Build Your First Express Server",

          description:
            "Create an Express server and learn routing, middleware, request handling, and response handling.",

          whyItMatters:
            "Express is a widely used Node.js framework that simplifies building REST APIs and backend web applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Express server source code",
            "Working API endpoint",
            "GitHub repository link",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Express Middleware",

          description:
            "Create and use middleware for authentication, validation, logging, request processing, and error handling.",

          whyItMatters:
            "Middleware is fundamental to building maintainable Express applications and implementing cross-cutting backend functionality.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Custom middleware implementation",
            "Middleware usage in routes",
            "GitHub repository link",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Build a REST API",

          description:
            "Build a complete REST API using controllers, routes, services, middleware, validation, and proper HTTP responses.",

          whyItMatters:
            "Building a complete REST API demonstrates that you can apply backend fundamentals to a realistic application.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Complete REST API",
            "CRUD endpoints",
            "Controllers and routes",
            "Validation and error handling",
            "GitHub repository link",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Implement Centralized Error Handling",

          description:
            "Create consistent application errors and centralized error-handling middleware for your backend API.",

          whyItMatters:
            "Consistent error handling makes backend applications easier to debug, maintain, test, and use.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Custom error classes",
            "Centralized error middleware",
            "Consistent API error responses",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 3
    // ============================================================

    {
      stageOrder: 3,

      title: "Databases and Data Modeling",

      description:
        "Learn relational and NoSQL databases and understand how backend applications store and retrieve data.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn SQL Fundamentals",

          description:
            "Practice SELECT, INSERT, UPDATE, DELETE, filtering, sorting, grouping, aggregation, and transactions.",

          whyItMatters:
            "SQL remains essential for backend developers because many production systems rely on relational databases.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master SQL Joins",

          description:
            "Learn INNER JOIN, LEFT JOIN, relationships, grouping, and queries involving multiple tables.",

          whyItMatters:
            "Real-world applications frequently require data from multiple related tables, making joins an essential backend skill.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "SQL join queries",
            "Examples using multiple related tables",
            "Query results or screenshots",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn MongoDB",

          description:
            "Learn collections, documents, CRUD operations, queries, indexes, and document-based data modeling.",

          whyItMatters:
            "MongoDB is widely used in JavaScript-based backend stacks and provides flexible document-oriented data storage.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Mongoose",

          description:
            "Create schemas and models and learn validation, references, queries, population, and database middleware.",

          whyItMatters:
            "Mongoose provides structure, validation, relationships, and convenient database access when using MongoDB with Node.js.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Mongoose schemas",
            "Mongoose models",
            "Database queries",
            "References or population example",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Design a Backend Database",

          description:
            "Design a database for a backend application with appropriate entities, relationships, indexes, constraints, and data access patterns.",

          whyItMatters:
            "Good database design improves application performance, scalability, consistency, and maintainability.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Database schema or ER diagram",
            "Entity definitions",
            "Relationships",
            "Indexes or constraints",
            "Database design explanation",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 4
    // ============================================================

    {
      stageOrder: 4,

      title: "Authentication and Backend Security",

      description:
        "Build secure authentication and authorization systems and learn common backend security practices.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Implement User Registration",

          description:
            "Create a secure registration endpoint with validation, password hashing, duplicate-account handling, and appropriate responses.",

          whyItMatters:
            "User registration is a fundamental backend feature and teaches important concepts around validation, password security, and account management.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Registration endpoint",
            "Input validation",
            "Password hashing",
            "Duplicate user handling",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Implement Login Authentication",

          description:
            "Build login functionality with password verification and secure authentication token handling.",

          whyItMatters:
            "Authentication is required by most real-world applications and is one of the most important backend engineering skills.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Login endpoint",
            "Password verification",
            "Authentication response",
            "Secure token handling",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement JWT Authentication",

          description:
            "Implement JWT creation, verification, protected routes, authentication middleware, and token expiration handling.",

          whyItMatters:
            "JWT-based authentication is commonly used in REST APIs and demonstrates your ability to secure protected backend resources.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "JWT generation",
            "JWT verification",
            "Authentication middleware",
            "Protected route",
            "Token expiration handling",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Role-Based Authorization",

          description:
            "Restrict backend resources based on user roles and implement authorization middleware.",

          whyItMatters:
            "Authorization ensures users can only access resources they are permitted to use and is critical in production applications.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Role definitions",
            "Authorization middleware",
            "Protected role-specific endpoint",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Learn Backend Security Practices",

          description:
            "Learn input validation, secure headers, CORS, rate limiting, password security, secret management, and common API vulnerabilities.",

          whyItMatters:
            "Security knowledge helps prevent common vulnerabilities and is essential when building backend applications that handle real user data.",

          difficulty: "hard",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 5
    // ============================================================

    {
      stageOrder: 5,

      title: "Production Backend Development",

      description:
        "Learn the architecture and engineering practices required to build maintainable production backend systems.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Design a Layered Backend Architecture",

          description:
            "Structure a backend using routes, controllers, services, repositories or data-access layers, models, middleware, and utilities.",

          whyItMatters:
            "Layered architecture improves separation of concerns, maintainability, scalability, and team collaboration.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Architecture diagram",
            "Project folder structure",
            "Explanation of each backend layer",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Implement Request Validation",

          description:
            "Implement reusable validation schemas and consistent validation error responses for backend APIs.",

          whyItMatters:
            "Reliable validation protects APIs from invalid input and makes backend behavior predictable and secure.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Validation schemas",
            "Validation middleware",
            "Validation error responses",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement Pagination and Filtering",

          description:
            "Add pagination, sorting, filtering, and search functionality to API endpoints.",

          whyItMatters:
            "Production APIs need efficient data retrieval strategies to handle large datasets without excessive response times.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Paginated endpoint",
            "Filtering implementation",
            "Sorting implementation",
            "Search implementation",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement API Logging and Monitoring",

          description:
            "Add structured logging and learn how backend applications can be monitored in production.",

          whyItMatters:
            "Logging and monitoring help developers detect failures, diagnose problems, and understand application behavior in production.",

          difficulty: "medium",

          type: "project",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Structured logging",
            "Error logging",
            "Example production logs",
            "Monitoring configuration or documentation",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Document REST APIs",

          description:
            "Create professional API documentation describing endpoints, authentication, request bodies, responses, and errors.",

          whyItMatters:
            "Good API documentation makes backend services easier for frontend developers, teammates, and external consumers to use.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 80,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "API documentation link",
            "Endpoint descriptions",
            "Request and response examples",
            "Authentication documentation",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 6
    // ============================================================

    {
      stageOrder: 6,

      title: "Testing and Backend Quality",

      description:
        "Learn automated testing and improve backend reliability through unit, integration, and API testing.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Backend Testing Fundamentals",

          description:
            "Understand unit tests, integration tests, API tests, test isolation, test data, and testing strategies.",

          whyItMatters:
            "Testing reduces regressions and gives developers confidence when changing or extending backend applications.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Write Unit Tests for Services",

          description:
            "Write unit tests for business logic and isolate external dependencies using mocks.",

          whyItMatters:
            "Service-level unit tests help verify business logic independently and are an important professional backend testing skill.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Service unit tests",
            "Mocked dependencies",
            "Passing test results",
            "Test coverage output",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Test REST API Endpoints",

          description:
            "Test successful requests, validation failures, authentication failures, authorization failures, and server errors.",

          whyItMatters:
            "API testing verifies that backend endpoints behave correctly under both normal and failure conditions.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "API test suite",
            "Success case tests",
            "Failure case tests",
            "Authentication tests",
            "Authorization tests",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Improve Backend Code Quality",

          description:
            "Review backend code for maintainability, separation of concerns, error handling, validation, security, and performance.",

          whyItMatters:
            "Professional backend development is not only about making code work but also about making it maintainable, secure, and reliable.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Refactored backend code",
            "Before and after improvements",
            "Code quality explanation",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 7
    // ============================================================

    {
      stageOrder: 7,

      title: "Deployment and Backend Career Readiness",

      description:
        "Deploy a backend application and prepare a professional backend portfolio and interview strategy.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Containerize the Backend",

          description:
            "Create a Docker configuration and containerize a backend application for deployment.",

          whyItMatters:
            "Containerization makes backend applications easier to deploy consistently across development, testing, and production environments.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Dockerfile",
            "Docker configuration",
            "Successfully built container",
            "GitHub repository link",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Deploy the Backend API",

          description:
            "Deploy the backend to a cloud hosting platform and configure environment variables and production settings.",

          whyItMatters:
            "Deployment proves that you can take a backend application from local development to a publicly accessible production environment.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Live API URL",
            "Production deployment",
            "Environment variable configuration",
            "Working production endpoint",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build a Production Backend Project",

          description:
            "Build a complete backend project combining authentication, database integration, validation, authorization, testing, documentation, and deployment.",

          whyItMatters:
            "A complete production-style project gives you strong portfolio evidence and demonstrates that you can combine multiple backend skills into one system.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 300,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Complete backend application",
            "Authentication and authorization",
            "Database integration",
            "Validation",
            "Automated tests",
            "API documentation",
            "Deployment",
            "GitHub repository link",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Document the Backend Project",

          description:
            "Create professional documentation covering architecture, API endpoints, database design, authentication, setup, and deployment.",

          whyItMatters:
            "Professional documentation makes your project easier to understand and demonstrates communication skills valued by engineering teams.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "README documentation",
            "Architecture explanation",
            "API documentation",
            "Database design explanation",
            "Setup instructions",
            "Deployment instructions",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare for Backend Interviews",

          description:
            "Prepare HTTP, REST APIs, databases, authentication, security, Node.js, system design, debugging, and backend architecture interview topics.",

          whyItMatters:
            "Strong interview preparation helps you convert your technical knowledge and projects into successful backend job opportunities.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },
  ],
};