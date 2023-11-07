const userModel=require("../Models/userModel")
const bcrypt=require("bcrypt")
const validator=require("validator")
const jwt=require("jsonwebtoken")


const createToken=(_id)=>{
    const jwtKey=process.env.JWT_SECRET_KEY;

    return jwt.sign({_id},jwtKey,{expiresIn:"5d"})
}

const registerUser=async(req,res)=>{
   try {
    const {name,email,password}=req.body;
    let user=await userModel.findOne({email});
    if(user){
return res.status(400).json("User With Same Name Already Exist. Choose a Different UserName");
    }
    if(!name||!email||!password) return eres.status(400).json("All Field are Required");
    if(!validator.isEmail(email))return res.status(400).json("Email should be a valid one");
    if(!validator.isStrongPassword(password)) return res.status(400).json("Password is not Strong enough");
    
    user= new userModel({name,email,password});
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt);

    await user.save();
    const token=createToken(user._id)
    
    res.status(200).json({_id:user._id, name,email,token})
   } catch (error) {
    
    console.log(error)
    res.status(500).json(error);
   }
}


const loginUser=async(req,res)=>{
    try {
     const {email,password}=req.body;

     let user=await userModel.findOne({email});
     if( !user ) return res.status(400).json("Invalid credentials"); 

     const isValidPassword= await bcrypt.compare(password,user.password)
     if(! isValidPassword) return res.status(400).json("Invalid credentials")

 
     const token=createToken(user._id)
     res.status(200).json({_id:user._id,name:user.name, email,token})
    } catch (error) {
     
     console.log(error)
     res.status(500).json(error);
    }
 }

 
const findUser=async(req,res)=>{
    try {
     const userId=req.params.userId;

     let user=await userModel.findById(userId);
     res.status(200).json({ user, message: 'User found' });

    } catch (error) {
     
     console.log(error)
     res.status(500).json(error);
    }
 }

 
const getAllUsers=async(req,res)=>{
    try {
     let users=await userModel.find();
     res.status(200).json( users);

    } catch (error) {
     
     console.log(error)
     res.status(500).json(error);
    }
 }

 







module.exports= {registerUser, loginUser,findUser,getAllUsers};