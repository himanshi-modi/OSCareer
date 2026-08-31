const createMission = ({
  title,
  description,
  type,
  priority,
  estimatedTime,
  proofRequired = false,
  proofType = null,
  missionOrder,
  isRequired = true,

  difficulty = "medium",
  careerImpact = 70,
  whyItMatters,
  evidenceRequired = [],
}) => ({
  title,
  description,
  whyItMatters,
  difficulty,
  type,
  priority,
  estimatedTime,
  careerImpact,
  proofRequired,
  proofType,
  evidenceRequired,
  missionOrder,
  isRequired,
});

module.exports = {
  roadmap: {
    title: "Data Analyst",

    slug: "data-analyst",

    targetCareer: "Data Analyst",

    description:
      "A structured roadmap to become a job-ready Data Analyst by mastering spreadsheets, SQL, statistics, Python, data cleaning, exploratory analysis, visualization, dashboards, business problem solving, and data-driven communication.",

    difficulty: "beginner",

    estimatedDuration: 110,

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

      title: "Data and Spreadsheet Fundamentals",

      description:
        "Build a strong foundation in data concepts, spreadsheets, data organization, formulas, and basic analytical thinking.",

      estimatedDuration: 14,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        createMission({
          title: "Understand the Data Analyst Role",

          description:
            "Learn how Data Analysts collect, clean, analyze, visualize, and communicate data to support business decisions.",

          whyItMatters:
            "Understanding the Data Analyst role gives you a clear picture of how analytical work creates business value and helps you understand what employers expect from an analyst.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 60,

          careerImpact: 65,

          proofRequired: false,

          evidenceRequired: [
            "Write down the main responsibilities of a Data Analyst.",
            "Identify three ways data analysis supports business decisions.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Learn Spreadsheet Fundamentals",

          description:
            "Learn spreadsheet structure, cell references, formatting, sorting, filtering, tables, and basic data organization.",

          whyItMatters:
            "Spreadsheets remain one of the most commonly used tools for business analysis, making spreadsheet fundamentals an important entry-level skill.",

          difficulty: "easy",

          type: "video",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 70,

          proofRequired: false,

          evidenceRequired: [
            "Create a structured dataset in a spreadsheet.",
            "Apply sorting and filtering.",
            "Use cell references correctly.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Master Spreadsheet Formulas",

          description:
            "Practice IF, SUMIF, COUNTIF, XLOOKUP or VLOOKUP, INDEX, MATCH, text functions, and date functions.",

          whyItMatters:
            "Strong spreadsheet formulas allow analysts to transform raw business data into useful metrics without relying entirely on programming tools.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 80,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Submit a spreadsheet demonstrating lookup formulas.",
            "Use conditional aggregation formulas.",
            "Use text and date functions.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Learn Pivot Tables",

          description:
            "Use pivot tables and pivot charts to summarize large datasets and identify important patterns.",

          whyItMatters:
            "Pivot tables allow analysts to quickly summarize large datasets and discover trends without writing complex code.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Create at least two pivot tables.",
            "Create a pivot chart.",
            "Summarize at least three business metrics.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),

        createMission({
          title: "Analyze a Business Dataset",

          description:
            "Use a spreadsheet dataset to calculate key metrics, identify trends, and present basic findings.",

          whyItMatters:
            "Applying spreadsheet skills to a realistic dataset builds the practical analytical thinking expected from entry-level Data Analysts.",

          difficulty: "medium",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Submit the completed spreadsheet.",
            "Include calculated KPIs.",
            "Document at least three findings.",
            "Include at least one visualization.",
          ],

          missionOrder: 5,

          isRequired: true,
        }),
      ],
    },

    // ============================================================
    // STAGE 2
    // ============================================================

    {
      stageOrder: 2,

      title: "SQL for Data Analysis",

      description:
        "Learn SQL and use relational databases to retrieve, transform, aggregate, and analyze data.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        createMission({
          title: "Learn SQL Fundamentals",

          description:
            "Learn SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, aliases, and basic SQL queries.",

          whyItMatters:
            "SQL is one of the most important skills for Data Analysts because much of the data used by companies is stored in relational databases.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Write basic SELECT queries.",
            "Use filtering and sorting.",
            "Retrieve unique values from a dataset.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Master SQL Aggregations",

          description:
            "Practice COUNT, SUM, AVG, MIN, MAX, GROUP BY, and HAVING to calculate analytical metrics.",

          whyItMatters:
            "Aggregation is essential for turning thousands or millions of database records into meaningful business metrics.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Write aggregation queries.",
            "Use GROUP BY correctly.",
            "Use HAVING to filter aggregated results.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Master SQL Joins",

          description:
            "Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, and multi-table analysis using relational data.",

          whyItMatters:
            "Real business data is commonly distributed across multiple tables, so analysts must be able to combine related datasets correctly.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 95,

          proofRequired: true,

          proofType: "text",

          evidenceRequired: [
            "Demonstrate INNER JOIN.",
            "Demonstrate LEFT JOIN.",
            "Solve a multi-table analytical problem.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Learn Subqueries and CTEs",

          description:
            "Use subqueries and common table expressions to organize and solve more complex analytical queries.",

          whyItMatters:
            "Subqueries and CTEs help analysts structure complex analytical logic and write SQL that is easier to understand and maintain.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Write at least one subquery.",
            "Write at least one CTE.",
            "Solve a multi-step analytical query.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),

        createMission({
          title: "Analyze a Relational Dataset with SQL",

          description:
            "Answer business questions using SQL queries involving joins, aggregations, filtering, and CTEs.",

          whyItMatters:
            "A realistic SQL analysis demonstrates that you can move beyond syntax and use databases to answer actual business questions.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Submit SQL queries.",
            "Include joins and aggregations.",
            "Include at least one CTE.",
            "Document business insights.",
          ],

          missionOrder: 5,

          isRequired: true,
        }),
      ],
    },

    // ============================================================
    // STAGE 3
    // ============================================================

    {
      stageOrder: 3,

      title: "Statistics for Data Analysis",

      description:
        "Learn the statistics needed to understand datasets, distributions, relationships, and analytical results.",

      estimatedDuration: 15,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        createMission({
          title: "Learn Descriptive Statistics",

          description:
            "Understand mean, median, mode, range, variance, standard deviation, percentiles, and quartiles.",

          whyItMatters:
            "Descriptive statistics provide the foundation for understanding what a dataset looks like and identifying important characteristics.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Calculate mean and median.",
            "Calculate standard deviation.",
            "Calculate quartiles and percentiles.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Understand Data Distributions",

          description:
            "Learn normal distributions, skewness, outliers, frequency distributions, and how distributions affect analysis.",

          whyItMatters:
            "Understanding distributions helps analysts detect unusual values, select appropriate analytical methods, and interpret datasets correctly.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 90,

          careerImpact: 80,

          proofRequired: false,

          evidenceRequired: [
            "Identify the distribution of a dataset.",
            "Identify skewness.",
            "Identify potential outliers.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Learn Correlation",

          description:
            "Understand correlation, covariance, positive and negative relationships, and the difference between correlation and causation.",

          whyItMatters:
            "Correlation helps analysts identify relationships between variables while avoiding incorrect conclusions about causation.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 80,

          proofRequired: false,

          evidenceRequired: [
            "Calculate correlation.",
            "Interpret positive and negative relationships.",
            "Explain correlation versus causation.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Learn Basic Hypothesis Testing",

          description:
            "Understand hypotheses, significance levels, p-values, confidence intervals, and basic statistical testing.",

          whyItMatters:
            "Hypothesis testing allows analysts to evaluate whether observed differences or relationships are statistically meaningful.",

          difficulty: "hard",

          type: "video",

          priority: "medium",

          estimatedTime: 120,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Define a null hypothesis.",
            "Interpret a p-value.",
            "Explain a confidence interval.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),

        createMission({
          title: "Perform Statistical Analysis",

          description:
            "Analyze a dataset using descriptive statistics, distributions, outliers, correlation, and appropriate statistical measures.",

          whyItMatters:
            "A practical statistics project proves that you can apply statistical concepts rather than simply memorize definitions.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Submit the statistical analysis.",
            "Include descriptive statistics.",
            "Analyze distributions and outliers.",
            "Include correlation analysis.",
            "Document conclusions.",
          ],

          missionOrder: 5,

          isRequired: true,
        }),
      ],
    },

    // ============================================================
    // STAGE 4
    // ============================================================

    {
      stageOrder: 4,

      title: "Python for Data Analysis",

      description:
        "Learn Python and the core data-analysis libraries used to clean, explore, transform, and analyze datasets.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        createMission({
          title: "Learn Python Fundamentals",

          description:
            "Learn Python variables, collections, functions, loops, conditions, modules, and basic programming concepts.",

          whyItMatters:
            "Python enables analysts to automate repetitive work and perform analysis that is difficult to manage with spreadsheets alone.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Write Python variables and collections.",
            "Create functions.",
            "Use loops and conditional logic.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Learn NumPy",

          description:
            "Learn arrays, numerical operations, indexing, aggregation, and vectorized operations with NumPy.",

          whyItMatters:
            "NumPy provides the numerical foundation used by many Python data-analysis and scientific-computing libraries.",

          difficulty: "medium",

          type: "video",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 70,

          proofRequired: false,

          evidenceRequired: [
            "Create NumPy arrays.",
            "Perform vectorized operations.",
            "Perform numerical aggregation.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Learn Pandas",

          description:
            "Work with DataFrames, Series, filtering, grouping, merging, sorting, and data transformation using Pandas.",

          whyItMatters:
            "Pandas is one of the most important Python libraries for practical data cleaning, transformation, and analysis.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create and manipulate DataFrames.",
            "Filter and sort data.",
            "Group and aggregate data.",
            "Merge datasets.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Clean Data with Pandas",

          description:
            "Handle missing values, duplicates, incorrect data types, inconsistent values, and outliers using Pandas.",

          whyItMatters:
            "Data cleaning is a major part of real-world analytical work because raw datasets are rarely ready for analysis.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Handle missing values.",
            "Remove duplicate records.",
            "Fix incorrect data types.",
            "Handle inconsistent values.",
            "Document cleaning decisions.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),

        createMission({
          title: "Perform Exploratory Data Analysis",

          description:
            "Use Python to explore a dataset, identify patterns, summarize variables, investigate relationships, and generate analytical insights.",

          whyItMatters:
            "Exploratory Data Analysis helps analysts discover patterns, anomalies, relationships, and questions that deserve deeper investigation.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Submit the analysis notebook.",
            "Include dataset exploration.",
            "Include visualizations.",
            "Document key patterns.",
            "Document analytical conclusions.",
          ],

          missionOrder: 5,

          isRequired: true,
        }),
      ],
    },

    // ============================================================
    // STAGE 5
    // ============================================================

    {
      stageOrder: 5,

      title: "Data Visualization and Business Intelligence",

      description:
        "Learn how to turn analytical results into clear visualizations, dashboards, and business insights.",

      estimatedDuration: 17,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        createMission({
          title: "Learn Data Visualization Principles",

          description:
            "Learn how to select appropriate charts, avoid misleading visualizations, and communicate data clearly.",

          whyItMatters:
            "Good visualization makes analytical findings understandable and helps decision-makers quickly identify important patterns.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 80,

          proofRequired: false,

          evidenceRequired: [
            "Identify appropriate chart types.",
            "Explain common visualization mistakes.",
            "Explain how to avoid misleading charts.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Create Visualizations with Python",

          description:
            "Create charts using Matplotlib and Seaborn and customize visualizations for analytical reports.",

          whyItMatters:
            "Python visualization skills allow analysts to communicate complex analytical findings through clear and reproducible charts.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 85,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Create multiple chart types.",
            "Add appropriate labels and titles.",
            "Explain the insights shown by the charts.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Learn Power BI or Tableau",

          description:
            "Learn a business intelligence platform for transforming datasets into interactive reports and dashboards.",

          whyItMatters:
            "Business intelligence tools are widely used by organizations to turn analytical data into dashboards used by decision-makers.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Import a dataset.",
            "Create basic visualizations.",
            "Create calculated metrics.",
            "Build an interactive report.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Build an Interactive Dashboard",

          description:
            "Create an interactive business dashboard containing KPIs, filters, charts, trends, and actionable insights.",

          whyItMatters:
            "A dashboard project demonstrates that you can turn raw data into a decision-making tool that resembles real workplace analytics.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Provide the dashboard link.",
            "Include at least three KPIs.",
            "Include filters.",
            "Include multiple appropriate visualizations.",
            "Document actionable insights.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),

        createMission({
          title: "Present Data Insights",

          description:
            "Create a concise analytical report explaining the most important findings, trends, anomalies, and recommended actions.",

          whyItMatters:
            "Data Analysts must communicate findings clearly to stakeholders who may not have a technical background.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 90,

          careerImpact: 90,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Submit the analytical report.",
            "Explain major findings.",
            "Identify important trends or anomalies.",
            "Provide recommendations.",
          ],

          missionOrder: 5,

          isRequired: true,
        }),
      ],
    },

    // ============================================================
    // STAGE 6
    // ============================================================

    {
      stageOrder: 6,

      title: "Advanced Analytics and Business Problem Solving",

      description:
        "Apply analytical techniques to real-world business problems and develop stronger analytical reasoning.",

      estimatedDuration: 13,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        createMission({
          title: "Learn KPI and Metric Design",

          description:
            "Learn how businesses define KPIs and metrics and how to select metrics that accurately represent business performance.",

          whyItMatters:
            "Choosing the right metrics ensures that analysis measures what actually matters to the business.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Define appropriate KPIs for a business scenario.",
            "Explain why each KPI matters.",
            "Distinguish between metrics and KPIs.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Analyze Customer Behavior",

          description:
            "Analyze customer activity, segmentation, retention, purchasing behavior, or engagement patterns.",

          whyItMatters:
            "Customer analysis helps businesses understand users, improve retention, increase revenue, and make better product decisions.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 95,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Submit the analysis.",
            "Identify customer segments or behavioral patterns.",
            "Include supporting visualizations.",
            "Provide business recommendations.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Learn Cohort and Funnel Analysis",

          description:
            "Understand customer funnels, conversion rates, cohorts, retention, and user journey analysis.",

          whyItMatters:
            "Cohort and funnel analysis help businesses understand where users drop off and how behavior changes over time.",

          difficulty: "hard",

          type: "video",

          priority: "medium",

          estimatedTime: 100,

          careerImpact: 85,

          proofRequired: false,

          evidenceRequired: [
            "Explain funnel stages.",
            "Calculate conversion rates.",
            "Explain cohort analysis.",
            "Interpret retention trends.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Solve a Business Case Study",

          description:
            "Analyze a realistic business problem, identify the required data, perform analysis, and recommend actions based on evidence.",

          whyItMatters:
            "Business case studies test whether you can turn ambiguous questions into structured analytical problems and actionable recommendations.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "file",

          evidenceRequired: [
            "Define the business problem.",
            "Identify required data.",
            "Perform the analysis.",
            "Present findings.",
            "Provide evidence-based recommendations.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),
      ],
    },

    // ============================================================
    // STAGE 7
    // ============================================================

    {
      stageOrder: 7,

      title: "Portfolio and Data Analyst Career Readiness",

      description:
        "Build a professional data portfolio and prepare for Data Analyst interviews and real-world analytical work.",

      estimatedDuration: 13,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        createMission({
          title: "Build an End-to-End Data Analysis Project",

          description:
            "Complete an end-to-end project covering data collection, cleaning, SQL analysis, Python analysis, visualization, and business recommendations.",

          whyItMatters:
            "An end-to-end project demonstrates that you can perform the complete analytical workflow rather than only one isolated skill.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 300,

          careerImpact: 100,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Provide the GitHub repository.",
            "Include data cleaning.",
            "Include SQL analysis.",
            "Include Python analysis.",
            "Include visualizations.",
            "Include business recommendations.",
          ],

          missionOrder: 1,

          isRequired: true,
        }),

        createMission({
          title: "Create a Data Analytics Portfolio",

          description:
            "Create a portfolio showcasing dashboards, SQL projects, Python analyses, case studies, and business insights.",

          whyItMatters:
            "A strong portfolio gives recruiters concrete evidence of your analytical abilities and helps you stand out from candidates with only certificates.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          careerImpact: 100,

          proofRequired: true,

          proofType: "link",

          evidenceRequired: [
            "Provide the portfolio link.",
            "Include at least three analytics projects.",
            "Include dashboards.",
            "Include SQL or Python analysis.",
            "Include project explanations.",
          ],

          missionOrder: 2,

          isRequired: true,
        }),

        createMission({
          title: "Improve Your GitHub Profile",

          description:
            "Organize analytical repositories, improve README files, document projects, and highlight your strongest work.",

          whyItMatters:
            "A professional GitHub profile makes your technical work easier for recruiters and hiring managers to evaluate.",

          difficulty: "easy",

          type: "assignment",

          priority: "medium",

          estimatedTime: 60,

          careerImpact: 75,

          proofRequired: true,

          proofType: "github",

          evidenceRequired: [
            "Provide your GitHub profile.",
            "Improve project README files.",
            "Pin your strongest repositories.",
            "Remove or organize unfinished projects.",
          ],

          missionOrder: 3,

          isRequired: true,
        }),

        createMission({
          title: "Prepare for Data Analyst Interviews",

          description:
            "Prepare SQL, Excel, statistics, Python, visualization, business case studies, and analytical reasoning interview topics.",

          whyItMatters:
            "Interview preparation helps convert your technical skills and projects into successful performance during hiring processes.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          careerImpact: 100,

          proofRequired: false,

          evidenceRequired: [
            "Practice SQL interview questions.",
            "Practice analytical case studies.",
            "Review statistics.",
            "Practice explaining projects.",
          ],

          missionOrder: 4,

          isRequired: true,
        }),

        createMission({
          title: "Practice Explaining Analytical Insights",

          description:
            "Practice communicating analytical findings clearly to technical and non-technical stakeholders.",

          whyItMatters:
            "A Data Analyst's value comes not only from finding insights but also from explaining what those insights mean and what should happen next.",

          difficulty: "medium",

          type: "assignment",

          priority: "medium",

          estimatedTime: 75,

          careerImpact: 90,

          proofRequired: false,

          evidenceRequired: [
            "Explain an analytical finding in simple language.",
            "Describe the business impact.",
            "Provide a clear recommendation.",
          ],

          missionOrder: 5,

          isRequired: true,
        }),
      ],
    },
  ],
};