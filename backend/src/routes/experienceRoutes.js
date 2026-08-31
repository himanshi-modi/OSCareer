const express=require("express");
const router=express.Router();
const protect=require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const {createExperienceSchema,getExperiencesQuerySchema,experienceParamsSchema,updateExperienceSchema} = require("../../../shared/validators/experienceValidator");
const experienceController=require("../controllers/experienceController");

router.post("/",protect,validate(createExperienceSchema),experienceController.createExperience);
router.get("/",protect,validate(getExperiencesQuerySchema, "query"),experienceController.getAllExperiences);
router.get("/current",protect,experienceController.getCurrentExperience);
router.get("/stats",protect,experienceController.getExperienceStats);
router.get("/:experienceId",protect,validate(experienceParamsSchema, "params"),experienceController.getExperienceById);
router.patch("/:experienceId/featured",protect,validate(experienceParamsSchema, "params"),experienceController.toggleFeaturedExperience);
router.patch("/:experienceId",protect,validate(experienceParamsSchema, "params"),validate(updateExperienceSchema, "body"),experienceController.updateExperience);
router.delete("/:experienceId",protect,validate(experienceParamsSchema, "params"),experienceController.deleteExperience);
module.exports=router;