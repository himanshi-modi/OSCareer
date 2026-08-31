const mongoose =require("mongoose");
const RoadmapTemplate = require("./RoadmapTemplate");

const stageTemplateSchema=mongoose.Schema(
    {
        roadmapTemplateId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RoadmapTemplate",
            required:true,   
        },
        stageOrder:{
            type:Number,
            required:true,
            min:1
        },
        title:{
            type:String,
            required:true,
            trim:true
        },
        description:{
            type:String,
            required:true,
            trim:true
        },
        estimatedDuration:{
            type:Number,
            required:true,
            min:1,
        },
        totalMissions:{
            type:Number,
            default:0,
            min:0,
        },
        unlockCondition:{
            type:String,
            enum:["previous-stage-completed","immediate"],
            default:"previous-stage-completed"
        },
        isOptional:{
            type:Boolean,
            default:false
        }
    },{
        timestamps:true
    }
);
stageTemplateSchema.index({
    roadmapTemplateId:1,
    stageOrder:1
},{
    unique:true
});

const StageTemplate=mongoose.model("StageTemplate", stageTemplateSchema);

module.exports=StageTemplate;