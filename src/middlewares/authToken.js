import jwt, { decode } from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import User from '../models/User';

export const verifyToken = async (req,res,next) => {
    try {
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
            ok:false,
            message:'No Token Provided'
        });
    }
        const decoded = jwt.verify(token,config.SECRET);
        req.userId = decoded.id;
    
        const user = await User.findById(decoded.id, {password:0})
    
        if (!user) {
            return res.status(404).json({
                ok:false,
                message:'User Not Exist!'
            });
        }
        next();
    } catch (error) {
        res.status(401).json({
            ok:false,
            message: 'Unauthorized Token!'
        });
    }
    
}

export const RoleAdmin = async (req,res, next) => {
    const user = await User.findById(req.userId)
    const roles = await Role.find({_id:{$in:user.roles}});
    
    for (let i = 0; i < roles.length; i++) {
        if(roles[i].name === 'admin'){
            next()
            return;
        }
    }
    return res.status(403).json({
        ok:false,
        message:`You don't have enough permissions`
    });
}