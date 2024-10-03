const mongoose= require('mongoose');
const {Schema}= mongoose;

const ResumeSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
   title:{
     type: String,
     required: true
   },
   description:{
    type: String,
    required: true,
    unique: true
   },
   image:{
    data:Buffer,
    contentType:String,
   },
   tag:{
    type: String,
    default: "General "
   },
   date:{
    type: Date,
    default: Date.now
   }
  });
module.exports= mongoose.model('resume', ResumeSchema)