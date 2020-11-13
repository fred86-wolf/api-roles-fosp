import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import { token } from 'morgan';

export const signUp = async (req,res) => {

    const {username, email, password, roles} = req.body;

    const user = new User({
        username,
        email,
        password: await User.encryptPassword(password)
    });
    if (roles) {
        const foundRoles =  await Role.find({name:{$in:roles}})
        user.roles = foundRoles.map(role => role._id)
    }else{
        const role = await Role.findOne({name:'user'})
        user.roles = [role._id];
    }

    const userSaved = await user.save();

    const token = jwt.sign({id: userSaved._id},config.SECRET,{
        expiresIn:86400
    });

    res.status(200).json({
        ok:true,
        message:'User Successfully Registered!',
        data:token
    });
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;

    
    const user = await User.findOne({email:email}).populate('roles');

    if (!user) return res.status(400).json({
        ok:false,
        message: 'User Not Found!'
    })
    const match = await User.comparedPassword( password, user.password);

    if (!match) return res.status(401).json({
        ok:false,
        message: 'Email or Password Invalid!'
    });

    const token = jwt.sign({id: user._id}, config.SECRET,{
        expiresIn:86400
    });

    res.status(200).json({
        ok:true,
        message:'User Valid!',
        data:token
    });
    
}