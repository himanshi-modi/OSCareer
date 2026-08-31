const express=require("express");
const protect = require("../middlewares/authMiddleware");
const router=express.Router();
const validate = require("../middlewares/validateMiddleware");
const {createCareerProfileSchema,updateCareerProfileSchema}=require("../../../shared/validators/careerProfileValidator");
const careerProfileController=require("../controllers/careerProfileController");

router.post("/",protect,validate(createCareerProfileSchema),careerProfileController.createCareerProfile);
router.get("/",protect,careerProfileController.getCareerProfile);
router.patch("/",protect,validate(updateCareerProfileSchema),careerProfileController.updateCareerProfile);
router.get("/history",protect,careerProfileController.getCareerProfileHistory);
router.patch("/:careerProfileId/activate",protect,careerProfileController.activateCareerProfile);
router.delete("/:careerProfileId",protect,careerProfileController.deleteCareerProfile);
module.exports=router;