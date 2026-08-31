const mongoose= require("mongoose");
const UserRoadmap = require("./UserRoadmap");
const { applyTimestamps } = require("./RoadmapTemplate");
const userStageSchema= new mongoose.Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        userRoadmapId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"UserRoadmap",
            required:true,
        },
        stageTemplateId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"StageTemplate",
            required:true,

        },
        status:{
            type:String,
            enum:[
                "locked",
                "not-started",
                "in-progress",
                "completed",
                "skipped",
            ],
            default:"locked"
        },
        skippedMissions: {
    type: Number,
    default: 0,
    min: 0,
},
        startedAt:{
            type:Date,
            default:null,
        },
        completedAt:{
            type:Date,
            default:null,
        },
        lastactivityAt:{
            type:Date,
            default:Date.now,
        },
        aiNotes:{
            type:String,
            trim:true,
            default:"",
        },
        skipReason:{
            type:String,
            trim:true,
            default:"",
        
        },    
        isDeleted: {
            type: Boolean,
            default: false
        },

        deletedAt: {
            type: Date,
            default: null
        }
        },
        {
            timestamps:true,
        }
);

userStageSchema.index(
    {
        userId: 1,
        userRoadmapId: 1,
        stageTemplateId: 1
    },
    {
        unique: true
    }
);
const UserStage=mongoose.model("UserStage",userStageSchema);

module.exports=UserStage;
