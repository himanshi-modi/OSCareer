module.exports = {
  roadmap: {
    title: "Python Developer",

    slug: "python-developer",

    targetCareer: "Python Developer",

    description:
      "A structured roadmap to become a job-ready Python Developer by mastering Python programming, object-oriented development, backend APIs, databases, testing, security, deployment, and production-ready application development.",

    difficulty: "beginner",

    estimatedDuration: 120,

    totalStages: 7,

    isActive: true,

    version: 1,

    createdBy: "admin",
  },

  stages: [
    {
      stageOrder: 1,

      title: "Python Fundamentals",

      description:
        "Build a strong foundation in Python syntax, data structures, functions, modules, exceptions, and development tools.",

      estimatedDuration: 18,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Set Up the Python Development Environment",

          description:
            "Install Python, configure a development environment, create virtual environments, and learn how to run Python programs.",

          whyItMatters:
            "A properly configured development environment is essential for building, testing, and maintaining Python applications efficiently.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 45,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Python development environment is configured",
            "Virtual environment is created",
            "Python project is available on GitHub",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Python Syntax and Data Types",

          description:
            "Learn variables, strings, numbers, booleans, operators, input, output, and Python's basic syntax.",

          whyItMatters:
            "Strong knowledge of Python fundamentals allows you to write reliable programs and understand more advanced backend concepts.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 55,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand Python variables and data types",
            "Understand operators and basic syntax",
            "Understand input and output operations",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Master Python Collections",

          description:
            "Practice lists, tuples, sets, dictionaries, slicing, iteration, and common collection operations.",

          whyItMatters:
            "Python developers work with collections constantly when processing API data, database records, user input, and application state.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 65,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Demonstrate list and tuple operations",
            "Demonstrate set operations",
            "Demonstrate dictionary operations",
            "Use iteration and slicing correctly",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Functions and Modules",

          description:
            "Learn function definitions, parameters, return values, scope, modules, imports, and reusable Python code.",

          whyItMatters:
            "Functions and modules are fundamental to writing maintainable Python applications instead of placing all logic into one large file.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 65,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand function parameters and return values",
            "Understand variable scope",
            "Understand Python modules and imports",
            "Understand reusable code organization",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Python CLI Application",

          description:
            "Build a command-line application that accepts user input, processes data, and stores application state.",

          whyItMatters:
            "A practical CLI project proves that you can combine Python fundamentals into a functioning application.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 75,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Working Python CLI application",
            "User input is handled correctly",
            "Application state is maintained",
            "Project is available on GitHub",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 2,

      title: "Object-Oriented Python",

      description:
        "Learn object-oriented programming, error handling, files, packages, and clean Python development practices.",

      estimatedDuration: 16,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Classes and Objects",

          description:
            "Understand classes, objects, constructors, instance attributes, and methods in Python.",

          whyItMatters:
            "Object-oriented programming helps structure larger Python applications into reusable and maintainable components.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 65,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand classes and objects",
            "Understand constructors",
            "Understand instance attributes and methods",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Inheritance and Polymorphism",

          description:
            "Practice inheritance, method overriding, polymorphism, composition, and reusable object-oriented designs.",

          whyItMatters:
            "Understanding object-oriented design is important when working with large Python codebases and backend frameworks.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 75,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Demonstrate inheritance",
            "Demonstrate method overriding",
            "Demonstrate polymorphism or composition",
            "Submit implementation to GitHub",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Handle Exceptions Properly",

          description:
            "Learn exception types, try/except, finally, custom exceptions, and error-handling strategies.",

          whyItMatters:
            "Reliable backend applications must handle failures gracefully instead of crashing or returning confusing errors.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 70,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand built-in exception types",
            "Understand try/except/finally",
            "Understand custom exceptions",
            "Understand appropriate error-handling strategies",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Work with Files and JSON",

          description:
            "Read and write files and process JSON data using Python's standard library.",

          whyItMatters:
            "File and JSON processing is common in backend applications, configuration systems, APIs, scripts, and data-processing workflows.",

          difficulty: "easy",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 60,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Read data from a file",
            "Write data to a file",
            "Parse JSON data",
            "Serialize Python data to JSON",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build an Object-Oriented Application",

          description:
            "Build a Python application using classes, inheritance or composition, exception handling, modules, and persistent data.",

          whyItMatters:
            "This project demonstrates that you can apply Python's core concepts to build a structured application.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Working object-oriented Python application",
            "Uses classes and appropriate object-oriented design",
            "Includes exception handling",
            "Uses modular code organization",
            "Project is available on GitHub",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 3,

      title: "Python Backend Development",

      description:
        "Learn how to build backend applications and REST APIs using Python.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand Backend Architecture",

          description:
            "Learn how clients, servers, APIs, business logic, and databases interact in backend applications.",

          whyItMatters:
            "Understanding backend architecture helps you design applications that are organized, scalable, and easier to maintain.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 70,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand client-server architecture",
            "Understand REST APIs",
            "Understand backend business logic",
            "Understand database interaction",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn FastAPI Fundamentals",

          description:
            "Create APIs with FastAPI and learn routes, request handling, response models, and automatic API documentation.",

          whyItMatters:
            "FastAPI is a modern Python framework for building high-performance APIs and is highly relevant to backend development.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Working FastAPI application",
            "Multiple API routes are implemented",
            "Request and response handling works correctly",
            "Automatic API documentation is available",
            "Project is available on GitHub",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Request Validation",

          description:
            "Validate API requests and responses using Python typing and Pydantic models.",

          whyItMatters:
            "API validation protects applications from invalid data and ensures that backend services receive predictable input.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Pydantic models are implemented",
            "Invalid requests are rejected",
            "Validation errors are returned clearly",
            "Response models are defined appropriately",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Build CRUD REST APIs",

          description:
            "Create REST endpoints supporting create, read, update, and delete operations with proper status codes and validation.",

          whyItMatters:
            "CRUD APIs are a core responsibility of backend developers and form the foundation of many real-world applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create endpoint works",
            "Read endpoints work",
            "Update endpoint works",
            "Delete endpoint works",
            "Correct HTTP status codes are used",
            "Project is available on GitHub",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Implement API Error Handling",

          description:
            "Create consistent error responses and handle validation, authentication, database, and unexpected application errors.",

          whyItMatters:
            "Consistent error handling makes APIs easier to consume, debug, monitor, and maintain in production.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 75,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Validation errors are handled",
            "Authentication errors are handled",
            "Database errors are handled",
            "Unexpected errors are handled",
            "API error responses follow a consistent structure",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 4,

      title: "Databases and Data Access",

      description:
        "Learn relational and NoSQL databases and integrate them with Python applications.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn SQL Fundamentals",

          description:
            "Practice relational database concepts, CRUD operations, joins, aggregation, constraints, and transactions.",

          whyItMatters:
            "SQL is an essential skill for backend developers because most production applications rely on persistent relational data.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 80,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand SQL CRUD operations",
            "Understand joins",
            "Understand aggregation",
            "Understand constraints",
            "Understand transactions",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn PostgreSQL",

          description:
            "Learn PostgreSQL databases, schemas, tables, relationships, indexes, and practical database administration.",

          whyItMatters:
            "PostgreSQL is widely used in production backend systems and provides powerful relational database capabilities.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand PostgreSQL databases",
            "Understand tables and schemas",
            "Understand relationships",
            "Understand indexes",
            "Understand basic database administration",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Connect Python to PostgreSQL",

          description:
            "Connect a Python backend to PostgreSQL and perform persistent database operations.",

          whyItMatters:
            "Backend developers need to connect application logic to persistent databases and safely perform data operations.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Python application connects to PostgreSQL",
            "Database records can be created",
            "Database records can be queried",
            "Database records can be updated and deleted",
            "Project is available on GitHub",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn ORM Concepts",

          description:
            "Understand object-relational mapping and use an ORM to work with database models and relationships.",

          whyItMatters:
            "ORM knowledge allows Python developers to work efficiently with relational databases while keeping database logic organized inside applications.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 75,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Understand ORM concepts",
            "Define database models",
            "Perform CRUD operations through an ORM",
            "Model database relationships",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Design a Production Database",

          description:
            "Design a database schema with relationships, constraints, indexes, and appropriate data access patterns.",

          whyItMatters:
            "Good database design directly affects application correctness, performance, scalability, and maintainability.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Database schema is documented",
            "Relationships are clearly defined",
            "Constraints are identified",
            "Indexes are justified",
            "Data access patterns are documented",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 5,

      title: "Authentication and Secure APIs",

      description:
        "Build secure Python APIs with authentication, authorization, password protection, and security best practices.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Implement User Registration",

          description:
            "Create a registration API with validation, password hashing, duplicate-account handling, and secure responses.",

          whyItMatters:
            "User registration is a core part of most backend applications and must be implemented securely to protect user accounts.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Registration endpoint works",
            "Input validation is implemented",
            "Passwords are securely hashed",
            "Duplicate accounts are handled",
            "Sensitive information is not exposed",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Implement Login Authentication",

          description:
            "Create a secure login flow that verifies credentials and issues authenticated sessions or tokens.",

          whyItMatters:
            "Secure login is fundamental to protecting user accounts and controlling access to application resources.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Login endpoint works",
            "Credentials are verified securely",
            "Invalid credentials are handled",
            "Authentication state or token is issued securely",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement JWT Authentication",

          description:
            "Implement JWT creation, verification, expiration handling, and protected API endpoints.",

          whyItMatters:
            "JWT-based authentication is widely used for securing REST APIs and demonstrates an important backend security skill.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "JWT tokens are generated",
            "JWT tokens are verified",
            "Token expiration is handled",
            "Protected endpoints reject unauthenticated requests",
            "Authentication middleware is implemented",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Role-Based Authorization",

          description:
            "Create authorization rules that restrict resources based on user roles and permissions.",

          whyItMatters:
            "Authorization ensures users can access only the resources and actions they are permitted to use.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "User roles are defined",
            "Authorization rules are implemented",
            "Restricted resources are protected",
            "Unauthorized access is rejected",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Secure the API",

          description:
            "Learn secure password storage, CORS, rate limiting, input validation, secret management, and common API vulnerabilities.",

          whyItMatters:
            "Security knowledge is critical for preventing common vulnerabilities and protecting production APIs and user data.",

          difficulty: "hard",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand secure password storage",
            "Understand CORS configuration",
            "Understand rate limiting",
            "Understand secret management",
            "Understand common API vulnerabilities",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 6,

      title: "Testing and Production Python",

      description:
        "Learn automated testing, application architecture, logging, background tasks, and production-quality development.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Pytest",

          description:
            "Learn test cases, fixtures, assertions, parametrization, mocking, and test organization with pytest.",

          whyItMatters:
            "Automated testing helps Python developers catch bugs early and confidently modify production code.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand pytest test cases",
            "Understand fixtures",
            "Understand assertions",
            "Understand parametrization",
            "Understand mocking",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Test Python APIs",

          description:
            "Write tests for API endpoints, authentication, validation, database operations, and error scenarios.",

          whyItMatters:
            "API testing ensures backend services behave correctly across successful requests, invalid inputs, authentication failures, and edge cases.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "API endpoints have automated tests",
            "Authentication scenarios are tested",
            "Validation scenarios are tested",
            "Database operations are tested",
            "Error scenarios are tested",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Python Application Architecture",

          description:
            "Organize Python applications into maintainable modules, services, data-access layers, configuration, and utilities.",

          whyItMatters:
            "Good architecture makes backend applications easier to scale, test, debug, and maintain as the codebase grows.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Application architecture is documented",
            "Modules are separated logically",
            "Service and data-access layers are identified",
            "Configuration is separated from business logic",
            "Architecture decisions are explained",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Logging and Background Tasks",

          description:
            "Learn structured logging and asynchronous or background task processing for backend applications.",

          whyItMatters:
            "Production applications need reliable logging and background processing for monitoring, debugging, notifications, scheduled work, and long-running operations.",

          difficulty: "hard",

          type: "project",

          priority: "medium",

          estimatedTime: 120,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Structured logging is implemented",
            "Important application events are logged",
            "Background task processing is implemented",
            "Long-running work is handled appropriately",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Improve Python Code Quality",

          description:
            "Apply type hints, formatting, linting, documentation, clean code principles, and maintainable project structure.",

          whyItMatters:
            "Professional Python development requires code that is readable, consistent, testable, and easy for other developers to maintain.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Type hints are used appropriately",
            "Code formatting is configured",
            "Linting is configured",
            "Important code is documented",
            "Project structure follows clean-code principles",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 7,

      title: "Deployment and Career Readiness",

      description:
        "Deploy a production Python application and build a strong portfolio for Python Developer roles.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Containerize the Python Application",

          description:
            "Create a Docker configuration and containerize a Python backend application.",

          whyItMatters:
            "Containerization makes applications easier to deploy consistently across development, testing, and production environments.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Docker configuration is created",
            "Python application runs inside a container",
            "Dependencies are configured correctly",
            "Containerized project is available on GitHub",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Deploy the Python API",

          description:
            "Deploy the Python backend to a cloud hosting platform and configure production environment variables.",

          whyItMatters:
            "Deployment experience demonstrates that you can take a backend application beyond local development and make it available to real users.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Python API is deployed",
            "Production environment variables are configured",
            "Production API is accessible",
            "Deployment is working successfully",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build a Production Python Project",

          description:
            "Build a complete Python application combining APIs, authentication, databases, validation, testing, security, and deployment.",

          whyItMatters:
            "A complete production-style project provides strong portfolio evidence that you can combine multiple backend skills into a real application.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 300,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Complete Python application is implemented",
            "REST APIs are implemented",
            "Authentication is implemented",
            "Database integration is implemented",
            "Validation and error handling are implemented",
            "Automated tests are included",
            "Security practices are applied",
            "Project is available on GitHub",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Document the Project",

          description:
            "Create professional documentation covering architecture, API endpoints, database design, setup, authentication, testing, and deployment.",

          whyItMatters:
            "Professional documentation makes your project easier to understand and demonstrates communication skills valued by engineering teams.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Project overview is documented",
            "Architecture is documented",
            "API endpoints are documented",
            "Database design is documented",
            "Setup instructions are included",
            "Authentication and testing are documented",
            "Deployment instructions are included",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare for Python Developer Interviews",

          description:
            "Prepare Python, OOP, APIs, databases, authentication, testing, debugging, backend architecture, and problem-solving interview topics.",

          whyItMatters:
            "Interview preparation helps convert your technical skills and project experience into successful performance during real hiring processes.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Python fundamentals are reviewed",
            "OOP concepts are reviewed",
            "API concepts are reviewed",
            "Database concepts are reviewed",
            "Authentication concepts are reviewed",
            "Testing and debugging concepts are reviewed",
            "Backend architecture concepts are reviewed",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },
  ],
};