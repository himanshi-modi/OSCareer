const mongoose = require("mongoose");

const weeklyReviewSchema = new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },

    weekStartDate:{
        type:Date,
        required:true
    },

    weekEndDate:{
        type:Date,
        required:true
    },

    reviewStatus:{
        type:String,
        enum:[
            "pending",
            "completed",
            "missed"
        ],
        default:"pending"
    },
    completedMissions:{
        type:Number,
        default:0,
        min:0
    },

    totalMissions:{
        type:Number,
        default:0,
        min:0
    },

    roadmapProgress:{
        type:Number,
        default:0,
        min:0,
        max:100
    },
    readinessScore: {
     type: Number,
     default: 0,
     min: 0,
     max: 100
   },

    skillsLearned:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Skill"
        }
    ],

    projectsCompleted:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Project"
        }
    ],

    certificatesAdded:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Certificate"
        }
    ],

    resumesUpdated:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Resume"
        }
    ],


    biggestAchievement:{
        type:String,
        trim:true,
        default:""
    },

    biggestChallenge:{
        type:String,
        trim:true,
        default:""
    },

    nextWeekGoal:{
        type:String,
        trim:true,
        default:""
    },

    confidenceLevel:{
        type:Number,
        min:1,
        max:10,
        default:null
    },

    motivationLevel:{
        type:Number,
        min:1,
        max:10,
        default:null
    },

    notes:{
        type:String,
        trim:true,
        default:""
    },

    aiSummary:{
        type:String,
        default:""
    },

    aiSuggestions:[
        String
    ],

    aiMotivation:{
        type:String,
        default:""
    },

    consistencyScore:{
        type:Number,
        min:0,
        max:100,
        default:null
    },

    reviewedAt:{
        type:Date,
        default:null
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
    timestamps:true
});

weeklyReviewSchema.index({
    userId:1,
    weekStartDate:1
},{
    unique:true
});

module.exports = mongoose.model(
    "WeeklyReview",
    weeklyReviewSchema
);