const express=require("express");
const router=express.Router();
const protect =require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const projectController = require("../controllers/projectController");
const {createProjectSchema,getProjectsSchema,projectIdSchema,updateProjectSchema,
    addProjectSkillSchema,projectSkillParamsSchema,projectReviewParamsSchema}=require("../../../shared/validators/projectValidator");

router.post("/",protect,validate(createProjectSchema),projectController.createProject);
router.get("/resume",protect,projectController.getResumeProjects);
router.get("/resume/:projectId", protect,projectController.getResumeProjectById);
router.get("/",protect,validate(getProjectsSchema, "query"),projectController.getProjects);
router.get("/career",protect,projectController.getCareerProjects);
router.get("/:projectId",protect,validate(projectIdSchema, "params"),projectController.getProjectById);
router.patch("/:projectId",protect,validate(projectIdSchema, "params"),validate(updateProjectSchema),projectController.updateProject);
router.delete("/:projectId",protect,validate(projectIdSchema, "params"),projectController.deleteProject);

router.post("/:projectId/skills",protect,validate(projectIdSchema, "params"), validate(addProjectSkillSchema),projectController.addProjectSkill);
router.get("/:projectId/skills",protect,validate(projectIdSchema, "params"),projectController.getProjectSkills);
router.delete( "/:projectId/skills/:skillId", protect, validate(projectSkillParamsSchema, "params"), projectController.removeProjectSkill);

router.post( "/:projectId/reviews", protect, validate(projectIdSchema, "params"),projectController.createProjectReview);
router.get("/:projectId/reviews", protect, validate(projectIdSchema, "params"), projectController.getProjectReviewHistory);
router.get( "/:projectId/reviews/latest", protect, validate(projectIdSchema, "params"), projectController.getLatestProjectReview);
router.get( "/:projectId/reviews/:reviewId", protect, validate(projectReviewParamsSchema, "params"),projectController.getProjectReviewById);
module.exports=router;