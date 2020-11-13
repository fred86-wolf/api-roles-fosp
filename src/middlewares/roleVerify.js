import {ROLES} from '../models/Role';
import User from '../models/User';

export const checkUser = async (req,res, next) => {
    const {email, username} = req.body;
    
    const user = await User.findOne({username:username});

    if(user) return res.status(400).json({
        ok:false,
        message:'User Already Exists!'
    });

    const email = await User.findOne({email:email});

    if(email) return res.status(400).json({
        ok:false,
        message:'Email Already Exists!'
    });
    next();
}
export const checkRoles = (req,res,next) => {
    const {roles} = req.body;
    if (roles) {
        for (let i = 0; i < ROLES.length; i++) {
            if (roles !== ROLES[i]) {
                // return res.status(400).json({
                //     ok:false,
                //     message: `Role ${roles} does not exists!`
                // });
            }
        }
    }
    // next();
}

