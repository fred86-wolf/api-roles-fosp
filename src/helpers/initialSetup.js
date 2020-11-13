import Role from '../models/Role'

export const createRoles = async () => {
    try {
        
        const countRole = await Role.estimatedDocumentCount();
        if (countRole > 0) return;
        
        const values = await Promise.all([
            new Role({name:'user'}).save(),
            new Role({name:'admin'}).save(),
        ]);
    } catch (error) {
        console.log(error);
    }
    
}