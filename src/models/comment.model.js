import mongoose , {Schema, Types} from "mongoose";
import mongooseAggregatePapinate from "mongoose-paginate-v2"

const commentSchema  = new Schema ({
content:{
    type:String,
    required:true
},
video:{
    type:Schema.Types.ObjectId,
    ref:"Video"
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
},
},{timestamps:true})



commentSchema.plugin(mongooseAggregatePapinate)
export const Comment = mongoose.model("Comment",commentSchema)