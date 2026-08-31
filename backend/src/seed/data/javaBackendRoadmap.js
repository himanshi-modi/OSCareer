module.exports = {
  roadmap: {
    title: "Java Backend Developer",

    slug: "java-backend-developer",

    targetCareer: "Java Backend Developer",

    description:
      "A structured roadmap to become a job-ready Java Backend Developer by mastering Java, Spring Boot, REST APIs, databases, JPA, authentication, testing, API documentation, deployment, and backend system design.",

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

      title: "Core Java Fundamentals",

      description:
        "Build a strong foundation in Java programming, object-oriented programming, collections, exceptions, and modern Java features.",

      estimatedDuration: 20,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Learn Java Syntax and Fundamentals",

          description:
            "Learn variables, data types, operators, control flow, methods, arrays, and basic input and output in Java.",

          whyItMatters:
            "Java fundamentals are the foundation for every backend application you will build with the Java ecosystem.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 75,

          proofRequired: false,

          evidenceRequired: [
            "Complete the Java fundamentals lessons",
            "Practice basic Java programs",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master Object-Oriented Programming",

          description:
            "Practice classes, objects, constructors, inheritance, polymorphism, abstraction, and encapsulation.",

          whyItMatters:
            "Spring Boot applications heavily rely on object-oriented design, so strong OOP knowledge is essential for writing maintainable backend systems.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Complete OOP exercises",
            "Implement examples using inheritance and polymorphism",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Practice Java Collections",

          description:
            "Learn and practice List, Set, Map, Queue, ArrayList, LinkedList, HashSet, HashMap, and their common use cases.",

          whyItMatters:
            "Collections are used constantly in backend development for storing, processing, filtering, and transforming application data.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Java collection exercises",
            "Examples using List, Set, Map, and Queue",
            "GitHub repository containing solutions",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Exception Handling",

          description:
            "Understand checked and unchecked exceptions, try-catch-finally, throw, throws, and custom exceptions.",

          whyItMatters:
            "Proper exception handling prevents backend applications from failing unexpectedly and allows APIs to return meaningful errors.",

          difficulty: "easy",

          type: "article",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 80,

          proofRequired: false,

          evidenceRequired: [
            "Complete exception-handling exercises",
            "Implement custom exception examples",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Practice Java Streams and Lambdas",

          description:
            "Learn lambda expressions, functional interfaces, streams, filtering, mapping, sorting, and collecting.",

          whyItMatters:
            "Streams and lambdas are widely used in modern Java backend applications for concise and efficient data processing.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Stream API exercises",
            "Lambda expression examples",
            "Filtering, mapping, sorting, and collecting examples",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 2,

      title: "Spring Boot and REST APIs",

      description:
        "Learn Spring Boot architecture and build clean, maintainable REST APIs using controllers, services, repositories, and DTOs.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Create Your First Spring Boot Application",

          description:
            "Create a Spring Boot project and understand dependency injection, application configuration, and the standard project structure.",

          whyItMatters:
            "Spring Boot is one of the most widely used technologies for building production Java backend applications.",

          difficulty: "easy",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Working Spring Boot project",
            "GitHub repository",
            "Application configuration",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Spring Dependency Injection",

          description:
            "Understand IoC, dependency injection, components, services, repositories, and constructor injection.",

          whyItMatters:
            "Dependency injection is a core Spring concept and is essential for building loosely coupled and testable backend applications.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Complete dependency injection exercises",
            "Implement constructor injection examples",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build a REST API with Spring Boot",

          description:
            "Build REST endpoints using controllers, services, DTOs, request validation, and appropriate HTTP status codes.",

          whyItMatters:
            "REST API development is one of the primary responsibilities of a Java backend developer.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Working REST API",
            "Controllers and service layer",
            "DTO implementation",
            "Request validation",
            "GitHub repository",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Request Validation",

          description:
            "Validate incoming API requests using Bean Validation annotations and return meaningful validation errors.",

          whyItMatters:
            "Backend APIs must reject invalid data safely and consistently to protect application integrity.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Bean Validation implementation",
            "Validation error responses",
            "GitHub repository",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Implement Global Exception Handling",

          description:
            "Create centralized exception handling using @ControllerAdvice and return consistent API error responses.",

          whyItMatters:
            "Centralized error handling makes backend APIs predictable, maintainable, and easier to debug.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "@ControllerAdvice implementation",
            "Custom exception handling",
            "Consistent API error responses",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 3,

      title: "SQL and Spring Data JPA",

      description:
        "Learn relational databases and integrate them with Spring Boot using JPA and Hibernate.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn SQL Fundamentals",

          description:
            "Practice SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY, GROUP BY, and aggregate functions.",

          whyItMatters:
            "Backend developers need SQL to retrieve, modify, analyze, and manage persistent application data.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Complete SQL exercises",
            "Practice CRUD queries",
            "Practice aggregation queries",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master SQL Joins",

          description:
            "Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, self joins, and how to combine related database records.",

          whyItMatters:
            "Real-world backend applications frequently need data from multiple related tables, making joins an essential SQL skill.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "SQL join exercises",
            "INNER JOIN examples",
            "LEFT JOIN examples",
            "Self-join example",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn JPA and Hibernate",

          description:
            "Understand entities, repositories, persistence context, relationships, and Hibernate's role in Spring Boot applications.",

          whyItMatters:
            "JPA and Hibernate allow Java backend developers to work with relational databases using domain models and object-relational mapping.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Complete JPA and Hibernate lessons",
            "Practice entity mapping",
            "Practice repository operations",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Build a Database-Driven Spring Boot API",

          description:
            "Build a Spring Boot application connected to a relational database using Spring Data JPA and implement CRUD operations.",

          whyItMatters:
            "Combining Spring Boot with a database is a core requirement for building real-world backend applications.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Working database-connected Spring Boot API",
            "JPA entities",
            "Repositories",
            "CRUD endpoints",
            "GitHub repository",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Design a Relational Database",

          description:
            "Design a normalized relational database schema with appropriate relationships, constraints, and indexes for a backend application.",

          whyItMatters:
            "Good database design improves application reliability, query performance, scalability, and maintainability.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Database ER diagram",
            "Table definitions",
            "Relationships",
            "Constraints",
            "Indexing strategy",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 4,

      title: "Spring Security and Authentication",

      description:
        "Learn authentication, authorization, password security, JWT, and secure REST API development.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Spring Security Fundamentals",

          description:
            "Understand authentication, authorization, security filters, SecurityContext, and Spring Security configuration.",

          whyItMatters:
            "Security is essential for protecting backend applications, user accounts, APIs, and sensitive data.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Complete Spring Security lessons",
            "Practice authentication and authorization concepts",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Implement Password-Based Authentication",

          description:
            "Implement secure user registration and login using password hashing and Spring Security.",

          whyItMatters:
            "Secure authentication is required by almost every production application that manages user accounts.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "User registration endpoint",
            "Login endpoint",
            "Password hashing",
            "Spring Security configuration",
            "GitHub repository",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Implement JWT Authentication",

          description:
            "Implement JWT token generation, validation, authentication filters, and protected REST endpoints.",

          whyItMatters:
            "JWT-based authentication is a common approach for securing REST APIs and is highly relevant to backend development jobs.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "JWT generation",
            "JWT validation",
            "Authentication filter",
            "Protected endpoints",
            "GitHub repository",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Implement Role-Based Authorization",

          description:
            "Protect resources based on user roles and implement authorization rules for different API endpoints.",

          whyItMatters:
            "Role-based authorization allows applications to safely control what different types of users can access.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Multiple user roles",
            "Role-based endpoint restrictions",
            "Authorization configuration",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Secure REST APIs",

          description:
            "Apply secure API practices including input validation, authentication, authorization, error handling, and sensitive-data protection.",

          whyItMatters:
            "Production backend developers must understand how to protect APIs from common security and data-handling problems.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Secure API configuration",
            "Input validation",
            "Authentication and authorization",
            "Sensitive-data protection",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 5,

      title: "Testing and API Quality",

      description:
        "Learn automated testing, mocking, API documentation, and practices required for production-quality backend applications.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Unit Testing with JUnit",

          description:
            "Write unit tests for Java classes and Spring Boot services using JUnit.",

          whyItMatters:
            "Automated unit tests help backend developers detect regressions and confidently change application code.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Complete JUnit lessons",
            "Write basic unit tests",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Practice Mockito",

          description:
            "Use Mockito to mock dependencies and isolate service-layer logic during unit testing.",

          whyItMatters:
            "Mocking is important for testing backend services independently from databases and external dependencies.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Mockito test cases",
            "Mocked service dependencies",
            "GitHub repository",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Write REST API Integration Tests",

          description:
            "Test REST endpoints and verify request validation, authentication, responses, and error scenarios.",

          whyItMatters:
            "Integration testing verifies that backend components work correctly together and that APIs behave as expected.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "REST endpoint tests",
            "Authentication tests",
            "Validation tests",
            "Error scenario tests",
            "GitHub repository",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Document APIs with Swagger",

          description:
            "Create interactive API documentation using OpenAPI and Swagger.",

          whyItMatters:
            "Clear API documentation makes backend services easier for frontend developers, testers, and other teams to consume.",

          difficulty: "easy",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 80,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Working Swagger UI",
            "Documented API endpoints",
            "Request and response schemas",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Improve Backend Code Quality",

          description:
            "Review a backend application for clean architecture, naming, separation of concerns, validation, error handling, and maintainability.",

          whyItMatters:
            "Professional backend development requires code that remains readable, testable, maintainable, and scalable as applications grow.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Code quality review",
            "Refactored backend code",
            "Improved project structure",
            "GitHub repository",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 6,

      title: "Deployment and System Design",

      description:
        "Deploy a production-ready backend and develop the system-design knowledge expected from backend developers.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Containerize the Spring Boot Application",

          description:
            "Create a Docker configuration for a Spring Boot backend and understand application containerization.",

          whyItMatters:
            "Docker makes backend applications portable and prepares developers for modern deployment and cloud environments.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Dockerfile",
            "Containerized Spring Boot application",
            "Docker build and run configuration",
            "GitHub repository",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Deploy the Spring Boot API",

          description:
            "Deploy the backend application to a cloud platform and configure its production environment.",

          whyItMatters:
            "Backend developers need to understand how applications move from local development into real production environments.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Live backend API",
            "Production configuration",
            "Deployment URL",
            "Successful API response from production",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Backend System Design",

          description:
            "Study scalability, caching, load balancing, database selection, API design, and distributed-system fundamentals.",

          whyItMatters:
            "System design knowledge helps backend developers understand how production systems scale and handle large workloads.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Complete system design lessons",
            "Study scalability and caching concepts",
            "Practice backend architecture problems",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Design a Scalable Backend System",

          description:
            "Design a backend system and document its architecture, APIs, database, scaling strategy, and major technical decisions.",

          whyItMatters:
            "Designing scalable systems demonstrates that you can think beyond individual APIs and understand complete backend architecture.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "System architecture diagram",
            "API design",
            "Database design",
            "Scaling strategy",
            "Technical decisions document",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare Your Backend Project for Interviews",

          description:
            "Prepare to explain architecture, database design, authentication, APIs, testing, deployment, and technical decisions during interviews.",

          whyItMatters:
            "Being able to clearly explain your technical decisions is critical when demonstrating backend expertise during interviews.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [
            "Prepare project explanation",
            "Practice backend interview questions",
            "Prepare architecture discussion",
            "Prepare technical decision explanations",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },
  ],
};