import Admin from "../models/admin.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import validator from 'validator'

export const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email: email, password: hashedPassword });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully", id: newAdmin.id });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const adminSignin = async (req, res) => {
        try{
            const {email, password } = req.body;
            if(!(email && password) ){
                return res.status(300).json({message: "All fields are required!"})
            }
    
            const existingAdmin = await Admin.findOne({email : email});
           
    
            if(!existingAdmin){
                return res.status(400).json({success:false, message : "Invalid credential"})
            }
    
    
            const isMatch = await bcrypt.compare(password, existingAdmin.password);
    
            if(isMatch){
                const authClaims =  {
                    id : existingAdmin.id,
                    role : "admin"
                  }
                         
                  const token = jwt.sign( authClaims , process.env.JWT_PASSWORD, {
                    expiresIn: "15d",
                  });
    
                  res.status(200).json({success: true, id: existingAdmin.id, token: token })
            }else{
                return res.status(400).json({ message: "Invalid Credential" });
            }
    
        }catch(err){
            console.log(err);
            res.status(500).json({success:false , message : "Internal server error"})   
        }
};
