const mongoose=require("mongoose");

const careerProfileSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            index:true
        },
        targetCareer:{
            type:String,
            required:true,
            trim:true
        },
        currentGoal:{
            type:String,
            required:true,
            trim:true
        },
        careerPriority: {
            type: String,
            required: true,
            enum: [
                "JOB",
                "INTERNSHIP",
                "FREELANCING",
                "HIGHER_STUDIES",
                "CAREER_SWITCH"
            ]
        },
        
        internshipPreference:{
            type: String,
            enum: [
                "REMOTE",
                "ONSITE",
                "HYBRID",
                "NO_PREFERENCE"
            ],
            default: "NO_PREFERENCE"
        },
        targetTimeline: {
            type: String,
            required: true,
            enum: [
                "1_MONTH",
                "3_MONTHS",
                "6_MONTHS",
                "12_MONTHS",
                "NO_TIMELINE",
                "CUSTOM"
            ]
        },
        customTimelineMonths: {
    type: Number,
    min: 1,
    default: null,
    required: function () {
        return this.targetTimeline === "CUSTOM";
    }
},
        dailyCommitment:{
            type: Number,
            required: true,
            min: 1,
            max: 12
        },
         educationLevel: {
            type: String,
            required: true,
            enum: [
                "HIGH_SCHOOL",
                "DIPLOMA",
                "BACHELORS",
                "MASTERS",
                "PHD"
            ]
        },
        currentYear: {
            type: Number,
            min: 1,
            max: 6
        },

        experienceLevel: {
            type: String,
            required: true,
            enum: [
                "BEGINNER",
                "INTERMEDIATE",
                "ADVANCED"
            ]
        },
        roadmapTemplateId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RoadmapTemplate",
            default: null
        },

        isActive: {
            type: Boolean,
            default: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        },

        deletedAt: {
            type: Date,
            default: null
        },
    },{
        timestamps:true,
    }
);
careerProfileSchema.index(
  { userId: 1, targetCareer: 1, isDeleted: 1 },
  { unique: true }
);
careerProfileSchema.index({ userId: 1, isActive: 1 });
careerProfileSchema.index({ userId: 1, isDeleted: 1 });
const CareerProfile=mongoose.model("CareerProfile",careerProfileSchema);
module.exports=CareerProfile;
