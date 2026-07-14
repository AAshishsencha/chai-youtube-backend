import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-paginate-v2"

const videoSchema = new Schema(
    {
        videoFile:{
            type:String,//url from cloudinary
            required:true
        },
        thumbnail:{
            type:String,//cloudinary url
            required: true
        },
        tille:{
            type:String,
            required: true
        },
description:{
            type:String,
            required: true
        },
        duration:{
            type:Number, 
            required: true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video" , videoSchema)