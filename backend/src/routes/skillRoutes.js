const express = require("express");
const router = express.Router();
const protect =require("../middlewares/authMiddleware");
const skillsController =require("../controllers/skillController");
const validate = require("../middlewares/validateMiddleware");
const {searchMasterSkillsSchema,createMasterSkillSchema,updateMasterSkillSchema, createUserSkillSchema,
    updateUserSkillSchema}=require("../../../shared/validators/skillValidator");
const authorize = require("../middlewares/authorizeMiddleware");


router.get("/master",protect,validate(searchMasterSkillsSchema,"query"),skillsController.searchMasterSkills);
router.get("/master/:skillId",protect,skillsController.getMasterSkillById);
router.post("/master",protect,authorize("admin"),validate(createMasterSkillSchema, "body"),skillsController.createMasterSkill);
router.patch("/master/:skillId",protect,authorize("admin"),validate(updateMasterSkillSchema),skillsController.updateMasterSkill);
router.delete("/master/:skillId",protect,authorize("admin"),skillsController.deleteMasterSkill);
router.get("/me",protect,skillsController.getMySkills);
router.get("/me/:skillId",protect,skillsController.getMySkillById);
router.post("/me",protect,validate(createUserSkillSchema),skillsController.addUserSkill);
router.patch("/me/:skillId",protect,validate(updateUserSkillSchema),skillsController.updateUserSkill);
router.delete("/me/:skillId",protect,skillsController.deleteUserSkill);
module.exports=router;
