



const mongoose = require("mongoose") ;

mongoose.connect(process.env.MONDODB)
.then(()=>{
  console.log("mongo connected")
})
.catch(()=>{
  console.log("error")
})
const userSchema = mongoose.Schema(
  {
      name: {
          type: String,
          required: true,
          unique: true,
          lowercase: true,
          trim: true, 
          index: true
      },
      company: {
          type: String,
          required: true,
         
          lowercase: true,
          trim: true, 
         
      },
      email: {
          type: String,
          required: true,
          unique: true,
          lowecase: true,
          trim: true, 
      },
      phone: {
          type: String,
          required: true,
        },
      
      
      Image: {
          type: String, // cloudinary url
      },
     
      password: {
          type: String,
          required: [true, 'Password is required']
      },

      confirmPassword: {
          type: String,
          required: [true, 'Password is required']
      },
      refreshToken: {
          type: String
      }

  },
  {
      timestamps: true
  }
)
const collection  = mongoose.model("Authcollection",userSchema)
//export default connectDB;
module.exports=collection 