module.exports = {
  roadmap: {
    title: "Data Scientist",

    slug: "data-scientist",

    targetCareer: "Data Scientist",

    description:
      "A structured roadmap to become job-ready as a Data Scientist by mastering Python, SQL, statistics, data analysis, machine learning, feature engineering, model evaluation, experimentation, deep learning fundamentals, model deployment, MLOps, and end-to-end data science projects.",

    difficulty: "advanced",

    estimatedDuration: 150,

    totalStages: 8,

    isActive: true,

    version: 1,

    createdBy: "admin",
  },

  stages: [
    {
      stageOrder: 1,

      title: "Python and Data Science Foundations",

      description:
        "Build strong Python programming and data manipulation skills required for practical data science work.",

      estimatedDuration: 18,

      unlockCondition: "immediate",

      isOptional: false,

      missions: [
        {
          title: "Master Python Fundamentals",

          description:
            "Learn variables, data types, collections, conditions, loops, functions, modules, exceptions, and core Python programming patterns.",

          whyItMatters:
            "Strong Python fundamentals are essential because Python is the primary programming language used throughout modern data science workflows.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Python for Data Science",

          description:
            "Practice functions, list comprehensions, file handling, error handling, virtual environments, and reusable Python scripts for data workflows.",

          whyItMatters:
            "Data scientists need to write clean and reusable Python code to automate data preparation, analysis, experimentation, and modeling workflows.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn NumPy",

          description:
            "Work with arrays, indexing, reshaping, vectorized operations, broadcasting, numerical calculations, and statistical operations using NumPy.",

          whyItMatters:
            "NumPy provides the numerical computing foundation behind many Python data science and machine learning libraries.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          proofRequired: true,

          proofType: "github",

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Pandas",

          description:
            "Use Series and DataFrames for filtering, sorting, grouping, merging, transforming, and analyzing structured datasets.",

          whyItMatters:
            "Pandas is one of the most important tools for cleaning, transforming, exploring, and analyzing real-world datasets.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 150,

          proofRequired: true,

          proofType: "github",

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Python Data Analysis Project",

          description:
            "Analyze a real dataset using Python, NumPy, Pandas, and visualization libraries and communicate the most important findings.",

          whyItMatters:
            "A practical data analysis project demonstrates that you can turn raw data into meaningful insights rather than only knowing Python syntax.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "github",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 2,

      title: "SQL and Data Extraction",

      description:
        "Learn how to retrieve, transform, aggregate, and analyze data from relational databases using SQL.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn SQL Fundamentals",

          description:
            "Learn SELECT, WHERE, ORDER BY, LIMIT, DISTINCT, aliases, filtering, and basic SQL query construction.",

          whyItMatters:
            "SQL is a core data science skill because large amounts of business and analytical data are stored in relational databases.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Master SQL Aggregations and Grouping",

          description:
            "Practice COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, conditional aggregation, and analytical metrics.",

          whyItMatters:
            "Aggregation allows data scientists to transform raw records into useful business metrics and analytical summaries.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          proofRequired: true,

          proofType: "text",

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Master SQL Joins",

          description:
            "Learn INNER JOIN, LEFT JOIN, RIGHT JOIN, self joins, multi-table analysis, and strategies for avoiding duplicate results.",

          whyItMatters:
            "Real datasets are often distributed across multiple tables, making joins essential for combining information correctly.",

          difficulty: "medium",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          proofRequired: true,

          proofType: "text",

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Advanced Analytical SQL",

          description:
            "Use subqueries, CTEs, window functions, ranking, partitioning, and analytical SQL patterns used in real data science workflows.",

          whyItMatters:
            "Advanced SQL enables efficient analysis of complex datasets and prepares you for real-world analytical and data science tasks.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a SQL Data Analysis Project",

          description:
            "Answer realistic business questions using joins, aggregations, CTEs, window functions, and analytical SQL queries.",

          whyItMatters:
            "A SQL project proves that you can extract and analyze real data to answer practical business questions.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "github",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 3,

      title: "Statistics and Probability",

      description:
        "Build the statistical and mathematical foundation required to understand data, experiments, and machine learning models.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Descriptive Statistics",

          description:
            "Understand mean, median, mode, variance, standard deviation, percentiles, quartiles, distributions, and outlier detection.",

          whyItMatters:
            "Descriptive statistics help data scientists understand the structure, spread, and quality of datasets before modeling.",

          difficulty: "easy",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Probability Fundamentals",

          description:
            "Understand probability rules, conditional probability, independent events, random variables, probability distributions, and expected values.",

          whyItMatters:
            "Probability provides the mathematical foundation for uncertainty, statistical inference, and many machine learning concepts.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Understand Statistical Distributions",

          description:
            "Learn normal, binomial, Poisson, uniform, and other important distributions and understand when they are useful.",

          whyItMatters:
            "Understanding distributions helps data scientists model uncertainty and select appropriate statistical techniques.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Hypothesis Testing",

          description:
            "Understand null and alternative hypotheses, confidence intervals, p-values, statistical significance, and common hypothesis tests.",

          whyItMatters:
            "Hypothesis testing helps data scientists determine whether observed patterns are statistically meaningful rather than random variation.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Perform Statistical Analysis",

          description:
            "Analyze a real dataset using descriptive statistics, distributions, confidence intervals, hypothesis testing, correlation, and appropriate statistical measures.",

          whyItMatters:
            "Applying statistics to real data demonstrates the ability to make evidence-based conclusions from datasets.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "file",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 4,

      title: "Data Cleaning and Exploratory Analysis",

      description:
        "Learn how to transform messy real-world data into reliable datasets and discover meaningful patterns through exploratory analysis.",

      estimatedDuration: 20,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Data Cleaning Techniques",

          description:
            "Handle missing values, duplicates, inconsistent formats, invalid records, incorrect data types, and noisy data.",

          whyItMatters:
            "Poor-quality data can produce misleading analysis and unreliable machine learning models, making data cleaning a critical skill.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Perform Exploratory Data Analysis",

          description:
            "Explore distributions, relationships, correlations, trends, anomalies, and important patterns using Python.",

          whyItMatters:
            "Exploratory analysis helps data scientists discover patterns, identify problems, and generate useful hypotheses before modeling.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "github",

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Data Visualization",

          description:
            "Create meaningful visualizations using Matplotlib and Seaborn and learn how to communicate analytical findings clearly.",

          whyItMatters:
            "Effective visualization allows data scientists to communicate complex findings and patterns to technical and non-technical audiences.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Feature Engineering",

          description:
            "Create useful machine learning features through encoding, scaling, transformations, aggregation, date features, and domain-based feature creation.",

          whyItMatters:
            "Well-designed features can significantly improve model performance and help machine learning algorithms represent real-world problems effectively.",

          difficulty: "hard",

          type: "article",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Complete an Exploratory Data Science Project",

          description:
            "Clean a real-world dataset, perform exploratory analysis, visualize important patterns, engineer useful features, and document analytical insights.",

          whyItMatters:
            "This project demonstrates the complete data preparation and exploration workflow used before machine learning modeling.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 240,

          proofRequired: true,

          proofType: "github",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 5,

      title: "Machine Learning Fundamentals",

      description:
        "Learn the core supervised and unsupervised machine learning algorithms and build practical predictive models.",

      estimatedDuration: 25,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Understand the Machine Learning Workflow",

          description:
            "Learn problem definition, data preparation, train-validation-test splitting, preprocessing, feature engineering, training, evaluation, and model selection.",

          whyItMatters:
            "Understanding the complete machine learning workflow prevents common mistakes and helps build reliable predictive systems.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 100,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Learn Linear and Logistic Regression",

          description:
            "Understand regression and classification, model assumptions, coefficients, predictions, loss functions, and practical use cases.",

          whyItMatters:
            "Regression models are foundational machine learning techniques and provide important intuition for predictive modeling.",

          difficulty: "medium",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Decision Trees and Ensemble Models",

          description:
            "Understand decision trees, random forests, boosting, feature importance, ensemble learning, and practical applications.",

          whyItMatters:
            "Tree-based and ensemble models are powerful techniques commonly used for structured and tabular data.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 150,

          proofRequired: true,

          proofType: "github",

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Unsupervised Learning",

          description:
            "Understand clustering, dimensionality reduction, K-Means, hierarchical clustering, and practical unsupervised learning use cases.",

          whyItMatters:
            "Unsupervised learning enables data scientists to discover hidden structures and patterns when labeled data is unavailable.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Machine Learning Prediction System",

          description:
            "Build a complete supervised machine learning project from data preparation and feature engineering through training, evaluation, and prediction.",

          whyItMatters:
            "A complete machine learning project demonstrates the ability to move from raw data to a working predictive solution.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 240,

          proofRequired: true,

          proofType: "github",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 6,

      title: "Model Evaluation and Advanced Machine Learning",

      description:
        "Learn how to evaluate, improve, tune, and validate machine learning models using reliable experimentation and advanced techniques.",

      estimatedDuration: 22,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Master Model Evaluation Metrics",

          description:
            "Understand accuracy, precision, recall, F1-score, ROC-AUC, PR-AUC, confusion matrices, MAE, MSE, RMSE, and appropriate metric selection.",

          whyItMatters:
            "Choosing appropriate evaluation metrics ensures that model performance is measured according to the actual problem requirements.",

          difficulty: "medium",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Understand Overfitting and Model Generalization",

          description:
            "Learn bias, variance, regularization, cross-validation, data leakage, and techniques for improving model generalization.",

          whyItMatters:
            "Generalization determines whether a model performs well on unseen data rather than simply memorizing its training dataset.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Feature Selection and Pipelines",

          description:
            "Select useful features and build reproducible preprocessing and modeling pipelines using practical machine learning workflows.",

          whyItMatters:
            "Pipelines make machine learning workflows reproducible and reduce errors caused by inconsistent preprocessing.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 120,

          proofRequired: true,

          proofType: "github",

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Learn Hyperparameter Tuning",

          description:
            "Use grid search, random search, cross-validation, and appropriate validation strategies to improve model performance.",

          whyItMatters:
            "Hyperparameter tuning helps identify better model configurations while maintaining reliable validation practices.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 150,

          proofRequired: true,

          proofType: "github",

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build an Optimized Machine Learning Model",

          description:
            "Improve a baseline model using preprocessing, feature engineering, feature selection, cross-validation, hyperparameter tuning, and appropriate evaluation metrics.",

          whyItMatters:
            "This project demonstrates that you can systematically improve and validate machine learning models rather than relying on default configurations.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 240,

          proofRequired: true,

          proofType: "github",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 7,

      title: "Deep Learning and Model Deployment",

      description:
        "Learn deep learning fundamentals and deploy machine learning models as reliable applications or APIs.",

      estimatedDuration: 18,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn Neural Network Fundamentals",

          description:
            "Understand neurons, layers, activation functions, forward propagation, loss functions, backpropagation, and gradient-based optimization.",

          whyItMatters:
            "Neural network fundamentals provide the foundation for understanding modern deep learning systems.",

          difficulty: "hard",

          type: "video",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Build a Neural Network",

          description:
            "Build and train a basic neural network using a modern deep learning framework and evaluate its performance.",

          whyItMatters:
            "Building a neural network provides practical experience with training, evaluating, and improving deep learning models.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "github",

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Learn Model Serialization and Experiment Tracking",

          description:
            "Learn how trained models are saved, loaded, versioned, tracked, and reused across development and deployment workflows.",

          whyItMatters:
            "Model serialization and experiment tracking are essential for reproducing experiments and moving trained models into production.",

          difficulty: "medium",

          type: "article",

          priority: "medium",

          estimatedTime: 100,

          proofRequired: false,

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Deploy a Machine Learning Model",

          description:
            "Expose a trained machine learning model through an API and deploy it so applications or users can make predictions.",

          whyItMatters:
            "Deployment turns a machine learning model into a usable product that applications and users can interact with.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "link",

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Build a Production-Ready Prediction API",

          description:
            "Create a prediction API with input validation, preprocessing, model loading, error handling, logging, and documented endpoints.",

          whyItMatters:
            "A production-ready prediction API demonstrates the ability to integrate machine learning into reliable software systems.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 210,

          proofRequired: true,

          proofType: "github",

          missionOrder: 5,

          isRequired: true,
        },
      ],
    },

    {
      stageOrder: 8,

      title: "MLOps, Capstone and Career Readiness",

      description:
        "Learn production machine learning fundamentals and complete a portfolio-quality end-to-end Data Science project.",

      estimatedDuration: 13,

      unlockCondition: "previous-stage-completed",

      isOptional: false,

      missions: [
        {
          title: "Learn MLOps Fundamentals",

          description:
            "Understand reproducibility, experiment tracking, model versioning, data pipelines, model monitoring, deployment workflows, and the machine learning lifecycle.",

          whyItMatters:
            "MLOps practices help data scientists build reproducible, maintainable, and deployable machine learning systems.",

          difficulty: "hard",

          type: "article",

          priority: "high",

          estimatedTime: 120,

          proofRequired: false,

          missionOrder: 1,

          isRequired: true,
        },

        {
          title: "Track Machine Learning Experiments",

          description:
            "Track datasets, parameters, metrics, experiments, and model versions using an ML experiment tracking workflow.",

          whyItMatters:
            "Experiment tracking makes machine learning work reproducible and allows data scientists to compare different experiments systematically.",

          difficulty: "hard",

          type: "project",

          priority: "medium",

          estimatedTime: 150,

          proofRequired: true,

          proofType: "github",

          missionOrder: 2,

          isRequired: true,
        },

        {
          title: "Build an End-to-End Data Science Capstone",

          description:
            "Solve a realistic problem from data collection and cleaning through SQL analysis, exploratory analysis, feature engineering, model development, evaluation, deployment, and documentation.",

          whyItMatters:
            "An end-to-end capstone demonstrates the complete set of skills required to solve practical data science problems from start to finish.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 360,

          proofRequired: true,

          proofType: "github",

          missionOrder: 3,

          isRequired: true,
        },

        {
          title: "Create a Data Science Portfolio",

          description:
            "Build a professional portfolio containing machine learning projects, exploratory analyses, SQL work, deployed models, technical documentation, and measurable results.",

          whyItMatters:
            "A strong portfolio gives recruiters and hiring managers concrete evidence of your practical data science abilities.",

          difficulty: "hard",

          type: "project",

          priority: "high",

          estimatedTime: 180,

          proofRequired: true,

          proofType: "link",

          missionOrder: 4,

          isRequired: true,
        },

        {
          title: "Prepare for Data Science Interviews",

          description:
            "Prepare Python, SQL, statistics, probability, machine learning, model evaluation, experimentation, ML system design, and data science case-study interview topics.",

          whyItMatters:
            "Interview preparation helps you demonstrate both technical knowledge and practical problem-solving skills during the hiring process.",

          difficulty: "hard",

          type: "assignment",

          priority: "high",

          estimatedTime: 150,

          proofRequired: false,

          missionOrder: 5,

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
        "Analyze a real dataset using Python, NumPy, Pandas, and visualization tools and communicate meaningful findings.",

      requiredSkills: [
        "Python",
        "NumPy",
        "Pandas",
        "Data Cleaning",
        "Data Analysis",
        "Data Visualization",
      ],

      evaluationCriteria: [
        "Uses Python effectively",
        "Cleans and transforms the dataset correctly",
        "Uses Pandas and NumPy appropriately",
        "Performs meaningful exploratory analysis",
        "Communicates findings clearly",
      ],
    },

    {
      stageOrder: 2,

      challengeType: "project",

      objective:
        "Use SQL to answer realistic analytical questions using filtering, joins, aggregations, CTEs, and window functions.",

      requiredSkills: [
        "SQL",
        "Joins",
        "Aggregation",
        "CTEs",
        "Window Functions",
        "Data Analysis",
      ],

      evaluationCriteria: [
        "Writes correct SQL queries",
        "Uses joins appropriately",
        "Uses aggregations correctly",
        "Uses CTEs and window functions effectively",
        "Answers analytical questions accurately",
      ],
    },

    {
      stageOrder: 3,

      challengeType: "project",

      objective:
        "Perform statistical analysis on a real dataset and use appropriate statistical techniques to support data-driven conclusions.",

      requiredSkills: [
        "Statistics",
        "Probability",
        "Descriptive Statistics",
        "Distributions",
        "Hypothesis Testing",
        "Correlation",
      ],

      evaluationCriteria: [
        "Calculates appropriate statistical measures",
        "Selects suitable statistical techniques",
        "Interprets statistical results correctly",
        "Explains uncertainty appropriately",
        "Communicates conclusions clearly",
      ],
    },

    {
      stageOrder: 4,

      challengeType: "project",

      objective:
        "Clean and explore a real-world dataset, identify important patterns, engineer useful features, and document analytical findings.",

      requiredSkills: [
        "Data Cleaning",
        "Pandas",
        "Exploratory Data Analysis",
        "Data Visualization",
        "Feature Engineering",
      ],

      evaluationCriteria: [
        "Handles missing and inconsistent data correctly",
        "Performs meaningful exploratory analysis",
        "Creates useful visualizations",
        "Engineers relevant features",
        "Documents analytical findings clearly",
      ],
    },

    {
      stageOrder: 5,

      challengeType: "project",

      objective:
        "Build a complete machine learning prediction system from data preparation through model training, evaluation, and prediction.",

      requiredSkills: [
        "Machine Learning",
        "Feature Engineering",
        "Model Training",
        "Regression",
        "Classification",
        "Model Evaluation",
      ],

      evaluationCriteria: [
        "Defines the machine learning problem correctly",
        "Prepares data appropriately",
        "Trains suitable machine learning models",
        "Evaluates models using appropriate metrics",
        "Produces meaningful predictions",
      ],
    },

    {
      stageOrder: 6,

      challengeType: "project",

      objective:
        "Improve a machine learning model using feature engineering, cross-validation, feature selection, and hyperparameter tuning.",

      requiredSkills: [
        "Model Evaluation",
        "Cross Validation",
        "Feature Selection",
        "Pipelines",
        "Hyperparameter Tuning",
        "Model Optimization",
      ],

      evaluationCriteria: [
        "Uses appropriate evaluation metrics",
        "Avoids data leakage",
        "Uses cross-validation correctly",
        "Builds reproducible pipelines",
        "Improves model performance systematically",
      ],
    },

    {
      stageOrder: 7,

      challengeType: "deployment",

      objective:
        "Build and deploy a machine learning prediction API capable of serving predictions reliably.",

      requiredSkills: [
        "Deep Learning",
        "Model Serialization",
        "API Development",
        "Model Deployment",
        "Input Validation",
        "Logging",
      ],

      evaluationCriteria: [
        "Trained model works correctly",
        "Model is serialized and loaded correctly",
        "Prediction API validates inputs",
        "API handles errors appropriately",
        "Model is successfully deployed",
      ],
    },

    {
      stageOrder: 8,

      challengeType: "project",

      objective:
        "Build and present an end-to-end Data Science project covering data preparation, analysis, machine learning, deployment, documentation, and production practices.",

      requiredSkills: [
        "Python",
        "SQL",
        "Statistics",
        "Machine Learning",
        "Feature Engineering",
        "Model Evaluation",
        "Deployment",
        "MLOps",
        "Data Science",
      ],

      evaluationCriteria: [
        "Solves a meaningful real-world problem",
        "Uses appropriate data preparation techniques",
        "Performs meaningful analysis",
        "Builds and evaluates suitable models",
        "Deploys the solution successfully",
        "Documents the complete project professionally",
        "Presents the project clearly",
      ],
    },
  ],
};