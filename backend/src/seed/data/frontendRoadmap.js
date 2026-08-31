module.exports = {
  roadmap: {
    title: "Frontend Developer",

    slug: "frontend-developer",

    targetCareer: "Frontend Developer",

    description:
      "A structured roadmap to become a job-ready Frontend Developer by mastering HTML, CSS, JavaScript, responsive design, React, frontend architecture, accessibility, testing, performance, deployment, and portfolio development.",

    difficulty: "beginner",

    estimatedDuration: 100,

    totalStages: 7,

    isActive: true,

    version: 1,

    createdBy: "admin",
  },

  stages: [
    {
      stageOrder: 1,

      title: "Web Fundamentals",

      description:
        "Build a strong foundation in how the web works and learn semantic HTML, accessibility, browser fundamentals, and Git.",

      estimatedDuration: 12,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Understand How the Web Works",

          description:
            "Learn how browsers, servers, HTTP requests, responses, URLs, DNS, and web applications work together.",

          whyItMatters:
            "Understanding how the web works helps you debug frontend issues and understand how your applications communicate with servers.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 75,

          proofRequired: false,

          evidenceRequired: [
            "Explain the browser-server request lifecycle",
            "Explain HTTP requests and responses",
            "Explain DNS and URLs",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Semantic HTML",

          description:
            "Learn semantic HTML elements, document structure, headings, links, images, lists, tables, and forms.",

          whyItMatters:
            "Semantic HTML is the foundation of accessible, maintainable, and search-engine-friendly frontend applications.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 80,

          proofRequired: false,

          evidenceRequired: [
            "Create a semantic HTML document",
            "Use appropriate headings and landmarks",
            "Build accessible forms and links",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build an Accessible HTML Page",

          description:
            "Build a semantic webpage using accessible markup, labels, meaningful links, images, and proper document structure.",

          whyItMatters:
            "Building accessible interfaces is an important professional frontend skill and ensures your applications can be used by more people.",

          difficulty: "easy",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository containing the webpage",
            "Semantic HTML structure",
            "Accessible form controls",
            "Meaningful image alt text",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Git and GitHub",

          description:
            "Learn repositories, commits, branches, pull requests, and basic Git workflows used in frontend development.",

          whyItMatters:
            "Git and GitHub are essential for collaborating with development teams and maintaining professional frontend projects.",

          difficulty: "easy",

          type: "video",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Create and clone a Git repository",
            "Create commits and branches",
            "Understand pull requests",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 2,

      title: "CSS and Responsive Design",

      description:
        "Learn modern CSS and create responsive, accessible interfaces that work across different screen sizes.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Master CSS Fundamentals",

          description:
            "Learn selectors, specificity, inheritance, box model, units, colors, typography, and common CSS properties.",

          whyItMatters:
            "Strong CSS fundamentals are required to build visually polished and maintainable frontend interfaces.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Explain the CSS box model",
            "Use selectors and specificity correctly",
            "Style typography and layouts",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Flexbox",

          description:
            "Use Flexbox to create flexible layouts and align elements across different screen sizes.",

          whyItMatters:
            "Flexbox is one of the most commonly used CSS layout systems for building flexible user interfaces.",

          difficulty: "easy",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository containing Flexbox exercises",
            "Create horizontal and vertical layouts",
            "Demonstrate alignment and spacing",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn CSS Grid",

          description:
            "Use CSS Grid to create two-dimensional layouts and responsive page structures.",

          whyItMatters:
            "CSS Grid enables developers to create complex and responsive page layouts with clean, maintainable CSS.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository containing Grid exercises",
            "Create a two-dimensional layout",
            "Use responsive grid techniques",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Responsive Web Design",

          description:
            "Learn media queries, mobile-first development, fluid layouts, responsive images, and responsive typography.",

          whyItMatters:
            "Modern websites must provide a good experience across phones, tablets, laptops, and large screens.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Explain mobile-first development",
            "Use media queries",
            "Explain responsive images and typography",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Responsive Landing Page",

          description:
            "Build a polished responsive landing page using semantic HTML and modern CSS techniques.",

          whyItMatters:
            "A responsive landing page demonstrates practical HTML and CSS skills and becomes a useful portfolio project.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Responsive desktop and mobile layouts",
            "Semantic HTML",
            "Modern CSS layout techniques",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 3,

      title: "JavaScript for Frontend Development",

      description:
        "Learn modern JavaScript and use it to create interactive browser-based applications.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn JavaScript Fundamentals",

          description:
            "Learn variables, data types, operators, conditionals, loops, functions, and scope.",

          whyItMatters:
            "JavaScript is the core programming language of modern frontend development and is required for building interactive applications.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [
            "Explain JavaScript variables and data types",
            "Write functions and conditional logic",
            "Use loops and understand scope",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master Arrays and Objects",

          description:
            "Practice arrays, objects, destructuring, spread syntax, and common array methods such as map, filter, and reduce.",

          whyItMatters:
            "Arrays and objects are fundamental to working with application data, APIs, state, and JavaScript-based UI logic.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Solve array manipulation problems",
            "Work with nested objects",
            "Use map, filter, and reduce",
            "Demonstrate destructuring and spread syntax",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn DOM Manipulation",

          description:
            "Use JavaScript to select elements, modify the DOM, handle events, and create interactive interfaces.",

          whyItMatters:
            "DOM manipulation teaches how JavaScript interacts with browser interfaces and provides essential understanding before using frameworks such as React.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Interactive DOM-based application",
            "Event handling implementation",
            "Dynamic DOM updates",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Asynchronous JavaScript",

          description:
            "Understand callbacks, promises, async/await, error handling, and asynchronous browser operations.",

          whyItMatters:
            "Asynchronous programming is essential when communicating with APIs, handling network requests, and building responsive applications.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Explain promises",
            "Use async and await",
            "Handle asynchronous errors",
            "Explain asynchronous execution",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Work with REST APIs from JavaScript",

          description:
            "Use fetch and asynchronous JavaScript to retrieve, send, and display data from REST APIs.",

          whyItMatters:
            "Frontend applications frequently depend on backend APIs, making API integration a critical job-ready frontend skill.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "REST API integration",
            "GET and POST requests",
            "Loading and error handling",
            "Rendered API data",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 4,

      title: "React Development",

      description:
        "Learn React and build modern component-based applications with reusable UI architecture.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Create a React Application",

          description:
            "Create a React application using Vite and understand the project structure and development workflow.",

          whyItMatters:
            "React is widely used in modern frontend development, and understanding its project structure is essential for professional work.",

          difficulty: "easy",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Working React application",
            "Vite project structure",
            "Application running successfully",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Components and Props",

          description:
            "Create reusable components and pass information between components using props.",

          whyItMatters:
            "Component-based architecture is fundamental to React and helps developers build scalable and maintainable interfaces.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Explain React components",
            "Create reusable components",
            "Pass data using props",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Master State and Hooks",

          description:
            "Use useState, useEffect, and custom hooks to manage state and side effects.",

          whyItMatters:
            "React state and hooks are core skills required to build interactive and data-driven applications.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "useState implementation",
            "useEffect implementation",
            "Custom hook implementation",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn React Routing",

          description:
            "Implement client-side navigation, nested routes, route parameters, and protected routes.",

          whyItMatters:
            "Routing is required to build multi-page experiences and authenticated applications using React.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Multiple application routes",
            "Route parameters",
            "Protected route implementation",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a React CRUD Application",

          description:
            "Build a frontend application with forms, validation, state management, routing, and API integration.",

          whyItMatters:
            "A CRUD application demonstrates the combination of React, state management, forms, routing, and API integration used in real products.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Create, read, update, and delete functionality",
            "Form validation",
            "API integration",
            "React routing",
            "State management",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 5,

      title: "Advanced Frontend Development",

      description:
        "Learn frontend architecture, reusable design systems, state management, accessibility, and API-driven interfaces.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Advanced React Patterns",

          description:
            "Learn reusable component patterns, composition, lifting state, controlled components, and custom hooks.",

          whyItMatters:
            "Advanced React patterns help developers create scalable, reusable, and maintainable frontend architectures.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Explain component composition",
            "Demonstrate lifting state",
            "Create controlled components",
            "Use reusable custom hooks",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Global State Management",

          description:
            "Understand when global state is needed and implement a state-management solution in a React application.",

          whyItMatters:
            "Understanding global state helps developers manage complex application data without creating tightly coupled components.",

          difficulty: "medium",

          type: "project",

          priority: "medium",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Global state implementation",
            "State shared across multiple components",
            "Demonstration of appropriate state boundaries",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build Reusable UI Components",

          description:
            "Create reusable buttons, forms, modals, cards, navigation components, and other UI primitives.",

          whyItMatters:
            "Reusable components reduce duplication and are essential for building consistent and scalable frontend applications.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Reusable component library",
            "Reusable form components",
            "Reusable modal and card components",
            "Consistent component API",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Frontend Accessibility",

          description:
            "Apply keyboard navigation, semantic markup, accessible forms, focus management, and ARIA where appropriate.",

          whyItMatters:
            "Accessibility is a professional frontend responsibility and helps ensure applications are usable by people with different abilities.",

          difficulty: "medium",

          type: "article",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Explain keyboard accessibility",
            "Use semantic HTML",
            "Build accessible forms",
            "Understand appropriate ARIA usage",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build an API-Driven Dashboard",

          description:
            "Build a production-style dashboard consuming APIs with reusable components, loading states, error states, and responsive layouts.",

          whyItMatters:
            "A dashboard combines API integration, component architecture, state management, responsive design, and real-world UI patterns.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "API integration",
            "Reusable dashboard components",
            "Loading states",
            "Error states",
            "Responsive design",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 6,

      title: "Testing and Frontend Performance",

      description:
        "Learn how to test frontend applications and improve performance, reliability, and user experience.",

      estimatedDuration: 10,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Frontend Testing Fundamentals",

          description:
            "Understand unit, component, and integration testing and learn what frontend code should be tested.",

          whyItMatters:
            "Testing helps prevent regressions and gives developers confidence when changing or extending frontend applications.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Explain unit testing",
            "Explain component testing",
            "Explain integration testing",
            "Identify important UI behavior to test",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Write React Component Tests",

          description:
            "Write tests for React components, user interactions, forms, and important UI behavior.",

          whyItMatters:
            "Writing component tests demonstrates professional frontend engineering practices and improves application reliability.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "React component tests",
            "User interaction tests",
            "Form validation tests",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Optimize Frontend Performance",

          description:
            "Learn code splitting, lazy loading, image optimization, caching, bundle analysis, and rendering performance.",

          whyItMatters:
            "Frontend performance directly affects user experience, conversion, accessibility, and perceived application quality.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Explain code splitting",
            "Explain lazy loading",
            "Identify common performance bottlenecks",
            "Explain image optimization",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Audit a Frontend Application",

          description:
            "Analyze an application for accessibility, performance, responsiveness, maintainability, and user experience issues.",

          whyItMatters:
            "Auditing applications develops the ability to identify and solve real-world frontend quality and performance problems.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Frontend audit report",
            "Performance findings",
            "Accessibility findings",
            "Responsive design findings",
            "Recommended improvements",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 7,

      title: "Portfolio and Career Readiness",

      description:
        "Create a professional frontend portfolio, deploy projects, and prepare for frontend developer interviews.",

      estimatedDuration: 8,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Build a Portfolio Website",

          description:
            "Build a responsive portfolio website showcasing your skills, projects, experience, and contact information.",

          whyItMatters:
            "A strong portfolio gives employers concrete evidence of your frontend development skills and project experience.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub repository",
            "Responsive portfolio website",
            "Projects section",
            "Skills section",
            "Experience section",
            "Contact section",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Deploy Your Frontend Projects",

          description:
            "Deploy your portfolio and major frontend projects and configure production environments.",

          whyItMatters:
            "Deployment demonstrates that you can take a frontend application from development to a publicly accessible production environment.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Live deployed application URL",
            "Production build",
            "Working application in a production environment",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Improve Your GitHub Profile",

          description:
            "Organize repositories, improve README files, pin strong projects, and present your development work professionally.",

          whyItMatters:
            "A professional GitHub profile gives recruiters and hiring managers an easy way to evaluate your coding experience.",

          difficulty: "easy",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "GitHub profile URL",
            "Updated profile README",
            "Pinned projects",
            "Improved project README files",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Prepare for Frontend Interviews",

          description:
            "Prepare HTML, CSS, JavaScript, React, browser, accessibility, performance, and frontend architecture interview topics.",

          whyItMatters:
            "Interview preparation helps you communicate your technical knowledge and solve frontend problems during the hiring process.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [
            "Complete frontend interview question set",
            "Practice JavaScript questions",
            "Practice React questions",
            "Practice HTML and CSS questions",
            "Practice frontend system design questions",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare Frontend Project Explanations",

          description:
            "Practice explaining your architecture, component design, state management, API integration, challenges, and technical decisions.",

          whyItMatters:
            "Being able to clearly explain your projects helps demonstrate practical engineering ability during technical and behavioral interviews.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [
            "Project explanation notes",
            "Architecture explanation",
            "Technical decision explanations",
            "Challenges and solutions",
          ],

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },
  ],
};