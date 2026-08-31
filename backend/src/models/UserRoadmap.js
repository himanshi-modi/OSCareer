const mongoose=require("mongoose");
const RoadmapTemplate = require("./RoadmapTemplate");

const userRoadmapSchema=new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        roadmapTemplateId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RoadmapTemplate",
            required:true
        },
        previousRoadmapId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserRoadmap",
            default: null
        },
        currentStageId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserStage",
            default:null
        },
        startingStageId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserStage",
            default:null
        },
        careerProfileId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"CareerProfile",
            required:true
        },
        status:{
            type:String,
            enum:["not-started","in-progress","completed"],
            default:"not-started"
        },
        progress:{
            type:Number,
            default:0,
            min:0,
            max:100,
        },
        estimatedCompletionDate:{
            type:Date,
            required:true
        },
        startedAt:{
            type:Date,
            default:null,
        },
        completedAt:{
            type:Date,
            default:null,
        },
        personalizationReason:{
            type:String,
            trim:true,
        },
        lastActivityAt:{
            type:Date,
            default:Date.now,
        },
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
        isActive: {
            type: Boolean,
            default: true
        },
        

    },{
        timestamps:true
    }
);
userRoadmapSchema.index({
    userId: 1,
    isActive: 1
});

userRoadmapSchema.index({
    careerProfileId: 1
});

userRoadmapSchema.index({
    roadmapTemplateId: 1
});
const UserRoadmap=mongoose.model("UserRoadmap",userRoadmapSchema);
module.exports=UserRoadmap;