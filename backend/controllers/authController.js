import User from "./models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req,res) => {

  try{

    const {name,email,phone,password,role} = req.body;

    const userExists = await User.findOne({email});

    if(userExists){
      return res.status(400).json({
        message:"User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = new User({
      name,
      email,
      phone,
      role,
      password:hashedPassword
    });

    await user.save();

    res.status(201).json({
      message:"Account created successfully"
    });

  }catch(error){

    res.status(500).json({
      error:error.message
    });

  }

};