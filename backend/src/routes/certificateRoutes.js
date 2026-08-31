const express=require("express");
const router=express.Router();
const protect = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validateMiddleware");
const certificateController=require("../controllers/certificateController");
const {createCertificateSchema,getCertificatesQuerySchema,certificateParamsSchema,
    updateCertificateSchema,addCertificateSkillsSchema,removeCertificateSkillParamsSchema}=require("../../../shared/validators/certificateValidator");


router.post("/",protect,validate(createCertificateSchema),certificateController.createCertificate);
router.get("/",protect,validate(getCertificatesQuerySchema, "query"),certificateController.getAllCertificates);
router.get( "/:certificateId", protect, validate(certificateParamsSchema, "params"), certificateController.getCertificateById);
router.patch( "/:certificateId", protect, validate(certificateParamsSchema, "params"),validate(updateCertificateSchema, "body"),
    certificateController.updateCertificate
);
router.delete( "/:certificateId", protect, validate(certificateParamsSchema, "params"), certificateController.deleteCertificate);
router.post("/:certificateId/skills",protect,validate(certificateParamsSchema, "params"),validate(addCertificateSkillsSchema, "body"),certificateController.addSkillsToCertificate
);
router.get( "/:certificateId/skills", protect,validate(certificateParamsSchema, "params"),certificateController.getCertificateSkills);
router.delete("/:certificateId/skills/:skillId", protect, validate(removeCertificateSkillParamsSchema, "params"),certificateController.removeSkillFromCertificate);
router.get("/:certificateId/analysis",protect,validate(certificateParamsSchema, "params"),certificateController.getCertificateAnalysisHistory);
router.get("/:certificateId/analysis/latest",protect,validate(certificateParamsSchema, "params"),certificateController.getLatestCertificateAnalysis);
module.exports=router;