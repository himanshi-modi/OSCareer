module.exports = [
  // ==================================================
  // FRONTEND
  // ==================================================

  {
    name: "HTML",
    category: "frontend",
    subCategory: "markup-language",
    description:
      "The standard markup language used to structure web pages.",
    difficulty: "beginner",
    aliases: ["HTML5"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "CSS",
    category: "frontend",
    subCategory: "styling",
    description:
      "A stylesheet language used to style and layout web pages.",
    difficulty: "beginner",
    aliases: ["CSS3"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "JavaScript",
    category: "frontend",
    subCategory: "programming-language",
    description:
      "A programming language widely used for web application development.",
    difficulty: "intermediate",
    aliases: ["JS", "Javascript"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "TypeScript",
    category: "frontend",
    subCategory: "programming-language",
    description:
      "A strongly typed programming language that builds on JavaScript.",
    difficulty: "intermediate",
    aliases: ["TS"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "React",
    category: "frontend",
    subCategory: "javascript-framework",
    description:
      "A JavaScript library for building user interfaces.",
    difficulty: "intermediate",
    aliases: ["ReactJS", "React.js"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "EJS",
    category: "frontend",
    subCategory: "template-engine",
    description:
      "A JavaScript templating engine used to generate HTML with embedded JavaScript.",
    difficulty: "intermediate",
    aliases: ["Embedded JavaScript"],
    isTrending: false,
    isActive: true,
    isDeleted: false,
  },

  // ==================================================
  // BACKEND
  // ==================================================

  {
    name: "Node.js",
    category: "backend",
    subCategory: "javascript-runtime",
    description:
      "A JavaScript runtime used for building scalable backend applications and APIs.",
    difficulty: "intermediate",
    aliases: ["Node", "Nodejs"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "Express.js",
    category: "backend",
    subCategory: "nodejs-framework",
    description:
      "A lightweight Node.js framework used for building web applications and REST APIs.",
    difficulty: "intermediate",
    aliases: ["Express", "ExpressJS"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "Spring Boot",
    category: "backend",
    subCategory: "java-framework",
    description:
      "A Java framework used for building production-ready backend applications and REST APIs.",
    difficulty: "intermediate",
    aliases: ["SpringBoot"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },
  {
  name: "Java",
  category: "backend",
  subCategory: "programming-language",
  description:
    "A general-purpose programming language widely used for backend, enterprise, and application development.",
  difficulty: "intermediate",
  aliases: ["Java SE", "Java Programming"],
  isTrending: true,
  isActive: true,
  isDeleted: false,
},
  {
    name: "Spring Security",
    category: "security",
    subCategory: "java-security-framework",
    description:
      "A security framework used for authentication and authorization in Spring applications.",
    difficulty: "advanced",
    aliases: [],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "REST API",
    category: "backend",
    subCategory: "api",
    description:
      "An architectural approach for designing web APIs using HTTP.",
    difficulty: "intermediate",
    aliases: [
      "REST",
      "RESTful API",
      "REST APIs"
    ],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  // ==================================================
  // DATABASE
  // ==================================================

  {
    name: "MongoDB",
    category: "database",
    subCategory: "nosql",
    description:
      "A document-oriented NoSQL database used for storing flexible application data.",
    difficulty: "intermediate",
    aliases: [
      "Mongo",
      "NoSQL",
  "No SQL",
     
    ],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "PostgreSQL",
    category: "database",
    subCategory: "relational-database",
    description:
      "An advanced open-source relational database management system.",
    difficulty: "intermediate",
    aliases: ["Postgres"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "MySQL",
    category: "database",
    subCategory: "relational-database",
    description:
      "A widely used open-source relational database management system.",
    difficulty: "intermediate",
    aliases: [],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "SQL",
    category: "database",
    subCategory: "query-language",
    description:
      "A language used to manage and query relational databases.",
    difficulty: "intermediate",
    aliases: [],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  // ==================================================
  // DEVOPS
  // ==================================================

  {
    name: "Docker",
    category: "devops",
    subCategory: "containerization",
    description:
      "A platform used to build, package, and run applications in containers.",
    difficulty: "intermediate",
    aliases: [],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  // ==================================================
  // SECURITY
  // ==================================================

  {
    name: "JWT",
    category: "security",
    subCategory: "authentication",
    description:
      "A token-based authentication mechanism commonly used for securing APIs.",
    difficulty: "intermediate",
    aliases: [
      "JWT Authentication",
      "JSON Web Token",
      "JSON Web Tokens"
    ],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "OAuth2",
    category: "security",
    subCategory: "authorization",
    description:
      "An authorization framework used to provide delegated access to protected resources.",
    difficulty: "advanced",
    aliases: ["OAuth", "OAuth 2.0"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  // ==================================================
  // TESTING
  // ==================================================

  {
    name: "JUnit",
    category: "testing",
    subCategory: "java-testing",
    description:
      "A testing framework for Java applications.",
    difficulty: "intermediate",
    aliases: ["JUnit 5"],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  // ==================================================
  // OTHER
  // ==================================================

  {
    name: "Git",
    category: "other",
    subCategory: "version-control",
    description:
      "A distributed version control system used to manage source code.",
    difficulty: "beginner",
    aliases: [],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "Maven",
    category: "other",
    subCategory: "build-tool",
    description:
      "A build automation and dependency management tool for Java projects.",
    difficulty: "intermediate",
    aliases: [],
    isTrending: false,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "Postman",
    category: "other",
    subCategory: "api-testing",
    description:
      "A platform used for developing and testing APIs.",
    difficulty: "beginner",
    aliases: [],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },

  {
    name: "Swagger/OpenAPI",
    category: "other",
    subCategory: "api-documentation",
    description:
      "A specification and tooling ecosystem for designing and documenting APIs.",
    difficulty: "intermediate",
    aliases: [
      "Swagger",
      "OpenAPI",
      "Swagger/ OpenAPI"
    ],
    isTrending: true,
    isActive: true,
    isDeleted: false,
  },
];