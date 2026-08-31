module.exports = {
  roadmap: {
    title: "MERN Stack Developer",

    slug: "mern-stack-developer",

    targetCareer: "MERN Stack Developer",

    description:
      "A structured roadmap to become a job-ready MERN Stack Developer by learning JavaScript, React, Node.js, Express, MongoDB, authentication, testing, deployment, and production-ready development practices.",

    difficulty: "intermediate",

    estimatedDuration: 120,

    totalStages: 6,

    isActive: true,

    version: 1,

    createdBy: "admin",
  },

  stages: [
    {
      stageOrder: 1,

      title: "JavaScript Fundamentals",

      description:
        "Build a strong foundation in modern JavaScript and understand the language features required for MERN development.",

      estimatedDuration: 20,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Learn JavaScript Variables and Data Types",

          description:
            "Learn let, const, primitive data types, objects, arrays, and type conversion in JavaScript.",

          whyItMatters:
            "JavaScript is the core language of the MERN stack, so understanding variables and data types is essential for writing reliable applications.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 45,

          careerImpact: 70,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand let and const",
            "Understand primitive and reference data types",
            "Explain type conversion",
            "Complete basic JavaScript exercises",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Practice JavaScript Functions",

          description:
            "Practice function declarations, function expressions, arrow functions, parameters, return values, and scope.",

          whyItMatters:
            "Functions are the foundation of reusable JavaScript logic and are used extensively in React components, Express controllers, services, and utilities.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 75,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Write regular functions",
            "Write arrow functions",
            "Use parameters and return values",
            "Demonstrate understanding of scope",
            "Complete function-based exercises",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Master Arrays and Objects",

          description:
            "Practice array and object manipulation using methods such as map, filter, reduce, find, and destructuring.",

          whyItMatters:
            "Arrays and objects are used constantly when handling API responses, MongoDB documents, React state, and application data.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 80,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Use map, filter, reduce, and find",
            "Manipulate JavaScript objects",
            "Use destructuring",
            "Use spread syntax",
            "Solve practical data manipulation exercises",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Understand Asynchronous JavaScript",

          description:
            "Learn callbacks, promises, async/await, and how asynchronous operations work in JavaScript.",

          whyItMatters:
            "MERN applications depend heavily on asynchronous operations such as API requests, database operations, authentication, and external services.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand callbacks",
            "Understand Promises",
            "Use async and await",
            "Handle asynchronous errors",
            "Explain asynchronous execution",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 2,

      title: "React Frontend Development",

      description:
        "Learn React fundamentals and build responsive, component-based frontend applications.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Create Your First React Application",

          description:
            "Create a React application using Vite and understand the basic project structure.",

          whyItMatters:
            "React is the frontend foundation of the MERN stack and is widely used to build modern interactive web applications.",

          difficulty: "easy",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create a React application with Vite",
            "Understand the project structure",
            "Run the development server",
            "Commit the project to GitHub",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Components and Props",

          description:
            "Create reusable React components and pass data between components using props.",

          whyItMatters:
            "Component-based architecture allows MERN developers to create maintainable and reusable frontend applications.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 80,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Create functional components",
            "Pass data using props",
            "Reuse components",
            "Understand component composition",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn State and Event Handling",

          description:
            "Use useState and event handlers to create interactive React applications.",

          whyItMatters:
            "State management and event handling are essential for building interactive forms, dashboards, authentication flows, and dynamic interfaces.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Use useState",
            "Handle user events",
            "Update component state",
            "Build an interactive React feature",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Build a React CRUD Application",

          description:
            "Build a small CRUD application using React components, forms, state management, and API-ready architecture.",

          whyItMatters:
            "CRUD applications simulate real-world frontend workflows and prepare you to integrate React applications with backend APIs.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Implement create functionality",
            "Implement read functionality",
            "Implement update functionality",
            "Implement delete functionality",
            "Use reusable React components",
            "Implement forms and state management",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 3,

      title: "Node.js and Express",

      description:
        "Learn backend development using Node.js and Express and build structured REST APIs.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Node.js Fundamentals",

          description:
            "Understand Node.js runtime concepts, modules, npm, environment variables, and asynchronous programming.",

          whyItMatters:
            "Node.js powers the backend of MERN applications and allows developers to use JavaScript across the entire application stack.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 80,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand the Node.js runtime",
            "Use npm packages",
            "Understand Node.js modules",
            "Use environment variables",
            "Understand asynchronous execution",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Build an Express REST API",

          description:
            "Create an Express REST API with routes, controllers, middleware, and proper HTTP responses.",

          whyItMatters:
            "REST APIs are the communication layer between React applications and backend services in most MERN applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create Express routes",
            "Implement controllers",
            "Use middleware",
            "Return appropriate HTTP status codes",
            "Create multiple REST endpoints",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement Express Middleware",

          description:
            "Create custom middleware for authentication, validation, logging, and request processing.",

          whyItMatters:
            "Middleware is essential for implementing authentication, validation, logging, error handling, and reusable backend functionality.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create custom middleware",
            "Process incoming requests",
            "Implement middleware chaining",
            "Create reusable request-processing logic",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Centralized Error Handling",

          description:
            "Create centralized error-handling middleware and consistent API error responses.",

          whyItMatters:
            "Consistent error handling makes backend applications easier to debug, maintain, monitor, and consume from frontend applications.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create centralized error middleware",
            "Handle application errors",
            "Return consistent error responses",
            "Handle unknown routes",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 4,

      title: "MongoDB and Authentication",

      description:
        "Learn MongoDB, Mongoose, database relationships, JWT authentication, and authorization.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn MongoDB Fundamentals",

          description:
            "Learn collections, documents, CRUD operations, indexes, and basic MongoDB queries.",

          whyItMatters:
            "MongoDB is one of the core technologies of the MERN stack and stores the application data used by backend services.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Understand collections and documents",
            "Perform CRUD operations",
            "Write MongoDB queries",
            "Understand indexes",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Mongoose",

          description:
            "Create Mongoose schemas and models and work with validation, references, queries, and middleware.",

          whyItMatters:
            "Mongoose provides structure, validation, relationships, and convenient database access patterns for Node.js applications using MongoDB.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Create Mongoose schemas",
            "Create Mongoose models",
            "Use schema validation",
            "Use references",
            "Perform Mongoose queries",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement JWT Authentication",

          description:
            "Build registration, login, password hashing, JWT authentication, and protected API routes.",

          whyItMatters:
            "Secure authentication is a fundamental requirement of production MERN applications and demonstrates real backend engineering ability.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Implement user registration",
            "Hash passwords securely",
            "Implement login",
            "Generate and validate JWTs",
            "Protect private routes",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Role-Based Authorization",

          description:
            "Protect API resources using roles and authorization middleware.",

          whyItMatters:
            "Role-based authorization is commonly required in real applications where different users need different permissions.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Define user roles",
            "Implement authorization middleware",
            "Restrict protected resources",
            "Test multiple permission levels",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 5,

      title: "Full Stack Project",

      description:
        "Build a complete MERN application integrating React, Node.js, Express, MongoDB, authentication, and REST APIs.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Design the Application Architecture",

          description:
            "Define application requirements, database entities, API endpoints, frontend pages, and component structure.",

          whyItMatters:
            "Planning the architecture before implementation reduces rework and demonstrates the ability to design complete software systems.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Define application requirements",
            "Design database entities",
            "Define API endpoints",
            "Plan frontend pages",
            "Define component structure",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Build the MERN Application",

          description:
            "Develop the frontend, backend, database, authentication, and core functionality of a complete MERN application.",

          whyItMatters:
            "A complete MERN project proves that you can integrate frontend, backend, database, authentication, and business logic into a working product.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 300,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Build React frontend",
            "Build Node.js and Express backend",
            "Integrate MongoDB",
            "Implement authentication",
            "Implement core business functionality",
            "Connect frontend and backend",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Add API Validation and Security",

          description:
            "Add input validation, secure authentication, authorization, error handling, and security best practices.",

          whyItMatters:
            "Production applications must protect user data and prevent invalid or malicious requests from compromising the system.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Validate API requests",
            "Secure authentication flows",
            "Implement authorization",
            "Handle errors consistently",
            "Apply backend security practices",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Write Professional Project Documentation",

          description:
            "Create a README containing project overview, features, setup instructions, architecture, API documentation, and screenshots.",

          whyItMatters:
            "Professional documentation makes your project easier to evaluate and demonstrates software-engineering communication skills.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create a professional README",
            "Document project features",
            "Document setup instructions",
            "Document architecture",
            "Document API endpoints",
            "Add relevant screenshots",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 6,

      title: "Deployment and Job Readiness",

      description:
        "Deploy the application and prepare a professional portfolio and project presentation for job applications.",

      estimatedDuration: 10,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Deploy the MERN Application",

          description:
            "Deploy the frontend and backend and connect the application to a production MongoDB database.",

          whyItMatters:
            "Deployment demonstrates that you can take a MERN application from local development to a publicly accessible production environment.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Deploy the frontend",
            "Deploy the backend",
            "Connect the production database",
            "Configure production environment variables",
            "Verify the live application",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Add Project to Your Portfolio",

          description:
            "Create a professional portfolio entry containing the project description, technologies, GitHub repository, and live demo.",

          whyItMatters:
            "A well-presented project gives recruiters and hiring managers concrete evidence of your technical skills.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 90,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Add the project to your portfolio",
            "Include the technology stack",
            "Add GitHub repository link",
            "Add live demo link",
            "Describe major project features",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Prepare Project Interview Explanation",

          description:
            "Prepare to explain the architecture, database design, authentication flow, API structure, challenges, and technical decisions of the project.",

          whyItMatters:
            "Being able to clearly explain your own project is critical during technical interviews and demonstrates genuine understanding rather than just code completion.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 90,

          proofRequired: false,

          proofType: null,

          evidenceRequired: [
            "Explain the application architecture",
            "Explain database design",
            "Explain authentication flow",
            "Explain API structure",
            "Explain major technical decisions",
            "Prepare answers for project-related interview questions",
          ],

          missionOrder: 3,

          isRequired: true,
        },
      ],
    },
  ],

  challenges: [
    {
      stageOrder: 1,

      challengeType: "project",

      objective:
        "Build a JavaScript application that demonstrates strong understanding of variables, functions, arrays, objects, and asynchronous programming.",

      requiredSkills: [
        "JavaScript",
        "Variables and Data Types",
        "Functions",
        "Arrays",
        "Objects",
        "Promises",
        "Async/Await",
      ],

      evaluationCriteria: [
        "Uses modern JavaScript syntax",
        "Uses functions and reusable logic correctly",
        "Demonstrates array and object manipulation",
        "Uses asynchronous JavaScript appropriately",
        "Maintains clean and readable code",
      ],
    },

    {
      stageOrder: 2,

      challengeType: "project",

      objective:
        "Build a responsive React application using reusable components, state management, event handling, and CRUD functionality.",

      requiredSkills: [
        "React",
        "Components",
        "Props",
        "useState",
        "Event Handling",
        "Forms",
        "CRUD",
      ],

      evaluationCriteria: [
        "Uses reusable React components",
        "Manages state correctly",
        "Handles user interactions correctly",
        "Implements CRUD functionality",
        "Provides a responsive user interface",
      ],
    },

    {
      stageOrder: 3,

      challengeType: "project",

      objective:
        "Build a structured REST API using Node.js and Express with routes, controllers, middleware, validation, and centralized error handling.",

      requiredSkills: [
        "Node.js",
        "Express",
        "REST API",
        "Middleware",
        "Validation",
        "Error Handling",
      ],

      evaluationCriteria: [
        "Uses proper REST API structure",
        "Separates routes and controllers",
        "Implements middleware correctly",
        "Validates incoming requests",
        "Uses centralized error handling",
      ],
    },

    {
      stageOrder: 4,

      challengeType: "project",

      objective:
        "Build a secure backend system using MongoDB, Mongoose, JWT authentication, and role-based authorization.",

      requiredSkills: [
        "MongoDB",
        "Mongoose",
        "JWT",
        "Authentication",
        "Authorization",
        "Password Hashing",
      ],

      evaluationCriteria: [
        "Uses appropriate MongoDB schema design",
        "Implements secure authentication",
        "Protects private routes",
        "Implements role-based authorization",
        "Handles authentication errors correctly",
      ],
    },

    {
      stageOrder: 5,

      challengeType: "project",

      objective:
        "Build a complete production-style MERN application integrating React, Node.js, Express, MongoDB, authentication, and REST APIs.",

      requiredSkills: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Authentication",
        "REST APIs",
        "Full Stack Development",
      ],

      evaluationCriteria: [
        "Frontend and backend are properly integrated",
        "Database operations work correctly",
        "Authentication is implemented securely",
        "API architecture is well structured",
        "Application provides a complete user workflow",
      ],
    },

    {
      stageOrder: 6,

      challengeType: "deployment",

      objective:
        "Deploy the MERN application and prepare a professional portfolio presentation demonstrating the project and its technical decisions.",

      requiredSkills: [
        "Deployment",
        "MongoDB Atlas",
        "Environment Variables",
        "GitHub",
        "Portfolio",
        "Project Documentation",
      ],

      evaluationCriteria: [
        "Application is successfully deployed",
        "Production database is configured",
        "Environment variables are handled securely",
        "GitHub repository is professionally documented",
        "Project is presented clearly in the portfolio",
      ],
    },
  ],
};