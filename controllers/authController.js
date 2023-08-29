import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone,address,answer} = req.body;
        //validations
        if(!name){
            return res.send({message: 'Name is Required.'});
        }
        if(!email){
            return res.send({message: 'Email is Required.'});
        }
        if(!password){
            return res.send({message: 'Password is Required.'});
        }
        if(!phone){
            return res.send({message: 'Phone is Required.'});
        }
        if(!address){
            return res.send({message: 'Address is Required.'});
        }
        if(!answer){
            return res.send({message: 'Answer is Required.'});
        }

        //check user
        const User = await userModel.findOne({email});
        //existing user
        const existingUser = findExistingUser();

        if(existingUser){
            return res.status(200).send({
                sucess:false,
                message:'Already Register please login',
            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = new userModel({name,email,phone,address,password:hashedPassword,answer}).save();

        res.status(201).send({
            success:true,
            message:'User Register Sucessfully !',
            user,
        })


    }
    catch(error){
        console.log(error);
        res.status(500).send({
            sucess:false,
            message:'Error in Registration',
            error,
        })
    }


};

//POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Email or Password',

            })
        }
        //check User
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Email is not Registered.'
            })
        }

        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'Invalid Password',
            })
        }
        //token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
            expiresIn:'7d',
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role:user.role,
            },
            token,
        });

    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in login',
            error
        });
    }
};

//forgot Password Controller
export const forgotPasswordController = async (req,res) => {
    try {
        const {email,question, newPassword} = req.body
        if(!email){
            res.status(400).send('Email is Required.');
        }
        if(!question){
            res.status(400).send('Question is Required.');
        }
        if(!newPassword){
            res.status(400).send('New Password is Required.');
        }
        //check
        const user = await userModel.findOne({email,answer});

        //Validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'Wrong Email or Answer'
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password:hashed})
        res.status(200).send({
            success:true,
            message:'Password Resest Successfuly.',
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Something went Wrong',
            error
        })
    }


};

//test controller
export const testController = (req,res) =>{
    res.send('Protected Routes');
};
