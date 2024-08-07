require('dotenv').config()
const express =require ("express");
const app = express();
const cors  =require("cors");
const path = require("path");
const collection =require("./src/db/index.js")

const jwt =require("jsonwebtoken")
const cookieparser=require("cookie-parser");
const bcryptjs=require("bcryptjs")

app.use(cors())
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended:false}))


async function hashpass(password){
 const res = await bcryptjs.hash(password,10)
 return res
}
async function compare(userpassword,hashpass){
    const res = await bcryptjs.compare(userpassword,hashpass)
    return res
   }
const temppath = path.join(__dirname,"./public");
app.use(express.static(temppath))
app.set("view engine","hbs");



//const temppath = path.join(__dirname,"../views");
//const publicpath = path.join(__dirname,"../public");
//app.set("view engine","hbs");

//app.set(express.static(temppath))

//app.get("/index",(req,res)=>{
  //  res.render("/")
//})
app.get("/",(req,res)=>{
    //if(req.cookies.jwt){
       // const veryfy =jwt.veryfy(req.cookies.jwt,"hjgkiyokfdjdjdjd")
       
    //}
    res.render("index")
})

app.get("/signup",(req,res)=>{
    res.render("signup")
})
app.get("/login",(req,res)=>{
    res.render("login")
})

////
app.post("/signup",async(req,res)=>{
    try{
        const check = await collection.findOne({email:req.body.email})
        if(check){
            res.send("user already exit")
        }
        else{
            const token=jwt.sign({name:req.body.name},"hjgkiyokfdjdjdjd")
            res.cookie("jwt",token,{
                maxAge:60000,
                httpOnly:true
            })
            
            const data={
                name:req.body.name,
                company:req.body.company,
                email:req.body.email,
                phone:req.body.phone,
                password: await hashpass(req.body.password),
                confirmPassword: await hashpass(req.body.confirmPassword),
                token:token
            }
            await collection.insertMany([data])
            res.render("login",{name:req.body.name})
        }
      
    }
    catch{
        res.send("wrong details")
    }
})

//
app.post("/login",async(req,res)=>{
    try{
        const check = await collection.findOne({email:req.body.email})
        const passcheck =await compare(req.body.password,check.password)
        if(check && passcheck){
            res.cookie("jwt",check.token,{
                maxAge:60000,
                httpOnly:true
            })
            res.render("dashbord",{name:req.body.name})
        }
        else{
            res.send("wrong details add")
      
        }
    }
    catch{
        res.send("wrong details")
    }
})





app.listen(process.env.PORT || 8000, () => {
    console.log(`⚙️ Server is running at port : ${process.env.PORT}`);



})