const mongoose=require("mongoose");

const roadmapTemplateSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true,
            trim:true,
        },
        slug:{
            type:String,
            required:true,
            trim:true,
            lowercase: true,
            unique:true
        },
        targetCareer:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },
        difficulty:{
            type:String,
            required:true,
            enum:["beginner","intermediate","advanced"]
        },
        estimatedDuration: {
            type: Number,
            required: true
        },
        totalStages:{
            type:Number,
            required:true,
            min:1
        },
        isActive:{
            type:Boolean,
            default:true
        },
        version:{
            type:Number,
            default:1
        },
        createdBy:{
            type:String,
            enum:["admin","ai"],
            required:true,
        }
    }
);

const RoadmapTemplate=mongoose.model("RoadmapTemplate",roadmapTemplateSchema);

module.exports=RoadmapTemplate;