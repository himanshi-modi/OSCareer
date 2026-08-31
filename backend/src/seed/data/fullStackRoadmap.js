module.exports = {
  roadmap: {
    title: "Full Stack Developer",

    slug: "full-stack-developer",

    targetCareer: "Full Stack Developer",

    description:
      "A comprehensive roadmap to become a job-ready Full Stack Developer by mastering frontend development, React, backend APIs, databases, authentication, testing, deployment, and full-stack application architecture.",

    difficulty: "intermediate",

    estimatedDuration: 150,

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

      title: "Web Development Foundations",

      description:
        "Build a strong foundation in HTML, CSS, JavaScript, responsive design, browser fundamentals, and Git.",

      estimatedDuration: 20,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Learn Semantic HTML",

          description:
            "Learn HTML document structure, semantic elements, forms, tables, links, images, and accessibility fundamentals.",

          whyItMatters:
            "Semantic HTML provides the structural foundation of every web application and improves accessibility, SEO, and maintainability.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 75,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master CSS Fundamentals",

          description:
            "Learn selectors, box model, positioning, flexbox, grid, responsive design, and reusable styling patterns.",

          whyItMatters:
            "Strong CSS skills are essential for building professional, responsive, and visually consistent frontend applications.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Modern JavaScript",

          description:
            "Practice variables, functions, arrays, objects, destructuring, modules, DOM manipulation, and modern JavaScript syntax.",

          whyItMatters:
            "JavaScript is the core programming language of modern frontend development and is also widely used for backend development with Node.js.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Git and GitHub",

          description:
            "Learn repositories, commits, branches, merging, pull requests, and collaborative Git workflows.",

          whyItMatters:
            "Git and GitHub are fundamental tools for collaborating with development teams and managing production code.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Commit history",
            "Branch or pull request demonstrating workflow",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Responsive Website",

          description:
            "Build and publish a responsive multi-page website using HTML, CSS, JavaScript, and Git.",

          whyItMatters:
            "A complete responsive website proves that you can combine foundational frontend skills into a usable product.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Live website URL",
            "Responsive screenshots",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 2
    // ============================================================

    {
      stageOrder: 2,

      title: "Frontend Development with React",

      description:
        "Learn React and build modern, component-based frontend applications.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Create a React Application",

          description:
            "Create a React application using Vite and understand its project structure and development workflow.",

          whyItMatters:
            "React is one of the most widely used frontend technologies and is commonly required for modern full-stack development roles.",

          difficulty: "easy",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Working React application",
            "Vite project structure",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn React Components and Props",

          description:
            "Build reusable components and pass data between components using props.",

          whyItMatters:
            "Component-based architecture is central to React and helps developers build maintainable and reusable interfaces.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Master State and React Hooks",

          description:
            "Learn useState, useEffect, useMemo, useCallback, and custom hooks through practical examples.",

          whyItMatters:
            "React hooks are essential for managing state, side effects, performance, and reusable application logic.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Examples using React hooks",
            "Custom hook implementation",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn React Routing and Forms",

          description:
            "Implement client-side routing, protected routes, forms, validation, and navigation.",

          whyItMatters:
            "Real-world React applications require navigation, user input, validation, and protected application areas.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Multiple routes",
            "Form validation",
            "Protected route implementation",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Frontend Dashboard",

          description:
            "Build a responsive dashboard with reusable components, forms, navigation, API-ready services, and responsive layouts.",

          whyItMatters:
            "A dashboard demonstrates practical frontend architecture and is highly representative of real business applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Live dashboard or screenshots",
            "Reusable components",
            "Responsive UI",
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

      title: "Backend and REST APIs",

      description:
        "Learn backend development and create maintainable REST APIs using Node.js and Express.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Node.js Fundamentals",

          description:
            "Understand the Node.js runtime, modules, npm, environment variables, asynchronous programming, and event-driven architecture.",

          whyItMatters:
            "Node.js allows full-stack developers to build scalable backend services using JavaScript.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Build an Express REST API",

          description:
            "Create REST endpoints using Express controllers, routes, middleware, and proper HTTP status codes.",

          whyItMatters:
            "REST APIs are a fundamental way for frontend applications to communicate with backend services.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "REST API endpoints",
            "Controllers and routes",
            "API documentation",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement API Validation",

          description:
            "Validate incoming requests and create consistent validation error responses.",

          whyItMatters:
            "Validation prevents invalid data from entering your system and improves API reliability and security.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Validation schemas",
            "Validation error responses",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Centralized Error Handling",

          description:
            "Create centralized backend error handling and consistent API error responses.",

          whyItMatters:
            "Consistent error handling makes backend systems easier to debug, maintain, monitor, and consume.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Centralized error middleware",
            "Consistent API error response",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a REST API Project",

          description:
            "Build a complete backend API with controllers, services, validation, middleware, error handling, and documentation.",

          whyItMatters:
            "A complete backend project demonstrates that you can apply API development concepts in a realistic application.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "API documentation",
            "REST endpoints",
            "Validation implementation",
            "Error handling implementation",
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

      title: "Databases and Data Modeling",

      description:
        "Learn relational and NoSQL databases and understand how to design data models for full-stack applications.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn SQL Fundamentals",

          description:
            "Practice relational database concepts, CRUD operations, joins, grouping, aggregation, and transactions.",

          whyItMatters:
            "SQL is a core backend skill and is widely used for storing and querying structured application data.",

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
          title: "Learn MongoDB Fundamentals",

          description:
            "Learn documents, collections, CRUD operations, queries, indexes, and MongoDB data modeling.",

          whyItMatters:
            "MongoDB is widely used in JavaScript-based full-stack applications and is important for modern MERN development.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Database Relationships",

          description:
            "Understand one-to-one, one-to-many, and many-to-many relationships and how they are represented in different databases.",

          whyItMatters:
            "Understanding relationships helps developers design scalable and reliable data models for real-world applications.",

          difficulty: "medium",

          type: "article",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Design a Production Database",

          description:
            "Design a database schema for a full-stack application including relationships, constraints, indexes, and appropriate data types.",

          whyItMatters:
            "Good database design improves application performance, data integrity, scalability, and maintainability.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Database schema diagram",
            "Table or collection definitions",
            "Relationships",
            "Indexes and constraints documentation",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Connect the Backend to a Database",

          description:
            "Integrate the backend API with a database and implement persistent CRUD operations.",

          whyItMatters:
            "Connecting APIs to persistent storage is essential for building real-world full-stack applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Database connection",
            "CRUD operations",
            "Working API with persistent data",
          ],

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

      title: "Authentication and Full Stack Integration",

      description:
        "Connect the frontend, backend, and database into a secure full-stack application.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Implement User Registration",

          description:
            "Create a secure user registration flow with backend validation and password hashing.",

          whyItMatters:
            "User registration is a foundational authentication feature required by many real-world applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Registration endpoint",
            "Password hashing",
            "Input validation",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Implement Login and JWT Authentication",

          description:
            "Implement login, JWT generation, token handling, protected API routes, and authenticated frontend requests.",

          whyItMatters:
            "Authentication is one of the most important backend security concepts for full-stack developers.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Login endpoint",
            "JWT implementation",
            "Protected API route",
            "Authenticated frontend request",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Connect React to Backend APIs",

          description:
            "Integrate the React frontend with backend REST APIs and handle loading, success, and error states.",

          whyItMatters:
            "Full-stack developers must understand how frontend applications communicate with backend services.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "API integration code",
            "Loading states",
            "Error handling",
            "Successful API interaction",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Protected Frontend Routes",

          description:
            "Create authentication-aware routing and restrict access to protected application pages.",

          whyItMatters:
            "Protected routes ensure authenticated application features are not exposed to unauthorized users.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Protected route implementation",
            "Authentication state handling",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Implement Role-Based Authorization",

          description:
            "Implement role-based access control across frontend and backend resources.",

          whyItMatters:
            "Role-based authorization is important for protecting resources and implementing different permissions for different users.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Role definitions",
            "Backend authorization middleware",
            "Frontend role-based access",
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

      title: "Full Stack Production Project",

      description:
        "Build a complete production-style full-stack application from planning through implementation and testing.",

      estimatedDuration: 30,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Plan the Full Stack Application",

          description:
            "Define requirements, user flows, database entities, API endpoints, frontend pages, and application architecture.",

          whyItMatters:
            "Planning before implementation reduces architectural mistakes and demonstrates professional software development practices.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Project requirements",
            "User flow diagram",
            "Architecture diagram",
            "Feature breakdown",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Design the API and Database",

          description:
            "Design the REST API, database schema, relationships, validation rules, and authentication flow.",

          whyItMatters:
            "Strong API and database design creates a reliable foundation for the entire full-stack application.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "API endpoint documentation",
            "Database schema",
            "Entity relationships",
            "Authentication flow",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build the Full Stack Application",

          description:
            "Develop the frontend, backend, database, authentication, authorization, and core business functionality.",

          whyItMatters:
            "A complete full-stack application is the strongest demonstration that you can apply your skills to a real-world product.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 360,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Live application",
            "Frontend implementation",
            "Backend API",
            "Database integration",
            "Authentication",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Test the Application",

          description:
            "Test frontend functionality, backend APIs, validation, authentication, error cases, and important user flows.",

          whyItMatters:
            "Testing reduces production bugs and demonstrates that you can build reliable software rather than only functional prototypes.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Test files",
            "API test results",
            "Frontend test results",
            "Important user-flow tests",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Document the Full Stack Project",

          description:
            "Create professional documentation covering architecture, features, setup, API endpoints, database design, screenshots, and deployment.",

          whyItMatters:
            "Professional documentation makes your project easier to understand, evaluate, maintain, and present during interviews.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Professional README",
            "Architecture documentation",
            "API documentation",
            "Database documentation",
            "Screenshots",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 7
    // ============================================================

    {
      stageOrder: 7,

      title: "Deployment and Career Readiness",

      description:
        "Deploy the application and turn the completed project into a strong portfolio and interview asset.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Deploy the Frontend",

          description:
            "Deploy the React frontend to a production hosting platform and configure the production environment.",

          whyItMatters:
            "Deployment experience proves that you can take frontend applications beyond local development and make them accessible to real users.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Live frontend URL",
            "GitHub repository",
            "Production configuration",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Deploy the Backend",

          description:
            "Deploy the backend API and configure environment variables, database connections, and production settings.",

          whyItMatters:
            "Backend deployment is essential for demonstrating that you understand how production APIs and services operate.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Live API URL",
            "GitHub repository",
            "Production environment configuration",
            "Working API endpoint",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Configure Production Database",

          description:
            "Configure a production database and verify that the deployed application can securely access it.",

          whyItMatters:
            "Understanding production databases is necessary for deploying applications that persist and safely manage real data.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Production database configuration",
            "Successful database connection",
            "Working production CRUD operation",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Add the Project to Your Portfolio",

          description:
            "Create a professional portfolio entry containing the project's features, technology stack, GitHub repository, and live demo.",

          whyItMatters:
            "A polished portfolio converts your technical work into evidence that recruiters and hiring managers can evaluate.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 95,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Portfolio URL",
            "Project description",
            "Technology stack",
            "GitHub repository link",
            "Live demo link",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare for Full Stack Interviews",

          description:
            "Prepare to explain frontend architecture, backend APIs, database design, authentication, deployment, challenges, and technical decisions.",

          whyItMatters:
            "Interview preparation helps you communicate your technical knowledge and confidently explain the projects you built.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

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