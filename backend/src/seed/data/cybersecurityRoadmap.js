module.exports = {
  roadmap: {
    title: "Cybersecurity",

    slug: "cybersecurity",

    targetCareer: "Cybersecurity Engineer",

    description:
      "A structured roadmap to become job-ready in cybersecurity by mastering networking, Linux, security fundamentals, system and web security, security tools, vulnerability assessment, incident response, SOC operations, cloud security, and practical security projects.",

    difficulty: "advanced",

    estimatedDuration: 150,

    totalStages: 8,

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

      title: "Networking Fundamentals",

      description:
        "Build a strong networking foundation to understand how systems communicate and where security controls are applied.",

      estimatedDuration: 18,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Learn Computer Networking Fundamentals",

          description:
            "Understand networks, LANs, WANs, IP addresses, MAC addresses, routers, switches, and network communication.",

          whyItMatters:
            "Networking knowledge is fundamental to cybersecurity because security professionals need to understand how systems communicate before they can identify and protect against threats.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn TCP and UDP",

          description:
            "Understand TCP, UDP, ports, sockets, connection establishment, reliability, and common networking use cases.",

          whyItMatters:
            "Understanding transport protocols helps security professionals analyze network traffic, identify exposed services, and investigate suspicious connections.",

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
          title: "Learn DNS and HTTP",

          description:
            "Understand DNS resolution, HTTP requests, HTTPS, headers, status codes, cookies, sessions, and web communication.",

          whyItMatters:
            "DNS and HTTP are critical to understanding web traffic, application security, phishing, malicious domains, and network investigations.",

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
          title: "Learn Network Security Concepts",

          description:
            "Understand firewalls, proxies, VPNs, network segmentation, intrusion detection, and intrusion prevention.",

          whyItMatters:
            "These security controls form the foundation of protecting networks from unauthorized access, malicious traffic, and lateral movement.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Analyze Network Traffic",

          description:
            "Use a packet-analysis tool to inspect network traffic and identify protocols, connections, and suspicious communication patterns.",

          whyItMatters:
            "Traffic analysis is an important practical cybersecurity skill used to investigate incidents, troubleshoot security problems, and detect suspicious communication.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Packet capture or provided traffic sample",
            "Traffic analysis screenshots",
            "Identified protocols and connections",
            "Analysis of suspicious traffic",
            "Investigation summary",
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

      title: "Linux and System Security",

      description:
        "Learn Linux administration and operating-system security concepts needed to protect and investigate systems.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Linux Fundamentals",

          description:
            "Learn the Linux filesystem, users, groups, permissions, processes, services, packages, and system administration.",

          whyItMatters:
            "Linux is widely used in servers, cloud infrastructure, security tooling, and production environments, making Linux administration essential for cybersecurity professionals.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master Linux Security Commands",

          description:
            "Practice permissions, ownership, process inspection, service management, logs, networking commands, and system auditing.",

          whyItMatters:
            "Security analysts frequently use Linux commands to investigate systems, inspect processes, review logs, and identify suspicious activity.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Linux command outputs",
            "Permission and ownership examples",
            "Process inspection results",
            "Log analysis examples",
            "System auditing findings",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Understand Authentication and Authorization",

          description:
            "Learn authentication, authorization, passwords, access control, privilege escalation concepts, and least privilege.",

          whyItMatters:
            "Access control is central to protecting systems and preventing unauthorized users from accessing sensitive resources.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn System Logging",

          description:
            "Understand system logs, authentication logs, application logs, log rotation, and how logs support security investigations.",

          whyItMatters:
            "Logs provide critical evidence for detecting suspicious behavior, investigating incidents, and understanding what happened on a system.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Harden a Linux System",

          description:
            "Apply safe system-hardening practices including account controls, permissions, services, updates, firewall rules, and logging.",

          whyItMatters:
            "System hardening reduces the attack surface and demonstrates your ability to apply practical defensive security controls.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Linux hardening configuration",
            "Account and permission controls",
            "Firewall configuration",
            "Service configuration",
            "Logging configuration",
            "GitHub repository or documentation",
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

      title: "Cybersecurity Fundamentals",

      description:
        "Understand the core principles, threats, vulnerabilities, security controls, and risk concepts used throughout cybersecurity.",

      estimatedDuration: 16,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn the CIA Triad",

          description:
            "Understand confidentiality, integrity, availability, and how these principles guide security decisions.",

          whyItMatters:
            "The CIA triad provides the foundation for evaluating security requirements and understanding the goals of cybersecurity controls.",

          difficulty: "easy",

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
          title: "Understand Threats and Vulnerabilities",

          description:
            "Learn the difference between threats, vulnerabilities, exploits, risks, attack surfaces, and security controls.",

          whyItMatters:
            "Being able to distinguish threats, vulnerabilities, and risks is essential for performing meaningful security assessments.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Common Cyber Attacks",

          description:
            "Understand phishing, credential attacks, malware, denial-of-service, social engineering, and other common attack categories.",

          whyItMatters:
            "Understanding common attack patterns helps security professionals recognize threats and select appropriate defensive controls.",

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
          title: "Learn Cryptography Fundamentals",

          description:
            "Understand hashing, encryption, symmetric and asymmetric cryptography, digital signatures, certificates, and key management.",

          whyItMatters:
            "Cryptography protects sensitive information, identities, communications, and data integrity across modern systems.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Perform a Security Risk Assessment",

          description:
            "Analyze a fictional organization's assets, threats, vulnerabilities, risks, and recommended security controls.",

          whyItMatters:
            "Risk assessment teaches you to translate technical security findings into business risks and practical security recommendations.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Asset inventory",
            "Threat analysis",
            "Vulnerability assessment",
            "Risk ratings",
            "Recommended security controls",
            "Final risk assessment report",
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

      title: "Web and Application Security",

      description:
        "Learn how modern web applications are secured and understand common application security vulnerabilities.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Web Application Architecture",

          description:
            "Understand browsers, clients, servers, APIs, databases, authentication flows, sessions, and application trust boundaries.",

          whyItMatters:
            "Understanding application architecture makes it easier to identify where security vulnerabilities can occur and how systems should be protected.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Study OWASP Web Security Risks",

          description:
            "Learn major web application security risks including injection, broken access control, authentication failures, and insecure design.",

          whyItMatters:
            "OWASP security risks represent common classes of vulnerabilities that application security professionals must recognize and mitigate.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Secure Authentication",

          description:
            "Understand password security, sessions, tokens, MFA, authorization, account recovery, and common authentication weaknesses.",

          whyItMatters:
            "Authentication weaknesses are a common source of security incidents, so secure identity management is a critical application security skill.",

          difficulty: "hard",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn API Security",

          description:
            "Understand API authentication, authorization, input validation, rate limiting, secrets, and secure API design.",

          whyItMatters:
            "Modern applications heavily depend on APIs, making API security essential for protecting data and backend functionality.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Secure API implementation",
            "Authentication controls",
            "Authorization controls",
            "Input validation",
            "Rate limiting",
            "Secrets management",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Perform a Web Application Security Assessment",

          description:
            "Assess an intentionally vulnerable training application in an authorized environment and document identified security weaknesses and mitigations.",

          whyItMatters:
            "A practical security assessment demonstrates your ability to identify, document, prioritize, and recommend remediation for application vulnerabilities.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Authorized training environment details",
            "Security assessment findings",
            "Vulnerability descriptions",
            "Risk or severity ratings",
            "Evidence screenshots",
            "Recommended mitigations",
            "Final security assessment report",
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

      title: "Security Tools and Vulnerability Assessment",

      description:
        "Learn defensive security tools and vulnerability assessment techniques used to identify and prioritize security weaknesses.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Security Scanning Concepts",

          description:
            "Understand vulnerability scanners, port discovery, service identification, asset inventories, and security assessment workflows.",

          whyItMatters:
            "Security scanning helps organizations discover exposed services and potential weaknesses before attackers can exploit them.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Vulnerability Management",

          description:
            "Understand CVEs, severity ratings, vulnerability prioritization, remediation, verification, and reporting.",

          whyItMatters:
            "Security teams need to prioritize vulnerabilities based on risk and ensure that remediation is tracked and verified.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Perform an Authorized Vulnerability Scan",

          description:
            "Run a vulnerability assessment against a deliberately provided training environment and interpret the results.",

          whyItMatters:
            "Practical vulnerability assessment experience demonstrates that you can use security tools responsibly and turn scan results into actionable findings.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Authorized training target",
            "Scan configuration",
            "Vulnerability scan results",
            "Prioritized findings",
            "Recommended remediation",
            "Assessment report",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Security Information and Event Management",

          description:
            "Understand SIEM concepts, centralized logging, event correlation, alerting, dashboards, and security monitoring.",

          whyItMatters:
            "SIEM platforms are commonly used by SOC teams to centralize security events and identify suspicious activity.",

          difficulty: "hard",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Create a Security Monitoring Dashboard",

          description:
            "Build a dashboard that visualizes security events, authentication activity, alerts, and suspicious behavior from sample logs.",

          whyItMatters:
            "Security dashboards help analysts identify trends, investigate suspicious activity, and communicate security events clearly.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Working security dashboard",
            "Security event visualizations",
            "Authentication activity",
            "Alert visualization",
            "Suspicious activity analysis",
            "Live or hosted dashboard link",
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

      title: "SOC and Incident Response",

      description:
        "Learn how security operations teams detect, investigate, contain, and recover from security incidents.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand SOC Operations",

          description:
            "Learn the role of a Security Operations Center, analyst responsibilities, alert triage, escalation, and security monitoring workflows.",

          whyItMatters:
            "SOC operations provide practical experience with the workflows used to continuously monitor and defend organizational environments.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Incident Response",

          description:
            "Understand preparation, detection, analysis, containment, eradication, recovery, and lessons learned.",

          whyItMatters:
            "Incident response skills are essential for minimizing damage and restoring systems after security incidents.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Digital Forensics Fundamentals",

          description:
            "Understand evidence collection, file metadata, system artifacts, timelines, and basic forensic investigation principles.",

          whyItMatters:
            "Forensic knowledge helps analysts preserve and interpret evidence when investigating security incidents.",

          difficulty: "hard",

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
          title: "Investigate a Security Incident",

          description:
            "Analyze provided logs and security evidence from a simulated incident, identify the likely timeline, and document findings.",

          whyItMatters:
            "Incident investigation demonstrates your ability to turn raw security evidence into a defensible incident timeline and conclusion.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Provided incident evidence",
            "Log analysis",
            "Incident timeline",
            "Indicators of compromise",
            "Root-cause analysis",
            "Investigation report",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Write an Incident Response Report",

          description:
            "Document incident findings, affected systems, indicators, timeline, containment actions, recovery steps, and recommendations.",

          whyItMatters:
            "Clear incident reporting allows organizations to understand what happened, respond effectively, and prevent similar incidents in the future.",

          difficulty: "hard",

          type: "assignment",

          priority: "medium",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Incident summary",
            "Affected systems",
            "Timeline",
            "Indicators",
            "Containment actions",
            "Recovery actions",
            "Security recommendations",
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

      title: "Cloud and Infrastructure Security",

      description:
        "Learn how to secure cloud infrastructure, identities, applications, networks, and data.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Cloud Security Fundamentals",

          description:
            "Understand shared responsibility, cloud attack surfaces, identity management, network security, and secure cloud architecture.",

          whyItMatters:
            "Cloud environments introduce new security responsibilities and attack surfaces that modern cybersecurity professionals must understand.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 95,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Cloud Identity and Access Management",

          description:
            "Understand roles, policies, permissions, least privilege, service identities, and credential security.",

          whyItMatters:
            "Identity and access management is one of the most important security controls in cloud environments.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Container Security",

          description:
            "Understand secure container images, secrets, permissions, vulnerabilities, runtime isolation, and container security practices.",

          whyItMatters:
            "Containers are widely used in modern infrastructure, and understanding their security helps prevent compromised images, exposed secrets, and excessive privileges.",

          difficulty: "hard",

          type: "article",

          priority: "medium",

          estimatedTime: 100,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Secure a Cloud Application",

          description:
            "Apply identity, network, secret-management, logging, and access-control practices to a cloud-hosted application.",

          whyItMatters:
            "Applying cloud security controls to a real application demonstrates practical cloud security engineering ability.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Cloud architecture",
            "IAM configuration",
            "Network security configuration",
            "Secrets management",
            "Logging configuration",
            "Access-control configuration",
            "GitHub repository or documentation",
          ],

          missionOrder: 4,

          isRequired: true,
        },
      ],
    },

    // ============================================================
    // STAGE 8
    // ============================================================

    {
      stageOrder: 8,

      title: "Cybersecurity Capstone and Career Readiness",

      description:
        "Combine cybersecurity knowledge into a practical security project and prepare for cybersecurity roles.",

      estimatedDuration: 22,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Design a Secure Application Architecture",

          description:
            "Design a secure architecture covering authentication, authorization, network security, data protection, logging, monitoring, and incident response.",

          whyItMatters:
            "Security architecture demonstrates your ability to think about security across an entire system instead of focusing on individual vulnerabilities.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Architecture diagram",
            "Authentication design",
            "Authorization design",
            "Network security controls",
            "Data protection strategy",
            "Logging and monitoring strategy",
            "Incident response strategy",
          ],

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Build a Security Monitoring System",

          description:
            "Create a practical security monitoring project that collects events, identifies suspicious activity, and produces useful security alerts.",

          whyItMatters:
            "Building a monitoring system demonstrates practical defensive security skills and provides strong portfolio evidence for SOC and security engineering roles.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 240,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Security monitoring application",
            "Event collection",
            "Detection rules",
            "Security alerts",
            "Monitoring dashboard",
            "GitHub repository",
          ],

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Complete a Cybersecurity Capstone",

          description:
            "Complete an end-to-end authorized security project covering assessment, detection, analysis, remediation, and security documentation.",

          whyItMatters:
            "A capstone demonstrates that you can combine networking, systems, application security, monitoring, incident response, and risk management into one practical project.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 300,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Complete cybersecurity project",
            "Security assessment",
            "Detection or monitoring component",
            "Security findings",
            "Remediation plan",
            "Technical documentation",
            "GitHub repository",
          ],

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Build a Cybersecurity Portfolio",

          description:
            "Create a professional portfolio showcasing security assessments, monitoring projects, incident reports, secure applications, and technical documentation.",

          whyItMatters:
            "A strong security portfolio gives recruiters and hiring managers tangible evidence of your practical cybersecurity skills.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Portfolio website",
            "Security projects",
            "Security assessment reports",
            "Incident response report",
            "Monitoring project",
            "Technical documentation",
            "Public portfolio URL",
          ],

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare for Cybersecurity Interviews",

          description:
            "Prepare networking, Linux, security fundamentals, web security, SOC, incident response, cloud security, and security scenario interview topics.",

          whyItMatters:
            "Interview preparation helps you communicate your technical knowledge and practical experience effectively during cybersecurity hiring processes.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 150,

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