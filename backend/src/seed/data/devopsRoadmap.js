module.exports = {
  roadmap: {
    title: "DevOps Engineer",

    slug: "devops-engineer",

    targetCareer: "DevOps Engineer",

    description:
      "A structured roadmap to become a job-ready DevOps Engineer by mastering Linux, networking, Git, scripting, CI/CD, containers, Docker, Kubernetes, cloud infrastructure, infrastructure as code, monitoring, security, and production deployment practices.",

    difficulty: "advanced",

    estimatedDuration: 145,

    totalStages: 8,

    isActive: true,

    version: 1,

    createdBy: "admin",
  },

  stages: [
    {
      stageOrder: 1,

      title: "Linux and Networking Fundamentals",

      description:
        "Build the operating system and networking foundation required to manage and troubleshoot production infrastructure.",

      estimatedDuration: 18,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Learn Linux Fundamentals",

          description:
            "Learn the Linux filesystem, processes, users, permissions, packages, services, and essential system commands.",

          type: "article",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Linux is the foundation of most modern servers and cloud infrastructure. Strong Linux skills are essential for operating, troubleshooting, and securing production systems.",

          difficulty: "easy",
          careerImpact: 85,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Master the Linux Command Line",

          description:
            "Practice shell commands, pipes, redirection, grep, find, sed, awk, permissions, and process management.",

          type: "assignment",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "DevOps engineers frequently diagnose and manage systems through the command line. Command-line proficiency makes infrastructure troubleshooting significantly faster.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: true,
          proofType: "text",
          evidenceRequired: [
            "Completed Linux command-line exercises",
            "Examples of shell commands used",
          ],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Learn Bash Scripting",

          description:
            "Write Bash scripts to automate repetitive system administration and deployment tasks.",

          type: "project",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Automation is a core DevOps principle. Bash scripting allows engineers to automate system administration, deployment, maintenance, and troubleshooting tasks.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Bash automation script",
            "GitHub repository",
            "README explaining the automation",
          ],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Learn Networking Fundamentals",

          description:
            "Understand IP addresses, DNS, ports, TCP, UDP, HTTP, HTTPS, routing, firewalls, and network troubleshooting.",

          type: "video",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Production applications depend on reliable networking. Understanding networking helps DevOps engineers diagnose connectivity, DNS, routing, and service communication problems.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Troubleshoot a Linux Server",

          description:
            "Diagnose common server problems involving processes, disk space, memory, networking, permissions, and services.",

          type: "project",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Real DevOps work involves diagnosing production incidents. Troubleshooting skills demonstrate that you can identify and resolve infrastructure failures.",

          difficulty: "hard",
          careerImpact: 95,

          proofRequired: true,
          proofType: "file",
          evidenceRequired: [
            "Troubleshooting report",
            "Root-cause analysis",
            "Commands and diagnostic steps",
            "Final resolution",
          ],

          missionOrder: 5,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 2,

      title: "Git and Automation Fundamentals",

      description:
        "Learn version control, collaboration workflows, scripting, and automation practices used in DevOps environments.",

      estimatedDuration: 14,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Master Git Fundamentals",

          description:
            "Learn commits, branches, merging, rebasing, remotes, tags, and resolving merge conflicts.",

          type: "article",
          priority: "high",
          estimatedTime: 90,

          whyItMatters:
            "Git is the foundation of modern software collaboration and CI/CD workflows. DevOps engineers use Git to manage application and infrastructure code.",

          difficulty: "easy",
          careerImpact: 85,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Learn GitHub Workflows",

          description:
            "Practice pull requests, code reviews, issues, branch protection, repository organization, and collaborative workflows.",

          type: "assignment",
          priority: "high",
          estimatedTime: 90,

          whyItMatters:
            "Professional DevOps teams rely on collaborative Git workflows to review code, manage changes, and control production deployments.",

          difficulty: "medium",
          careerImpact: 85,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "GitHub repository",
            "Pull request",
            "Branching workflow",
            "Repository documentation",
          ],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Learn Python for Automation",

          description:
            "Use Python scripts to automate file operations, API calls, system tasks, and infrastructure workflows.",

          type: "video",
          priority: "medium",
          estimatedTime: 120,

          whyItMatters:
            "Python is widely used for infrastructure automation, API integration, cloud tooling, and operational scripts.",

          difficulty: "medium",
          careerImpact: 80,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Build a DevOps Automation Script",

          description:
            "Create an automation script that performs a practical infrastructure or deployment task.",

          type: "project",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Building automation demonstrates that you can replace repetitive manual infrastructure tasks with reliable, repeatable processes.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Automation script",
            "GitHub repository",
            "README",
            "Example execution",
          ],

          missionOrder: 4,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 3,

      title: "CI/CD and Build Automation",

      description:
        "Learn how continuous integration and continuous delivery automate software testing, building, and deployment.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand CI/CD",

          description:
            "Learn continuous integration, continuous delivery, continuous deployment, pipelines, artifacts, and deployment strategies.",

          type: "article",
          priority: "high",
          estimatedTime: 90,

          whyItMatters:
            "CI/CD allows teams to deliver software reliably and repeatedly while reducing manual deployment errors.",

          difficulty: "easy",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Create a GitHub Actions Pipeline",

          description:
            "Create a CI pipeline that installs dependencies, runs tests, and validates code whenever changes are pushed.",

          type: "project",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "CI pipelines are fundamental to modern development teams and demonstrate your ability to automate software validation.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "GitHub Actions workflow",
            "Successful pipeline run",
            "Automated tests",
            "README documentation",
          ],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Learn Build and Artifact Management",

          description:
            "Understand build artifacts, dependency management, versioning, caching, and reproducible builds.",

          type: "video",
          priority: "medium",
          estimatedTime: 90,

          whyItMatters:
            "Reliable artifact management ensures that the exact software version tested is the one deployed to production.",

          difficulty: "medium",
          careerImpact: 80,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Build a Continuous Deployment Pipeline",

          description:
            "Create a pipeline that automatically deploys an application after successful tests and builds.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "Continuous deployment demonstrates your ability to connect code changes, automated validation, and production delivery into one reliable workflow.",

          difficulty: "hard",
          careerImpact: 95,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "CI/CD workflow",
            "Deployment configuration",
            "Successful deployment",
            "Rollback strategy",
          ],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Learn Deployment Strategies",

          description:
            "Understand rolling deployments, blue-green deployments, canary releases, rollback strategies, and zero-downtime deployment concepts.",

          type: "article",
          priority: "medium",
          estimatedTime: 90,

          whyItMatters:
            "Deployment strategies help teams release software safely while minimizing downtime and reducing production risk.",

          difficulty: "medium",
          careerImpact: 85,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 5,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 4,

      title: "Containers and Docker",

      description:
        "Learn containerization and Docker to package, run, and distribute applications consistently across environments.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand Containerization",

          description:
            "Learn containers, images, registries, isolation, portability, and the difference between containers and virtual machines.",

          type: "article",
          priority: "high",
          estimatedTime: 90,

          whyItMatters:
            "Containers provide consistent application environments and are a fundamental building block of modern DevOps and cloud platforms.",

          difficulty: "easy",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Learn Docker Fundamentals",

          description:
            "Learn Docker images, containers, volumes, networks, Dockerfiles, and essential Docker commands.",

          type: "video",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Docker is one of the most widely used technologies for packaging and running applications consistently across development and production environments.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Containerize an Application",

          description:
            "Create a Dockerfile and containerize a backend application with appropriate configuration and environment variables.",

          type: "project",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Containerizing an application demonstrates practical Docker skills and prepares you for CI/CD and cloud deployment workflows.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Dockerfile",
            "Containerized application",
            "Environment configuration",
            "README documentation",
          ],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Learn Docker Compose",

          description:
            "Use Docker Compose to run multi-container applications containing services such as an API, database, and supporting infrastructure.",

          type: "assignment",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Docker Compose teaches you how multiple services communicate and provides practical experience with local multi-service environments.",

          difficulty: "medium",
          careerImpact: 85,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "docker-compose.yml",
            "Multiple running services",
            "Service configuration",
            "README documentation",
          ],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Build a Multi-Container Application",

          description:
            "Create a complete multi-container environment with an application service and database connected through Docker networking.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "Multi-container projects demonstrate that you understand service communication, networking, configuration, and containerized application architecture.",

          difficulty: "hard",
          careerImpact: 95,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Docker configuration",
            "Multiple containers",
            "Application and database integration",
            "README architecture documentation",
          ],

          missionOrder: 5,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 5,

      title: "Cloud Infrastructure",

      description:
        "Learn cloud computing fundamentals and deploy applications using core cloud infrastructure services.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Cloud Computing Fundamentals",

          description:
            "Understand IaaS, PaaS, SaaS, regions, availability zones, scalability, elasticity, and cloud architecture fundamentals.",

          type: "article",
          priority: "high",
          estimatedTime: 90,

          whyItMatters:
            "Most modern production infrastructure runs in the cloud. Understanding cloud architecture is essential for designing scalable and reliable systems.",

          difficulty: "easy",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Learn AWS Core Services",

          description:
            "Learn the fundamentals of compute, storage, networking, identity, databases, and monitoring using a major cloud provider.",

          type: "video",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Cloud platforms such as AWS provide the infrastructure services used by organizations to deploy and operate production applications.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Deploy an Application to the Cloud",

          description:
            "Deploy a containerized application to cloud infrastructure and configure networking, environment variables, and access.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "A real cloud deployment proves that you can move beyond local development and operate applications on production-like infrastructure.",

          difficulty: "hard",
          careerImpact: 100,

          proofRequired: true,
          proofType: "link",
          evidenceRequired: [
            "Live deployment URL",
            "Cloud deployment configuration",
            "Architecture description",
          ],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Learn Cloud Security Basics",

          description:
            "Understand IAM, least privilege, security groups, secrets, credentials, encryption, and secure cloud configurations.",

          type: "article",
          priority: "high",
          estimatedTime: 100,

          whyItMatters:
            "Poor cloud security can expose entire systems and sensitive data. DevOps engineers must understand secure infrastructure practices.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Design a Basic Cloud Architecture",

          description:
            "Design a scalable cloud architecture for a web application including compute, networking, database, storage, and monitoring components.",

          type: "assignment",
          priority: "medium",
          estimatedTime: 120,

          whyItMatters:
            "Architecture design demonstrates that you understand how individual cloud services work together to form a reliable application platform.",

          difficulty: "hard",
          careerImpact: 90,

          proofRequired: true,
          proofType: "file",
          evidenceRequired: [
            "Cloud architecture diagram",
            "Component explanations",
            "Security considerations",
            "Scalability considerations",
          ],

          missionOrder: 5,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 6,

      title: "Kubernetes and Container Orchestration",

      description:
        "Learn Kubernetes fundamentals and understand how production containerized applications are deployed and managed.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand Kubernetes Architecture",

          description:
            "Learn clusters, nodes, pods, deployments, services, namespaces, controllers, and Kubernetes architecture.",

          type: "article",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Kubernetes is widely used to orchestrate containerized workloads at scale and is a major skill for modern DevOps engineers.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Deploy an Application to Kubernetes",

          description:
            "Create Kubernetes manifests and deploy a containerized application using pods, deployments, and services.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "Deploying applications to Kubernetes demonstrates practical container orchestration skills required in many production environments.",

          difficulty: "hard",
          careerImpact: 100,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Kubernetes manifests",
            "Deployment configuration",
            "Service configuration",
            "README documentation",
          ],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Learn Kubernetes Configuration",

          description:
            "Work with ConfigMaps, Secrets, environment variables, volumes, and resource configurations.",

          type: "assignment",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Proper configuration and secret management are essential for running secure and maintainable Kubernetes applications.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "ConfigMap configuration",
            "Secret configuration",
            "Volume configuration",
            "Resource configuration",
          ],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Learn Kubernetes Scaling and Updates",

          description:
            "Understand replicas, rolling updates, scaling, health checks, and basic self-healing behavior.",

          type: "video",
          priority: "medium",
          estimatedTime: 100,

          whyItMatters:
            "Scaling and safe updates are essential for maintaining availability while applications change and traffic fluctuates.",

          difficulty: "medium",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Deploy a Production-Like Kubernetes Application",

          description:
            "Deploy a multi-component application to Kubernetes and configure networking, scaling, configuration, and persistent storage.",

          type: "project",
          priority: "high",
          estimatedTime: 240,

          whyItMatters:
            "A production-like Kubernetes deployment demonstrates your ability to combine orchestration, networking, configuration, scaling, and storage into one system.",

          difficulty: "hard",
          careerImpact: 100,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Kubernetes manifests",
            "Multi-component deployment",
            "Scaling configuration",
            "Persistent storage configuration",
            "Architecture documentation",
          ],

          missionOrder: 5,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 7,

      title: "Infrastructure as Code and Monitoring",

      description:
        "Learn infrastructure automation, observability, logging, metrics, alerts, and infrastructure management practices.",

      estimatedDuration: 17,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand Infrastructure as Code",

          description:
            "Learn why infrastructure should be defined, versioned, reviewed, and reproduced through code.",

          type: "article",
          priority: "high",
          estimatedTime: 75,

          whyItMatters:
            "Infrastructure as Code makes infrastructure repeatable, version-controlled, reviewable, and easier to maintain.",

          difficulty: "easy",
          careerImpact: 90,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Learn Terraform Fundamentals",

          description:
            "Create infrastructure using Terraform resources, variables, outputs, state, providers, and reusable configurations.",

          type: "video",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Terraform is widely used to automate cloud infrastructure and allows teams to manage infrastructure through version-controlled code.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Automate Cloud Infrastructure with Terraform",

          description:
            "Provision a basic cloud environment using Terraform and manage the infrastructure through version-controlled configuration.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "Provisioning real infrastructure with Terraform demonstrates practical Infrastructure as Code skills and cloud automation ability.",

          difficulty: "hard",
          careerImpact: 100,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Terraform configuration",
            "Infrastructure deployment",
            "Variables and outputs",
            "README documentation",
          ],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Learn Monitoring and Observability",

          description:
            "Understand metrics, logs, traces, dashboards, alerts, uptime, latency, errors, and service health.",

          type: "article",
          priority: "high",
          estimatedTime: 100,

          whyItMatters:
            "Observability allows DevOps engineers to understand system health, detect incidents, diagnose failures, and maintain reliability.",

          difficulty: "medium",
          careerImpact: 95,

          proofRequired: false,
          evidenceRequired: [],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Build a Monitoring Dashboard",

          description:
            "Monitor an application or infrastructure environment and configure useful metrics, dashboards, and alerts.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "A monitoring dashboard demonstrates your ability to turn infrastructure and application telemetry into actionable operational information.",

          difficulty: "hard",
          careerImpact: 95,

          proofRequired: true,
          proofType: "link",
          evidenceRequired: [
            "Monitoring dashboard URL",
            "Configured metrics",
            "Configured alerts",
            "Monitoring documentation",
          ],

          missionOrder: 5,
          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 8,

      title: "DevOps Capstone and Career Readiness",

      description:
        "Combine DevOps skills into a production-style system and prepare for DevOps engineering roles.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Design a Production CI/CD Architecture",

          description:
            "Design a complete CI/CD workflow covering source control, testing, building, containers, deployment, rollback, and monitoring.",

          type: "assignment",
          priority: "high",
          estimatedTime: 120,

          whyItMatters:
            "Architecture design demonstrates whether you can connect individual DevOps technologies into a reliable production delivery system.",

          difficulty: "hard",
          careerImpact: 95,

          proofRequired: true,
          proofType: "file",
          evidenceRequired: [
            "CI/CD architecture diagram",
            "Pipeline explanation",
            "Deployment strategy",
            "Rollback strategy",
            "Monitoring strategy",
          ],

          missionOrder: 1,
          isRequired: true,
        },

        {
          title: "Build an Automated Infrastructure Pipeline",

          description:
            "Create a pipeline that builds an application, creates a container image, provisions infrastructure, and deploys the application.",

          type: "project",
          priority: "high",
          estimatedTime: 300,

          whyItMatters:
            "This project combines CI/CD, containers, cloud infrastructure, Infrastructure as Code, and deployment into one production-style workflow.",

          difficulty: "hard",
          careerImpact: 100,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "CI/CD pipeline",
            "Docker configuration",
            "Terraform configuration",
            "Deployment configuration",
            "Architecture documentation",
          ],

          missionOrder: 2,
          isRequired: true,
        },

        {
          title: "Implement Production Monitoring",

          description:
            "Add application and infrastructure monitoring, logging, dashboards, alerts, and basic incident investigation.",

          type: "project",
          priority: "high",
          estimatedTime: 180,

          whyItMatters:
            "Production systems require continuous monitoring to detect failures, performance problems, and reliability issues.",

          difficulty: "hard",
          careerImpact: 95,

          proofRequired: true,
          proofType: "link",
          evidenceRequired: [
            "Monitoring dashboard",
            "Application logs",
            "Infrastructure metrics",
            "Alerts",
            "Incident investigation report",
          ],

          missionOrder: 3,
          isRequired: true,
        },

        {
          title: "Document the DevOps Architecture",

          description:
            "Document infrastructure, CI/CD workflows, deployment processes, security considerations, monitoring, and rollback procedures.",

          type: "assignment",
          priority: "medium",
          estimatedTime: 90,

          whyItMatters:
            "Professional DevOps engineers must communicate infrastructure decisions clearly so systems can be maintained and operated by teams.",

          difficulty: "medium",
          careerImpact: 80,

          proofRequired: true,
          proofType: "github",
          evidenceRequired: [
            "Architecture documentation",
            "Deployment documentation",
            "Security documentation",
            "Monitoring documentation",
            "Rollback procedure",
          ],

          missionOrder: 4,
          isRequired: true,
        },

        {
          title: "Prepare for DevOps Interviews",

          description:
            "Prepare Linux, networking, Git, CI/CD, Docker, Kubernetes, cloud, Terraform, monitoring, troubleshooting, and DevOps scenario questions.",

          type: "assignment",
          priority: "high",
          estimatedTime: 150,

          whyItMatters:
            "Interview preparation helps you demonstrate both technical knowledge and practical problem-solving skills when applying for DevOps roles.",

          difficulty: "hard",
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